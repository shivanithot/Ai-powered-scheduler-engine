import requests

from app.models.databricks import NewJob, Schedule
from app.utils.custom_exception import CustomException
from config import development

# ----------------------------------------------------------------------
# CRUD Operations for Jobs
# ----------------------------------------------------------------------


def list_all_jobs():
    """
    Retrieve a list of all jobs.
    Makes a GET request to the Databricks API to fetch job data.
    """
    resp = requests.get(
        f"{development.DBS_WORKSPACE_URL}/api/2.1/jobs/list?limit=100",
        headers=development.headers,
    )

    if resp.status_code != 200:
        raise CustomException(
            error_code=resp.json()["error_code"],
            details=resp.json()["message"],
            message="Failed to retrieve all the jobs.",
        )

    jobs_data = resp.json()
    return jobs_data.get("jobs", [])


def get_single_job(job_id: str):
    """
    Retrieve details of a single job by its job_id.
    """
    resp = requests.get(
        f"{development.DBS_WORKSPACE_URL}/api/2.1/jobs/get?job_id={job_id}",
        headers=development.headers,
    )

    if resp.status_code != 200:
        raise CustomException(
            error_code=resp.json()["error_code"],
            details=resp.json()["message"],
            message=f"Failed to retrieve the given job {job_id}",
        )

    return resp.json()


def create_new_job(data: NewJob):
    """
    Create a new job using the given data.
    """
    resp = requests.post(
        f"{development.DBS_WORKSPACE_URL}/api/2.1/jobs/create",
        headers=development.headers,
        json={**data.model_dump()},
    )

    if resp.status_code != 200:
        raise CustomException(
            error_code=resp.json()["error_code"],
            details=resp.json()["message"],
            message="Failed to create the given job",
        )

    return resp.json(), 200


def delete_single_job(job_id: str):
    """
    Delete a specific job by its job_id.
    """
    resp = requests.post(
        f"{development.DBS_WORKSPACE_URL}/api/2.1/jobs/delete",
        headers=development.headers,
        json={"job_id": job_id},
    )

    if resp.status_code != 200:
        raise CustomException(
            error_code=resp.json()["error_code"],
            details=resp.json()["message"],
            message=f"Failed to delete the given job {job_id}",
        )

    return resp.json()


# ----------------------------------------------------------------------
# Job Execution Operations
# ----------------------------------------------------------------------


def execute_once(job_id: str):
    """
    Execute a job once by its job_id.
    """
    resp = requests.post(
        f"{development.DBS_WORKSPACE_URL}/api/2.1/jobs/run-now",
        headers=development.headers,
        json={"job_id": job_id},
    )

    if resp.status_code != 200:
        raise CustomException(
            error_code=resp.json()["error_code"],
            details=resp.json()["message"],
            message=f"Failed to execute the given job {job_id}",
        )

    return resp.json()


# ----------------------------------------------------------------------
# Job Run Management
# ----------------------------------------------------------------------


def get_job_status(run_id: str):
    """
    Get the status of a specific run by its run_id.
    """
    resp = requests.get(
        f"{development.DBS_WORKSPACE_URL}/api/2.1/jobs/runs/get?run_id={run_id}",
        headers=development.headers,
    )

    if resp.status_code != 200:
        raise CustomException(
            error_code=resp.json()["error_code"],
            details=resp.json()["message"],
            message=f"Failed to retrieve the given run {run_id}",
        )

    return resp.json()


def get_job_runs(job_id: str):
    """
    Get a list of all runs associated with a specific job by its job_id.
    """
    resp = requests.get(
        f"{development.DBS_WORKSPACE_URL}/api/2.1/jobs/runs/list?job_id={job_id}",
        headers=development.headers,
    )

    if resp.status_code != 200:
        raise CustomException(
            error_code=resp.json()["error_code"],
            details=resp.json()["message"],
            message=f"Failed to retrieve the runs for the given job {job_id}",
        )

    return resp.json()


def cancel_all_runs(job_id: str):
    """
    Cancel all runs associated with a specific job by its job_id.
    """
    resp = requests.post(
        f"{development.DBS_WORKSPACE_URL}/api/2.1/jobs/runs/cancel-all",
        headers=development.headers,
        json={"job_id": job_id},
    )

    if resp.status_code != 200:
        raise CustomException(
            error_code=resp.json()["error_code"],
            details=resp.json()["message"],
            message=f"Failed to cancel all runs for the given job_id: {job_id}",
        )

    return resp.json()


def cancel_a_run(run_id: str):
    """
    Cancel a specific run by its run_id.
    """
    resp = requests.post(
        f"{development.DBS_WORKSPACE_URL}/api/2.1/jobs/runs/cancel",
        headers=development.headers,
        json={"run_id": run_id},
    )

    if resp.status_code != 200:
        raise CustomException(
            error_code=resp.json()["error_code"],
            details=resp.json()["message"],
            message=f"Failed to cancel the given run_id: {run_id}",
        )

    return resp.json()


# ----------------------------------------------------------------------
# Continuous and Scheduled Job Management
# ----------------------------------------------------------------------


def continuous_play_pause(job_id: str):
    """
    Toggle play/pause status of a continuous job by its job_id.
    """
    prev_data = get_single_job(job_id)
    prev_continuous = prev_data["settings"]["continuous"]

    new_status = (
        "UNPAUSED"
        if prev_continuous and prev_continuous["pause_status"] == "PAUSED"
        else "PAUSED"
    )

    resp = requests.post(
        f"{development.DBS_WORKSPACE_URL}/api/2.1/jobs/update",
        headers=development.headers,
        json={
            "job_id": job_id,
            "new_settings": {
                "continuous": {
                    **prev_continuous,
                    "pause_status": new_status,
                },
            },
        },
    )

    if resp.status_code != 200:
        raise CustomException(
            error_code=resp.json()["error_code"],
            details=resp.json()["message"],
            message="Failed to play/pause the continuous for the given job",
        )

    return resp.json(), 200


def schedule_play_pause(job_id: str):
    """
    Toggle play/pause status of a scheduled job by its job_id.
    """
    prev_data = get_single_job(job_id)
    prev_schedule = prev_data["settings"]["schedule"]

    new_status = "UNPAUSED" if prev_schedule["pause_status"] == "PAUSED" else "PAUSED"

    resp = requests.post(
        f"{development.DBS_WORKSPACE_URL}/api/2.1/jobs/update",
        headers=development.headers,
        json={
            "job_id": job_id,
            "new_settings": {
                "schedule": {
                    **prev_schedule,
                    "pause_status": new_status,
                },
            },
        },
    )

    if resp.status_code != 200:
        raise CustomException(
            error_code=resp.json()["error_code"],
            details=resp.json()["message"],
            message="Failed to pause the schedule for the given job",
        )

    return resp.json(), 200


def schedule_existing(job_id: str, data: Schedule):
    """
    Update the schedule of an existing job by its job_id.
    """
    resp = requests.post(
        f"{development.DBS_WORKSPACE_URL}/api/2.1/jobs/update",
        headers=development.headers,
        json={
            "job_id": job_id,
            "new_settings": {
                "schedule": data.model_dump(),
            },
        },
    )

    if resp.status_code != 200:
        raise CustomException(
            error_code=resp.json()["error_code"],
            details=resp.json()["message"],
            message="Failed to schedule the given job",
        )

    return resp.json(), 200
