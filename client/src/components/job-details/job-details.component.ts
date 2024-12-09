import { Component, Input } from '@angular/core';
import axios, { AxiosError } from 'axios';
import { environment } from '../../environments/environment';
import { JobData } from '../../types';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-job-details',
  standalone: true,
  imports: [MatSlideToggleModule, FormsModule, MatProgressSpinner],
  templateUrl: './job-details.component.html',
  styleUrl: './job-details.component.scss',
})
export class JobDetailsComponent {
  @Input() job_id = 0;
  loading = true;
  jobData?: JobData = undefined;
  pause_status = false;
  working = false;

  ngOnInit() {
    console.log(this.job_id);
    this.loadJobDetails();
  }

  async play_pause() {
    console.log('play-pause');
    this.working = true;
    try {
      await axios.get(
        `${environment.backendUrl}/jobs/schedule/play-pause/${this.job_id}`,
      );
      this.jobData!.settings.schedule!.pause_status = this.pause_status
        ? 'UNPAUSED'
        : 'PAUSED';
    } catch (error) {
      if (error instanceof AxiosError) {
        const errorData = error.response!.data;
        // console.log(errorData);
      }
      // console.error(error);
    } finally {
      this.working = false;
    }
  }

  async loadJobDetails() {
    this.loading = true;
    try {
      const resp = await axios.get(
        `${environment.backendUrl}/jobs/${this.job_id}`,
      );
      this.jobData = resp.data;
      if (this.jobData!.settings.schedule) {
        this.pause_status =
          this.jobData!.settings.schedule.pause_status === 'UNPAUSED';
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        const errorData = error.response!.data;
        // console.log(errorData);
      }
      // console.error(error);
    } finally {
      this.loading = false;
    }
  }
}
