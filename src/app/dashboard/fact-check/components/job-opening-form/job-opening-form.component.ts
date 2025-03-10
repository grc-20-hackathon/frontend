import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IJobOpening } from '../../models/job-opening.interface';
import { FormBuilder } from '@angular/forms';
import { MatCheckbox } from '@angular/material/checkbox';

import {
  MatFormField,
  MatLabel,
  MatOption,
  MatSelect,
  MatSelectChange,
} from '@angular/material/select';
import { isArray } from 'lodash';
import { MatDivider } from '@angular/material/divider';
import { CopyBtnComponent } from '../../../../shared/components/copy-btn/copy-btn.component';
import { MatDialog } from '@angular/material/dialog';
import { EditDialogComponent } from '../../../../shared/components/edit-dialog/edit-dialog.component';
import { filter, tap } from 'rxjs';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { MatTooltip } from '@angular/material/tooltip';

@Component({
  selector: 'grc-job-opening-form',
  imports: [
    MatCheckbox,
    MatSelect,
    MatOption,
    MatLabel,
    MatFormField,
    MatDivider,
    CopyBtnComponent,
    MatIcon,
    MatIconButton,
    MatTooltip,
  ],
  templateUrl: './job-opening-form.component.html',
  styleUrl: './job-opening-form.component.scss',
  standalone: true,
})
export class JobOpeningFormComponent {
  @Input() jobOpening!: IJobOpening;
  @Output() jobOpeningChange = new EventEmitter<IJobOpening>();

  constructor(private readonly dialog: MatDialog) {}

  onProjectSelectionChange(e: boolean) {
    const updatedJob = {
      ...this.jobOpening,
      isSelected: e,
    };
    this.jobOpeningChange.emit(updatedJob);
  }

  onEntitySelectionChange(checked: boolean, id: string) {
    const copiedJob = structuredClone(this.jobOpening);
    const isUpdate = this.updateElementById(this.jobOpening, id, {
      isSelected: checked,
    });
    if (isUpdate) {
      this.jobOpeningChange.emit(copiedJob);
    }
  }

  onSelectChange(e: MatSelectChange, id: string): void {
    const { value } = e;
    if(Boolean(id)) {
      this.updateJobOpening(value, id);
    }

  }

  onEdit(value: string | undefined, id: string) {
    if (!value) {
      return;
    }
    this.dialog
      .open<EditDialogComponent>(EditDialogComponent, {
        width: '600px',
        data: { text: value },
      })
      .afterClosed()
      .pipe(
        filter((data) => Boolean(data)),
        tap((data) => {
          const isUpdate = this.updateElementById(this.jobOpening, id, {
            value: data,
          });
          if (isUpdate) {
            this.jobOpeningChange.emit(this.jobOpening);
          }
        })
      )
      .subscribe();
  }

  private updateJobOpening(geoId: string, id: string): void {
    const isUpdatedComplete = this.updateGeoId(this.jobOpening, id, geoId);
    console.log(isUpdatedComplete);
    if (isUpdatedComplete) {
      this.jobOpeningChange.emit(this.jobOpening);
    }
  }

  private updateGeoId(
    obj: { [key: string]: any },
    targetId: string,
    newGeoId: string
  ): boolean {
    if (typeof obj === 'object' && obj !== null) {
      if (obj['id'] === targetId) {
        obj['geoId'] = newGeoId;
        return true;
      }
      for (const key in obj) {
        if (this.updateGeoId(obj[key], targetId, newGeoId)) {
          return true;
        }
      }
    } else if (Array.isArray(obj)) {
      //@ts-ignore
      for (const item of obj) {
        if (this.updateGeoId(item, targetId, newGeoId)) {
          return true;
        }
      }
    }
    return false;
  }

  private updateElementById(
    obj: any,
    id: string,
    update: Partial<{ isSelected: boolean; value: any }>
  ): boolean {
    if (obj.id === id) {
      if (Boolean(update.isSelected)) obj.isSelected = update.isSelected;
      if (Boolean(update.value)) obj.value = update.value;
      return true;
    }

    for (const key in obj) {
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        if (Array.isArray(obj[key])) {
          for (const item of obj[key]) {
            if (typeof item === 'object' && item !== null) {
              if (this.updateElementById(item, id, update)) return true;
            }
          }
        } else {
          if (this.updateElementById(obj[key], id, update)) return true;
        }
      }
    }

    return false;
  }

  protected readonly isArray = isArray;
}
