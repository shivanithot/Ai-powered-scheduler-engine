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
