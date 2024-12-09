from flask import Blueprint, request

from app.models.databricks import GetWorkspaces
from app.services import workspaces as workspace_servies

workspaces_bp = Blueprint("workspaces", __name__)


@workspaces_bp.get("/")
def get_workspace_contents():
    body = request.args.get("path")
    data = GetWorkspaces(path=str(body))
    return workspace_servies.get_workspace_content(data), 200
