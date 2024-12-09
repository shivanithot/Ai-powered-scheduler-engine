import logging
import os

import dotenv
from flask import Flask, jsonify
from flask_cors import CORS, cross_origin
from pydantic import ValidationError

from app.routes.clusters import clusters_bp
from app.routes.jobs import jobs_bp
from app.routes.workspaces import workspaces_bp
from app.utils.custom_exception import CustomException

dotenv.load_dotenv("./.env")

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})


app.register_blueprint(jobs_bp, url_prefix="/api/v1/jobs")
app.register_blueprint(clusters_bp, url_prefix="/api/v1/clusters")
app.register_blueprint(workspaces_bp, url_prefix="/api/v1/workspaces")


logging.basicConfig(
    filename="app.log",
    level=logging.DEBUG,  # Set the logging level
    format="%(asctime)s - %(levelname)s - %(message)s",  # Log format
    datefmt="%Y-%m-%d %H:%M:%S",  # Date format
)


@app.get("/checkhealth")
@cross_origin()
def checkhealth():
    return "The api is working", 200


@app.errorhandler(ValidationError)
def validation_error_handler(e: ValidationError):
    logging.error(e)
    errors = [
        {"loc": error["loc"], "msg": error["msg"], "type": error["type"]}
        for error in e.errors()
    ]
    return (
        jsonify(
            {
                "error": "Validation Error",
                "message": "There was something wrong with your request.",
                "status": 400,
                "error_count": e.error_count(),
                "errors": errors,
            }
        ),
        400,
    )


@app.errorhandler(CustomException)
def custom_error_handler(e):
    logging.error(e)
    return (
        jsonify(
            {
                "error": e.details,
                "message": e.message,
                "status": e.error_code,
            },
        ),
        e.error_code,
    )


@app.errorhandler(404)
def not_found_handler(e):
    logging.error(e)
    response = {
        "error_code": 404,
        "error": "The requested url was not found",
        "message": str(e),
    }
    return jsonify(response), 404


@app.errorhandler(Exception)
def handle_generic_exception(e):
    logging.error(e)
    response = {
        "error_code": 500,
        "error": "An unexpected error occurred.",
        "message": str(e),
    }
    return jsonify(response), 500


if __name__ == "__main__":
    app.run(
        debug=True,
        port=int(os.getenv("PORT", 5050)),
        host="0.0.0.0",
    )
