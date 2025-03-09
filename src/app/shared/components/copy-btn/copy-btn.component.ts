import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewChild,
} from '@angular/core';
import { MatTooltip } from '@angular/material/tooltip';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';

@Component({
  selector: 'grc-copy-btn',
  imports: [MatIcon, MatIconButton, MatTooltip],
  templateUrl: './copy-btn.component.html',
  styleUrl: './copy-btn.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CopyBtnComponent {
  @Input() value!: string | null | undefined;

  @ViewChild('tp') _matTooltip!: MatTooltip;

  copyText() {
    this.dummy(this.value || '');
    setTimeout(() => {
      this._matTooltip.show();
      this._matTooltip.message = 'Copied!';
    });
    setTimeout(() => {
      this._matTooltip.message = 'Copy';
      this._matTooltip.hide();
    }, 1000);
  }

  dummy(val: string) {
    let selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }
}
