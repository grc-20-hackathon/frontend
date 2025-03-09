import { Component, OnInit, Signal } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatCheckbox } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { FactCheckControllerService } from './services/fact-check-controller.service';
import { IJobOpening } from './models/job-opening.interface';
import { JobOpeningFormComponent } from './components/job-opening-form/job-opening-form.component';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatIcon } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
  selector: 'grc-fact-check',
  imports: [
    MatButton,
    MatCheckbox,
    FormsModule,
    MatFormField,
    MatInput,
    MatLabel,
    JobOpeningFormComponent,
    MatProgressSpinner,
    MatIcon,
    MatExpansionModule,
  ],
  templateUrl: './fact-check.component.html',
  styleUrl: './fact-check.component.scss',
  standalone: true,
})
export class FactCheckComponent implements OnInit {
  countOfJobs = 1;
  maxCountOfJobs = 50;

  loading!: Signal<Boolean>;
  hasLoadedData!: Signal<Boolean>;
  hasSelectedJob!: Signal<Boolean>;
  jobOpeningsData!: Signal<IJobOpening[]>;

  constructor(private readonly controller: FactCheckControllerService) {}

  ngOnInit() {
    this.initVariables();
  }

  getData() {
    this.controller.getData(this.countOfJobs);
  }

  onPublishAll(e: boolean) {
    this.controller.publishAllChanged(e);
  }

  publish() {
    this.controller.publish();
  }

  jobOpeningChanged(jobOpening: IJobOpening) {
    this.controller.jobOpeningChanged(jobOpening);
  }

  validateNumber(event: any) {
    event.target.value = event.target.value.replace(/[^0-9]/g, '');
    if (event.target.value === '') {
      this.countOfJobs = 0;
    }

    if (this.countOfJobs > this.maxCountOfJobs) {
      this.countOfJobs = this.maxCountOfJobs;
    }
  }

  private initVariables() {
    this.loading = this.controller.loading;
    this.hasLoadedData = this.controller.hasLoadedData;
    this.jobOpeningsData = this.controller.jobOpeningsData;
    this.hasSelectedJob = this.controller.hasSelectedJob;
  }
}
