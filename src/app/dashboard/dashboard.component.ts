import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ConfigurationComponent } from './configuration/configuration.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { ParsingComponent } from './parsing/parsing.component';
import { FactCheckComponent } from './fact-check/fact-check.component';

@Component({
  imports: [MatTabsModule, MatIconModule, FactCheckComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {}
