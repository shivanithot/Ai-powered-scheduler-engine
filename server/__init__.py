from flask import Flask
import os

def create_app():
    app = Flask(__name__)

    # Register Blueprints
    from .routes.job_routes import job_routes
    app.register_blueprint(job_routes)

    return app
