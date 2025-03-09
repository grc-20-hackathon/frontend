import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  Signal,
} from '@angular/core';
import { AiFormComponent } from '../configuration/components/ai-form/ai-form.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { ParsingControllerService } from './parsing-controller.service';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { SiteSettingsFormComponent } from '../configuration/components/site-settings-form/site-settings-form.component';
import { IParsedSite } from './models/parsed-data.interface';
import { NgxJsonViewerModule } from 'ngx-json-viewer';
import { parse } from 'graphql/language';
import { MatDivider } from '@angular/material/divider';

@Component({
  selector: 'grc-parsing',
  imports: [
    MatExpansionModule,
    MatProgressSpinner,
    MatButton,
    MatIcon,
    NgxJsonViewerModule,
    MatDivider,
  ],
  providers: [ParsingControllerService],
  templateUrl: './parsing.component.html',
  styleUrl: './parsing.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ParsingComponent implements OnInit {
  loading!: Signal<boolean>;
  parsedSites!: Signal<IParsedSite[]>;
  constructor(private readonly controller: ParsingControllerService) {}

  ngOnInit() {
    this.initVariables();
  }

  parse(e: Event) {
    e.preventDefault();
    this.controller.parse();
  }

  sendToDb(id: number) {
    this.controller.sendToDb(id);
  }

  private initVariables() {
    this.loading = this.controller.loading;
    this.parsedSites = this.controller.parsedSites;
  }

  protected readonly JSON = JSON;
}
