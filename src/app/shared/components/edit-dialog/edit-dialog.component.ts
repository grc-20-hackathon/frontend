import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatInput } from '@angular/material/input';

@Component({
  imports: [MatDialogModule, FormsModule, MatButton, MatInput],
  templateUrl: './edit-dialog.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditDialogComponent {
  editedText: string;

  constructor(
    public dialogRef: MatDialogRef<EditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { text: string }
  ) {
    this.editedText = data.text;
  }

  onSave(): void {
    this.dialogRef.close(this.editedText);
  }

  onCancel(): void {
    this.dialogRef.close(null);
  }
}
