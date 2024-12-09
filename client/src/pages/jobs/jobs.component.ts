import { Component } from '@angular/core';
import { MatRow, MatTable } from '@angular/material/table';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { Job } from '../../types';
import { environment } from '../../environments/environment';
import axios, { AxiosError } from 'axios';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import {
  MatButton,
  MatButtonModule,
  MatIconAnchor,
  MatIconButton,
} from '@angular/material/button';
import { JobDetailsComponent } from '../../components/job-details/job-details.component';

@Component({
  selector: 'app-jobs',
  standalone: true,
  imports: [
    MatTable,
    MatRow,
    MatProgressSpinner,
    MatPaginatorModule,
    MatIconModule,
    MatButtonModule,
    MatButton,
    MatIconAnchor,
    MatIconButton,
    JobDetailsComponent,
  ],
  templateUrl: './jobs.component.html',
  styleUrl: './jobs.component.scss',
})
export class JobsComponent {
  jobs: Job[] = [];
  paginatedJobs: Job[] = [];
  loading = true;
  pageSize = 10; // Number of items per page
  currentPage = 0; // Current page number
  deleting = false;
  showJobDetails = false;
  selectedJob = 0;

  ngOnInit() {
    this.loadData();
  }

  openJob(job_id: number) {
    this.selectedJob = job_id;
    this.showJobDetails = true;
  }

  closeJob() {
    this.showJobDetails = false;
  }

  handleJob(job_id: number) {
    if (this.showJobDetails) {
      this.closeJob();
      return;
    }
    this.openJob(job_id);
  }

  async deleteJob(job_id: number) {
    this.deleting = true;
    try {
      await axios.delete(`${environment.backendUrl}/jobs/${job_id}`);
      this.loadData();
    } catch (error) {
      if (error instanceof AxiosError) {
        const errorData = error.response!.data;
        // console.log(errorData);
      }
      // console.error(error);
    } finally {
      this.deleting = false;
    }
  }

  async loadData() {
    this.loading = true;
    try {
      const resp = await axios.get(`${environment.backendUrl}/jobs`);
      this.jobs = resp.data;
      this.paginateData();
      console.log(`got ${this.jobs.length} number of jobs.`);
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

  handlePageEvent(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.paginateData();
  }

  // Paginate the data based on the page size and current page index
  paginateData() {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedJobs = this.jobs.slice(startIndex, endIndex);
  }
}
