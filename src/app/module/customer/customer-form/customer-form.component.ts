import { Component, Injector } from '@angular/core';
import { BaseForm } from '../../../core/component/base-form';
import { CustomerService } from '../../../service/customer.service';
import { Customer } from '../../../model/customer.model';
import { FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.scss'],
})
export class CustomerFormComponent extends BaseForm<Customer> {
  constructor(
    injector: Injector,
    protected override service: CustomerService,
    private router: Router
  ) {
    super(injector, service);
  }

  getForm(): FormGroup {
    return this.formBuilder.group({
      id: null,
      customerName: [null, Validators.required],
      gender: [null, Validators.required],
      dob: [null, Validators.required],
      phone: [null, Validators.required],
      address: null,
    });
  }

  override afterSaved(res: any = null) {
    super.afterSaved(res);
    this.router.navigate([`/customer/detail/${res.result.id}`]).then();
  }

  override afterUpdated(res: any = null) {
    super.afterUpdated(res);
    this.router.navigate([`/customer/detail/${res.result.id}`]).then();
  }
}
