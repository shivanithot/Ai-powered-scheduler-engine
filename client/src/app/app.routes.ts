import { Routes } from '@angular/router';
import { CreateJobComponent } from '../pages/create-job/create-job.component';
import { LandingComponent } from '../pages/landing/landing.component';
import { JobsComponent } from '../pages/jobs/jobs.component';

export const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'jobs', component: JobsComponent },
  { path: 'jobs/create', component: CreateJobComponent },
];
