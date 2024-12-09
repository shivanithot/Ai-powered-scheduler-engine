from flask import Blueprint

from app.services import clusters as cluster_services

clusters_bp = Blueprint("clusters", __name__)


@clusters_bp.get("/")
def get_all_clusetrs():
    return cluster_services.get_all_clusters()
