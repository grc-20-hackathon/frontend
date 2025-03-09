import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatError, MatFormField } from '@angular/material/form-field';
import { MatButton } from '@angular/material/button';
import { MatInput } from '@angular/material/input';
import { MatLabel } from '@angular/material/select';

@Component({
  imports: [
    MatDialogTitle,
    MatDialogContent,
    ReactiveFormsModule,
    MatFormField,
    MatDialogActions,
    MatButton,
    MatInput,
    MatError,
    MatLabel,
  ],
  templateUrl: './add-site-dialog.component.html',
  styleUrl: './add-site-dialog.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddSiteDialogComponent implements OnInit {
  siteForm!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddSiteDialogComponent>,
    private readonly fb: FormBuilder
  ) {}

  ngOnInit() {
    this.createForm();
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onAdd(): void {
    if (this.siteForm.valid) {
      this.dialogRef.close(this.siteForm.value.siteUrl);
    }
  }

  private createForm(): void {
    this.siteForm = this.fb.group(
      {
        siteUrl: this.fb.control('', [
          Validators.required,
          Validators.pattern(
            '^(https?:\\/\\/)?' + // protocol
              '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
              '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
              '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
              '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
              '(\\#[-a-z\\d_]*)?$'
          ),
        ]),
      },
      { updateOn: 'change' }
    );
  }
}
