from flask import Blueprint, request, jsonify
import requests
import os
from pydantic import BaseModel, ValidationError
from app.services.groq_services import call_groq_api
from typing import Union

from app.services.groq_services import call_groq_api

# Blue print for the Jobs API
issue_detection_bp = Blueprint('issue_detection', __name__)


class IssueDetectionRequest(BaseModel):
    job_id: Union[str, int]

# Reading the dummy logs file
def read_logs_from_file(file_name):
    try:
        file_path = os.path.join(os.path.dirname(__file__), file_name)
        with open(file_path, 'r') as file:
            logs = file.read()
        return logs
    except IOError as e:
        raise Exception(f"Error reading log file: {str(e)}")
    
@issue_detection_bp.route('/api/chatbot/issue-detection', methods=['POST'])
def issue_detection():
    """Get the possible issues of the jobs failure."""
    list_jobs_url = os.environ.get("DATABRICKS_WORKSPACE_URL")
    workspace_url = os.environ.get("DATABRICKS_TOKEN")

    try:
        # Parse and validate the request data using Pydantic
        request_data = IssueDetectionRequest.parse_obj(request.json)
        job_id = request_data.job_id

        headers = {
            'Content-Type': 'application/json',
            'Authorization': f"Bearer {workspace_url}"
        }
        
        response = requests.get(f"{list_jobs_url}/api/2.1/jobs/runs/list", headers=headers, params={'job_id': job_id})
        response.raise_for_status()
        
        logs = response.json()
        status = logs['runs'][0]['status'] if logs['runs'] else {}
        
        # Read logs from file
        logs_text = read_logs_from_file('logs.txt')
        
        # Prepare prompt for Groq API
        prompt = f"Analyze the following logs and determine the issue based on the job status:\n\nJob Status: {status}\n\nLogs:\n{logs_text}"

        # Call Groq API
        suggestion = call_groq_api(prompt)

        return jsonify({
            "job_id": job_id,
            "suggestion": suggestion
        })

    except ValidationError as e:
        return jsonify({"error": "Invalid request data", "details": e.errors()}), 400
    except requests.RequestException as e:
        return jsonify({"error": str(e)}), 500
    except Exception as e:
        return jsonify({"error": str(e)}), 500
