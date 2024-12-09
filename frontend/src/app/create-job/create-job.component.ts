import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-create-job',
  standalone: true,
  imports: [NgFor, FormsModule, MatCheckboxModule],
  templateUrl: './create-job.component.html',
  styleUrl: './create-job.component.css'
})
export class CreateJobComponent {
  jobName: string = '';
  schedule: string = '';
  continuous: boolean = false;
  taskKey: string = '';
  notebookPath: string = '';
  source: string = '';

  tasks: { taskKey: string; notebookPath: string; source: string }[] = [];

  addTask() {
    if (this.taskKey && this.notebookPath && this.source) {
      this.tasks.push({
        taskKey: this.taskKey,
        notebookPath: this.notebookPath,
        source: this.source
      });

      this.taskKey = '';
      this.notebookPath = '';
      this.source = '';
    } else {
      alert('Please fill out all task fields.');
    }
  }
}