import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateJobComponent } from './create-job/create-job.component';
import { SchedulerComponent } from './scheduler/scheduler.component';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export const routes: Routes = [
  { path: '', component: SchedulerComponent }, 
  { path: 'create-job', component: CreateJobComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})

@Injectable({
  providedIn: 'root'
})


export class AppRoutingModule {

  private listJobUrl = '/api/v1/jobs'; 

  constructor(private http: HttpClient) { }

  listJobs(): Observable<any> {
    return this.http.get<any>(this.listJobUrl);
  }


}
