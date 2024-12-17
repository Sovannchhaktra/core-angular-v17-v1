import { Component, Injector } from '@angular/core';
import { BaseDetail } from '../../../core/component/base-detail';
import { CustomerService } from '../../../service/customer.service';
import { Customer } from '../../../model/customer.model';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.scss'],
})
export class CustomerDetailComponent extends BaseDetail<Customer> {
  constructor(injector: Injector, protected override service: CustomerService) {
    super(injector, service);
  }
}
