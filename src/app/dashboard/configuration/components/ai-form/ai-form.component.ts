import {
  ChangeDetectionStrategy,
  Component,
  effect,
  EventEmitter,
  Input,
  OnInit,
  Output,
  Signal,
} from '@angular/core';
import { AiFormFieldsEnum } from '../../consts/ai-form-fields.enum';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormField } from '@angular/material/form-field';
import {
  MatLabel,
  MatOptgroup,
  MatOption,
  MatSelect,
} from '@angular/material/select';
import { IDictionaryOption } from '../../../../shared/models/dictionary-option.interface';
import { MatSlider, MatSliderThumb } from '@angular/material/slider';
import { MatInput } from '@angular/material/input';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { pairwise, tap } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { IAiFormData } from '../../models/ia-form.interface';

@UntilDestroy()
@Component({
  selector: 'grc-ai-form',
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatOptgroup,
    MatOption,
    MatSelect,
    MatLabel,
    MatSlider,
    MatSliderThumb,
    MatInput,
    MatIcon,
    MatIconButton,
  ],
  templateUrl: './ai-form.component.html',
  styleUrl: './ai-form.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AiFormComponent implements OnInit {
  @Input() formData!: Signal<IAiFormData | null>;
  @Input() modelOptions: IDictionaryOption[] | null = null;
  @Input() typeOptions: IDictionaryOption[] | null = null;

  @Output() formValueChange = new EventEmitter<IAiFormData>();

  form!: FormGroup;
  isApiTokenDisabled = true;
  apiTokenValue = '';

  constructor(private readonly fb: FormBuilder) {
    this.updateFormAfterFormDataChange();
  }

  ngOnInit() {
    this.form = this.createAiForm();
    this.subscribeValueChanges();
  }

  editApiToken(e: Event) {
    e.preventDefault();
    this.isApiTokenDisabled = false;
    const apiKeyControl = this.form.get(AiFormFieldsEnum.ApiKey);
    this.apiTokenValue = apiKeyControl?.getRawValue();
    this.form.get(AiFormFieldsEnum.ApiKey)?.enable();
  }

  cancelEditApiToken(e: Event) {
    e.preventDefault();
    const apiKeyControl = this.form.get(AiFormFieldsEnum.ApiKey);
    this.isApiTokenDisabled = true;
    apiKeyControl?.setValue(this.apiTokenValue, {
      emitEvent: false,
      onlySelf: false,
    });
    apiKeyControl?.disable();
  }

  private createAiForm() {
    const formData = this.formData();
    return this.fb.group(
      {
        [AiFormFieldsEnum.AiModel]: this.fb.control(
          formData?.aiModelId ?? null
        ),
        [AiFormFieldsEnum.AiType]: this.fb.control(formData?.aiTypeId ?? null),
        [AiFormFieldsEnum.ApiKey]: this.fb.control({
          value: formData?.apiKey ?? '',
          disabled: true,
        }),
        [AiFormFieldsEnum.Temperature]: this.fb.control(
          formData?.temperature ?? null
        ),
        [AiFormFieldsEnum.MaxTokens]: this.fb.control(
          formData?.maxTokens ?? null
        ),
        [AiFormFieldsEnum.PromptForXPath]: this.fb.control(
          formData?.promptForXPath ?? ''
        ),
        [AiFormFieldsEnum.PromptForXPathData]: this.fb.control(
          formData?.promptForXPathData ?? ''
        ),
      },
      { updateOn: 'blur' }
    );
  }

  private subscribeValueChanges() {
    this.form?.valueChanges
      .pipe(
        pairwise<IAiFormData>(),
        tap(([oldFormData, newFormData]: [IAiFormData, IAiFormData]) => {
          if (oldFormData?.apiKey !== newFormData?.apiKey) {
            return;
          }
          console.log('oldFormData', oldFormData);
          this.formValueChange.emit(newFormData);
        }),
        untilDestroyed(this)
      )
      .subscribe();
  }

  private updateFormAfterFormDataChange() {
    effect(() => {
      const formValue = this.formData();
      if (formValue) {
        this.form.patchValue(
          {
            [AiFormFieldsEnum.AiModel]: formValue.aiModelId,
            [AiFormFieldsEnum.AiType]: formValue.aiTypeId,
            [AiFormFieldsEnum.ApiKey]: formValue.apiKey,
            [AiFormFieldsEnum.MaxTokens]: formValue.maxTokens,
            [AiFormFieldsEnum.Temperature]: formValue.temperature,
            [AiFormFieldsEnum.PromptForXPath]: formValue.promptForXPath,
            [AiFormFieldsEnum.PromptForXPathData]: formValue.promptForXPathData,
          },
          { emitEvent: false, onlySelf: false }
        );
      }
    });
  }

  protected readonly AiFormFieldsEnum = AiFormFieldsEnum;
}
