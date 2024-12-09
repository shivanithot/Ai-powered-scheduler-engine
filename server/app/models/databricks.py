from typing import List, Literal, Optional

from pydantic import BaseModel, Field, field_validator


class NotebookTask(BaseModel):
    notebook_path: str


class Task(BaseModel):
    existing_cluster_id: str
    notebook_task: NotebookTask
    task_key: str


# class PauseStatus(BaseModel):
#     pause_status: Literal["UNPAUSED", "PAUSED"] = "UNPAUSED"
#


class Schedule(BaseModel):
    quartz_cron_expression: str
    pause_status: Literal["UNPAUSED", "PAUSED"] = "UNPAUSED"
    timezone_id: str


class Continuous(BaseModel):
    pause_status: Literal["UNPAUSED", "PAUSED"] = "UNPAUSED"


class NewJob(BaseModel):
    name: str
    tasks: List[Task]
    schedule: Optional[Schedule] = Field(None)
    continuous: Optional[Continuous] = Field(None)

    @field_validator("tasks")
    def validate_tasks(v):
        if not v:
            raise ValueError("The tasks list cannot be empty.")
        return v


class GetWorkspaces(BaseModel):
    path: str
