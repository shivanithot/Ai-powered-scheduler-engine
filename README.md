# 3.1 Challenge: AI/ML Schedule Orchestration

## 1. Problem Statement

The current Studio Product Platform lacks a comprehensive system for scheduling and managing AI/ML jobs, leading to manual intervention for routine tasks such as model training, data processing, and pipeline execution. This inefficiency can result in missed opportunities for optimization, increased operational overhead, and potential errors in execution timing. To enhance productivity and reliability, a robust scheduling orchestration system is required that can automate and manage these tasks efficiently.

## 2. Objective

To develop a user-friendly and reliable job scheduling orchestration system within the Studio Product Platform that allows users to automate, monitor, and manage AI/ML tasks such as model training, data processing, and pipeline execution. The system should support scheduling, editing, viewing, canceling, and retrying jobs, ensuring operational efficiency and reducing manual workload.

## 3. Design Strategy and Approach

- **Modular Design**: Implement a modular system that separates job scheduling, job execution, monitoring, and retry mechanisms.
- **User-Centric UI/UX**: Design an intuitive interface with clear navigation, providing users with easy access to schedule, edit, view, and cancel jobs.
- **Scalability**: Ensure the system can handle an increasing number of jobs and users without compromising performance.
- **Reliability**: Incorporate failover mechanisms and retry logic to handle failed jobs, minimizing downtime and manual intervention.
- **Integration**: Seamlessly integrate with the existing Studio Product Platform, allowing users to utilize existing models, pipelines, and data sources.

## 4. Technologies to be Used

- **Backend**: Python, Flask (for REST API development)
- **Job Scheduler**: Databricks and service bus for task queuing and scheduling
- **Database**: PostgreSQL for storing job details, schedules, and logs
- **Frontend**: Angular for the user interface
- **Cloud Services**: Azure services
- **Monitoring & Logging**: Prometheus, Grafana, and ELK Stack (Elasticsearch, Logstash, Kibana) for monitoring job execution and logging
- **Containerization**: Docker for deployment and Kubernetes for orchestration

## 5. REST API Definitions

- **POST /api/jobs/schedule**
  - **Description**: Schedule a new job.
  - **Parameters**: Job type, task details, execution time, recurrence settings.
  - **Response**: Job ID, confirmation message.
- **GET /api/jobs**
  - **Description**: View a list of all scheduled jobs.
  - **Parameters**: Filter options (job type, status), sort options.
  - **Response**: List of jobs with details (ID, type, schedule, status).
- **PUT /api/jobs/{job_id}**
  - **Description**: Edit an existing scheduled job.
  - **Parameters**: Job ID, updated task details, execution time, recurrence settings.
  - **Response**: Confirmation of job update.
- **DELETE /api/jobs/{job_id}**
  - **Description**: Cancel a scheduled job.
  - **Parameters**: Job ID.
  - **Response**: Confirmation of job cancellation.
- **POST /api/jobs/{job_id}/retry**
  - **Description**: Retry a failed job.
  - **Parameters**: Job ID.
  - **Response**: Retry attempt result, updated status.

## 6. UI/UX Requirements

- **Job Scheduling Interface**:
  - **Features**: Form for defining job type, task details, execution time, recurrence settings, and confirmation messages.
  - **Design**: Clear, intuitive layout with dropdowns, calendars, and input fields.
- **Job List View**:
  - **Features**: Table with filtering, sorting, and search capabilities.
  - **Design**: Responsive design, collapsible job details view.
- **Job Editing Interface**:
  - **Features**: Editable fields for task details, execution time, and recurrence settings.
  - **Design**: Modal or separate screen for editing jobs.
- **Job Cancellation**:
  - **Features**: Confirmation dialog before job cancellation.
  - **Design**: Simple, one-click cancellation option with confirmation feedback.
- **Failed Job Retry**:
  - **Features**: Retry button with status update and feedback after retry attempt.
  - **Design**: Prominent retry option within the job details or history view.

## 7. Coding Guidelines

- **Code Structure**: Follow a modular structure, separating concerns into distinct components (e.g., scheduling, task execution, retry logic).
- **Style Guidelines**: Adhere to Python for backend code.
- **Version Control**: Use Git with clear commit messages, feature branches, and pull requests for code reviews.
- **Documentation**: Inline code comments for complex logic, and well-documented functions and classes.

## 8. Testing Requirements

- **Unit Testing**: Coverage for all modules (scheduling, job management, retry logic).
- **Integration Testing**: Ensure seamless interaction between the scheduling system and existing components (e.g., model training, data processing).
- **End-to-End Testing**: Simulate user interactions with the UI to validate the scheduling process, job editing, and retry mechanisms.
- **Performance Testing**: Assess the system's ability to handle a high volume of scheduled jobs.
- **Regression Testing**: Automated tests to prevent new changes from introducing bugs.

## 9. Documentation Requirements

- **User Guide**: Detailed instructions on how to use the job scheduling system, including creating, editing, and managing jobs.
- **API Documentation**: Comprehensive API reference with endpoint descriptions, parameters, and example requests/responses.
- **Developer Guide**: Guidelines for setting up the development environment, code structure, and contributing to the project.
- **Deployment Documentation**: Steps for deploying the scheduling system in various environments (development, staging, production).
- **Troubleshooting Guide**: Common issues, error codes, and how to resolve them.
