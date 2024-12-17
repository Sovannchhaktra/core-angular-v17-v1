import { Injector } from '@angular/core';
import { LoadingService } from '../../share/service/loading.service';
import { MsgService } from '../../share/service/msg.service';
import { ConfirmationService, Message } from 'primeng/api';
import { BaseRestService } from '../../service/base-rest.service';
import { ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormGroup, ValidationErrors } from '@angular/forms';
import { RightPanelService } from '../../service/right-panel.service';

export abstract class BaseForm<T> {
  record: T;
  id: number;
  form: FormGroup;
  formBuilder: FormBuilder;
  loadingService: LoadingService;
  rightPanelService: RightPanelService;
  msgService: MsgService;
  confirmationService: ConfirmationService;
  activatedRoute: ActivatedRoute;

  private static focusInvalidControl() {
    const fieldInvalid: any = [].slice.call(
      document.getElementsByClassName('ng-invalid')
    );
    fieldInvalid[1].focus();
  }

  protected constructor(
    private injector: Injector,
    protected service: BaseRestService<T>
  ) {
    this.formBuilder = injector.get(FormBuilder);
    this.loadingService = injector.get(LoadingService);
    this.msgService = injector.get(MsgService);
    this.confirmationService = injector.get(ConfirmationService);
    this.activatedRoute = injector.get(ActivatedRoute);
    this.rightPanelService = injector.get(RightPanelService);
    this.form = this.getForm();
    this.activatedRoute.params.subscribe((params: Params) => {
      const { id } = params;
      if (id) {
        this.id = id;
        this.loadRecordToForm(this.id);
      }
    });
  }

  /**
   * implement require
   * URL back to list
   */

  // abstract getListUrl(): string;

  /**
   * implement require
   * Prepare Reactive Form for both Add and Edit
   */
  abstract getForm(): FormGroup;

  /**
   * Re-initialize form
   */
  resetForm() {
    this.form = this.getForm();
  }

  /**
   * You can custom your form or value before patch value into form .
   * Ex. this form have form array inside that require to create form array base on record load from database
   * some case you can change data before load to form by use variable this.obj
   */
  beforePatchValue(values: any): Promise<any> {
    return new Promise((resolve) => resolve(values));
  }

  /**
   * get data from API for edit
   * @param id
   */
  loadRecordToForm(id: number) {
    this.loadingService.load();
    this.service.get(id).subscribe((data: any) => {
      this.record = data.result;
      this.beforePatchValue(this.record).then((obj) => {
        this.form.patchValue(obj);
        this.loadingService.stop();
      });
    });
  }

  submit() {
    this.msgService.clearMessage();
    if (this.form.invalid) {
      this.loadMessageError();
      return;
    }
    const values = this.bindValue();
    if (this.id) {
      this.update(values);
    } else {
      this.create(values);
    }
  }

  /**
   * Bind value from form to object
   * it allows to overwrite if you need customize data before save
   */
  bindValue(): any {
    return this.form.value;
  }

  create(obj: any) {
    this.loadingService.load();
    this.service.create(obj).subscribe((res: any) => {
      if (res.code === 200) {
        this.afterSaved(res);
      } else {
        this.msgService.error('Exception', res.response.message);
      }
      this.loadingService.stop();
    });
  }

  update(obj: any) {
    this.loadingService.load();
    this.record = obj;
    this.service.update(this.id, this.record).subscribe((res: any) => {
      if (res.code === 200) {
        this.afterUpdated(res);
      } else {
        this.msgService.error('Exception', res.response.message);
      }
      this.loadingService.stop();
    });
  }

  /**
   * navigate back to list after add, edit successfully
   */
  // showList() {
  //     this.helperService.navigateAfterSuccess(this.getListUrl());
  // }
  //
  // close() {
  //     this.helperService.navigate(this.getListUrl());
  // }

  afterUpdated(res: any = null) {
    this.msgService.success('Updated', 'Record was updated successfully.');
  }

  afterSaved(res: any = null) {
    this.msgService.success('Created', 'Record was created successfully.');
  }

  /**
   * check submit form if there are invalid by validation setup
   * @private
   */
  private loadMessageError() {
    BaseForm.focusInvalidControl();
    const messages: Message[] = [];
    Object.keys(this.form.controls).forEach((key) => {
      const controlErrors: ValidationErrors | null | undefined =
        this.form.get(key)?.errors;
      if (controlErrors != null) {
        Object.keys(controlErrors).forEach((keyError) => {
          let msg: string;
          switch (keyError) {
            case 'required':
              msg = ` is required!`;
              break;
            case 'pattern':
              msg = ` has wrong pattern!`;
              break;
            case 'email':
              msg = ` has wrong email format!`;
              break;
            case 'minlength':
              msg = ` has wrong length! Required length: ${controlErrors[keyError].requiredLength}`;
              break;
            case 'maxlength':
              msg = ` has wrong length! Max length: ${controlErrors[keyError].requiredLength}`;
              break;
            case 'areEqual':
              msg = ` must be equal!`;
              break;
            default:
              msg = ` ${keyError}: ${controlErrors[keyError]}`;
          }
          messages.push({
            severity: 'warn',
            summary: `${this.getFieldDisplay(key)}`,
            detail: msg,
          });
        });
      }
    });
    this.rightPanelService.addFormValidation(messages);
  }

  /**
   * transfer field name to label for display in error message
   * @param fieldName
   * @private
   */
  private getFieldDisplay(fieldName: string): string {
    const a = fieldName.split(/(?=[A-Z])/);
    let result = '';
    a.forEach((value) => {
      result += value.charAt(0).toUpperCase() + value.slice(1) + ' ';
    });
    return result;
  }
}
