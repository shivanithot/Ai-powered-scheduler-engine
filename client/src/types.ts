export type Job = {
  created_time: number;
  creator_user_name: string;
  job_id: number;
  run_as_user_name: string;
  settings: {
    email_notifications: {
      no_alert_for_skipped_runs: boolean;
    };
    format: string;
    max_concurrent_runs: number;
    name: string;
    queue: {
      enabled: boolean;
    };
    timeout_seconds: number;
  };
};

export type JobSchedule = {
  pause_status: 'UNPAUSED' | 'PAUSED';
  quartz_cron_expression: string;
  timezone_id: string;
};

export type JobData = {
  created_time: number;
  creator_user_name: string;
  job_id: number;
  run_as_owner: boolean;
  run_as_user_name: string;
  settings: {
    email_notifications: {
      no_alert_for_skipped_runs: boolean;
    };
    schedule?: JobSchedule;
    format: string;
    job_clusters?: JobCluster[];
    max_concurrent_runs: number;
    name: string;
    queue: {
      enabled: boolean;
    };
    tasks: JobTask[];
    timeout_seconds: 0;
    // webhook_notifications: {};
  };
};

export type JobTask = {
  // email_notifications: {};
  job_cluster_key: string;
  existing_cluster_id: string;
  notebook_task: {
    notebook_path: string;
    source: string;
  };
  run_if: string;
  task_key: string;
  timeout_seconds: 0;
};

export type JobCluster = {
  job_cluster_key: string;
  new_cluster: {
    azure_attributes: {
      availability: string;
      first_on_demand: number;
      spot_bid_max_price: number;
    };
    data_security_mode: string;
    enable_elastic_disk: boolean;
    node_type_id: string;
    num_workers: number;
    runtime_engine: string;
    spark_env_vars: {
      PYSPARK_PYTHON: string;
    };
    spark_version: string;
  };
};

export type WorkspaceContent = {
  created_at: number;
  modified_at: number;
  object_id: number;
  object_type: 'FILE' | 'PYTHON' | 'DIRECTORY';
  path: string;
  resource_id: string;
};
