import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import {
  MatButtonModule,
  MatIconAnchor,
  MatIconButton,
} from '@angular/material/button';
import axios from 'axios';
import { backendUrl } from '../../constants';
import { Job } from '../../types';

@Component({
  selector: 'app-scheduler',
  standalone: true,
  imports: [
    NgClass,
    NgFor,
    NgIf,
    MatButtonModule,
    FormsModule,
    MatIconButton,
    MatIconAnchor,
    MatIconModule,
  ],
  templateUrl: './scheduler.component.html',
  styleUrls: ['./scheduler.component.css'],
})
export class SchedulerComponent {
  showFilters = false;
  statusFilter: string = '';
  pauseStatusFilter: string = '';
  expandedJobIds: Set<string> = new Set();
  loading = true;

  filteredJobs = [
    // Sample job data
    { jobId: '1', status: 'Success', runId: 'run1', pauseStatus: 'Active' },
    { jobId: '2', status: 'Failure', runId: 'run2', pauseStatus: 'Paused' },
  ];

  jobs: Job[] = [];

  toggleFilters() {
    this.showFilters = !this.showFilters;
  }

  toggleCollapse(jobId: string) {
    if (this.expandedJobIds.has(jobId)) {
      this.expandedJobIds.delete(jobId);
    } else {
      this.expandedJobIds.add(jobId);
    }
  }

  isRowExpanded(jobId: string): boolean {
    return this.expandedJobIds.has(jobId);
  }

  ngOnInit() {
    console.log('onInit');
    this.loadJobs();
  }

  async loadJobs() {
    this.loading = true;
    console.log('loading all the jobs');
    try {
      const resp = await axios.get(`${backendUrl}/jobs`);
      this.jobs = resp.data;
      // console.log(this.jobs);
    } catch (e) {
      console.log(e);
    } finally {
      this.loading = false;
    }
  }

  async deleteJob(jobId: number) {
    this.loading = true;
    try {
      console.log(`deleting the ${jobId}`);
      await axios.delete(`${backendUrl}/jobs/${jobId}`);
      this.loadJobs();
      // this.jobs = resp.data;
    } catch (e) {
      console.log(e);
    } finally {
      this.loading = false;
    }
  }

  // get filteredJobs() {
  //   return this.jobs.filter(job => {
  //     const matchesStatus = !this.statusFilter || job.status === this.statusFilter;
  //     const matchesPauseStatus = !this.pauseStatusFilter || job.pauseStatus === this.pauseStatusFilter;
  //     return matchesStatus && matchesPauseStatus;
  //   });
  // }

  // clearFilters() {
  //   this.statusFilter = '';
  //   this.pauseStatusFilter = '';
  // }
}
