import { Injectable } from '@angular/core';
import { BaseRestService } from './base-rest.service';
import { Customer } from '../model/customer.model';

@Injectable({
  providedIn: 'root',
})
export class CustomerService extends BaseRestService<Customer> {
  constructor() {
    super('customer');
  }

  exchangeKey(publicKey: string) {
    return this.httpClient.post(`http://192.168.4.21:8083/sts/initigital`, {
      reqTempPublicKey: publicKey,
    });
  }
}
