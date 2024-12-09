import requests

from app.models.databricks import GetWorkspaces
from app.utils.custom_exception import CustomException
from config import development


def get_workspace_content(data: GetWorkspaces):
    resp = requests.get(
        f"{development.DBS_WORKSPACE_URL}/api/2.0/workspace/list",
        json=data.model_dump(),
        headers=development.headers,
    )

    if resp.status_code != 200:
        raise CustomException(
            error_code=resp.json()["error_code"],
            details=resp.json()["message"],
            message="Failed to retrieve the content of the given path.",
        )

    return resp.json()
