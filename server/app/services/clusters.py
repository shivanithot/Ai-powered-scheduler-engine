import requests

from app.utils.custom_exception import CustomException
from config import development


def get_all_clusters():
    resp = requests.get(
        f"{development.DBS_WORKSPACE_URL}/api/2.1/clusters/list",
        headers=development.headers,
    )

    if resp.status_code != 200:
        raise CustomException(
            error_code=resp.json()["error_code"],
            details=resp.json()["message"],
            message="Faild to retrieve all the jobs.",
        )

    return resp.json()
