import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { Observable } from 'rxjs';
import { AsyncPipe, NgFor } from '@angular/common';
import { NgIf } from '@angular/common';
import { map, startWith } from 'rxjs/operators';
import { MatSelectModule } from '@angular/material/select';

interface TimeZone {
  value: string;
  viewValue: string;
}

interface Task {
  clusterId: string;
  taskKey: string;
  notebookPath: string;
}

interface Cluster {
  clusterName: string;
  clusterId: string;
}

@Component({
  selector: 'app-new-job-form',
  standalone: true,
  imports: [
    MatButtonModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatAutocompleteModule,
    AsyncPipe,
    NgIf, NgFor
  ],
  templateUrl: './new-job-form.component.html',
  styleUrls: ['./new-job-form.component.scss']
})
export class NewJobFormComponent implements OnInit {
  private _formBuilder = inject(FormBuilder);

  // Form groups for the stepper
  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
    cronSyntax: [''],
    timeZone: [''],
  });
  isLinear = false;

  // Task Variables
  taskKey: string = '';
  notebookPath: string = '';
  selectedClusterId: string = '';
  tasks: Task[] = [];

  // TimeZone Variables
  timeZones: TimeZone[] = [];

  // Cluster details
  clusters: Cluster[] = [
    { clusterName: 'cluster-A', clusterId: 'Cluster-123' },
    { clusterName: 'cluster-B', clusterId: 'Cluster-1' },
    { clusterName: 'cluster-C', clusterId: 'Cluster-13' }
  ];

  // Autocomplete controls
  selectedOptions: string = '';
  myControl = new FormControl('');
  options: string[] = ['None', 'Schedule', 'Continuous'];
  filteredOptions!: Observable<string[]>;

  pauseStatusOptions: string[] = ['PAUSED', 'UNPAUSED'];
  pauseStatusControl = new FormControl('');

  ngOnInit() {
    // Initialize autocomplete options
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || ''))
    );
    
    // TimeZones dropdown
    const supportedTimeZones = Intl.supportedValuesOf('timeZone');
    this.timeZones = supportedTimeZones.map(zone => ({
      value: zone,
      viewValue: zone
    }));
  }

  // Autocomplete filter logic
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    this.selectedOptions = filterValue;
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  addTask() {
    if (this.taskKey && this.notebookPath && this.selectedClusterId) {
      this.tasks.push({
        clusterId: this.selectedClusterId,
        taskKey: this.taskKey,
        notebookPath: this.notebookPath
      });
    }
  }

  onClusterSelect(event: any) {
    console.log("Cluster Id:", event.value);
    this.selectedClusterId = event.value;
  }

  // Generate JSON Output
  generateJsonOutput(): void {
    const formValues = {
      jobName: this.firstFormGroup.get('firstCtrl')?.value,
      tasks: this.tasks,
      options: {
        selectedOptions: this.selectedOptions,
        cronSyntax: this.secondFormGroup.get('cronSyntax')?.value,
        timeZone: this.secondFormGroup.get('timeZone')?.value,
        pauseStatus: this.pauseStatusControl.value
      }
    };
    console.log("Form Data in JSON Format:", JSON.stringify(formValues, null, 2));

    alert(`Form Data in JSON Format:\n\n${JSON.stringify(formValues, null, 2)}`);
  }
}
