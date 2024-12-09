import os

DBS_TOKEN = os.getenv("DATABRICKS_TOKEN")
DBS_WORKSPACE_URL = os.getenv("DATABRICKS_WORKSPACE_URL")

headers = {
    "Authorization": f"Bearer {DBS_TOKEN}",
    "Content-Type": "application/json",
}
