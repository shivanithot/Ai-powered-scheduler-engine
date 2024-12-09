from flask import Blueprint, request

from app.models.databricks import NewJob, Schedule
from app.services import jobs as job_services

# Blueprint for the jobs API
jobs_bp = Blueprint("jobs", __name__)


# Health check route
@jobs_bp.get("/checkhealth")
def checkhealth():
    """Health check endpoint to verify if the jobs API is working."""
    return "/api/v1/jobs is working", 200


# CRUD Operations for Jobs
@jobs_bp.get("/")
def get_all_jobs():
    """Get a list of all jobs."""
    return job_services.list_all_jobs()


@jobs_bp.get("/<string:job_id>")
def get_single_job(job_id: str):
    """Get details of a single job by its job_id."""
    return job_services.get_single_job(job_id)


@jobs_bp.post("/")
def create_job():
    """Create a new job with the provided details."""
    body = request.get_json()
    data = NewJob(**body)
    return job_services.create_new_job(data)


@jobs_bp.delete("/<string:job_id>")
def delete_single_job(job_id: str):
    """Delete a specific job by its job_id."""
    return job_services.delete_single_job(job_id)


# Job Execution Endpoints
@jobs_bp.get("/execute/<string:job_id>")
def execute_once(job_id: str):
    """Execute a job once by its job_id."""
    return job_services.execute_once(job_id)


# Status and Job Runs Endpoints
@jobs_bp.get("/status/<string:job_id>")
def get_job_status(job_id: str):
    """Get the status of a specific job by its job_id."""
    return job_services.get_job_status(job_id)


@jobs_bp.get("/runs/<string:job_id>")
def get_job_runs(job_id: str):
    """Get all runs associated with a specific job."""
    return job_services.get_job_runs(job_id)


@jobs_bp.get("/runs/cancel/<string:run_id>")
def cancel_a_run(run_id: str):
    """Cancel a specific run by its run_id."""
    return job_services.cancel_a_run(run_id)


@jobs_bp.get("/runs/cancel-all/<string:job_id>")
def cancel_all_runs(job_id: str):
    """Cancel all runs associated with a specific job."""
    return job_services.cancel_all_runs(job_id)


# Continuous and Scheduled Jobs
@jobs_bp.get("/continuous/play-pause/<string:job_id>")
def continuous_play_pause(job_id: str):
    """Play or pause a continuous job by its job_id."""
    return job_services.continuous_play_pause(job_id)


@jobs_bp.get("/schedule/play-pause/<string:job_id>")
def schedule_play_pause(job_id: str):
    """Play or pause a scheduled job by its job_id."""
    return job_services.schedule_play_pause(job_id)


@jobs_bp.post("/schedule/<string:job_id>")
def schedule_job(job_id: str):
    """Schedule an existing job by its job_id."""
    body = request.get_json()
    data = Schedule(**body)
    return job_services.schedule_existing(job_id, data)
