/**
 * File name
 * Purpose
 * CreatedBy Date => By function
 * Change History
 * UpdatedBy Date => By function
 */
import { Injector } from '@angular/core';
import { LoadingService } from '../../share/service/loading.service';
import { MsgService } from '../../share/service/msg.service';
import { ConfirmationService } from 'primeng/api';
import { HttpParams } from '@angular/common/http';
import { IRequestOptions } from '../../model/request-option';
import { BaseRestService } from '../../service/base-rest.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { query } from '@angular/animations';

export class BaseList<T> {
  form: FormGroup;
  private MAX_PER_PAGE = 'mpp';
  records!: T[]; // Data from API
  totalRecord = 0; // Total number of record in DB
  pageIndex = 0;
  pageOptions = [10, 25, 50, 100]; // Option dropdown in pagination
  params: any;
  query: any;
  scrollHeight: string; // Height of scroll in table
  loadingService: LoadingService;
  msgService: MsgService;
  confirmationService: ConfirmationService;
  formBuilder: FormBuilder;

  constructor(
    private injector: Injector,
    protected service: BaseRestService<T>,
    isLoad = true
  ) {
    this.loadingService = injector.get(LoadingService);
    this.msgService = injector.get(MsgService);
    this.confirmationService = injector.get(ConfirmationService);
    this.formBuilder = injector.get(FormBuilder);
    this.scrollHeight = `${window.innerHeight - 230}px`;
    if (isLoad) {
      this.list();
    }
    this.form = this.getFormSearch();
  }

  list() {
    this.loadingService.load();
    const reqOpt: IRequestOptions = { params: this.prepareParams() };
    this.service.list(reqOpt).subscribe((res) => {
      console.log('res', res);
      this.records = res.result!;
      this.totalRecord = res.total;
      this.loadingService.stop();
    });
  }

  getFormSearch(): FormGroup {
    return this.formBuilder.group({
      query: null,
    });
  }

  paginate(event: any) {
    this.pageIndex = event.first / event.rows;
    this.setMaxPerPage(event.rows);
    this.list();
  }

  private prepareParams() {
    const mpp = this.getMaxPerPage();
    let params = new HttpParams()
      .set('offset', this.pageIndex.toString())
      .set('max', mpp.toString());
    for (const key in this.query) {
      if (this.query.hasOwnProperty(key)) {
        if (this.query[key]) {
          params = params.set(key, this.query[key]);
        }
      }
    }
    return params;
  }

  private setMaxPerPage(maxPerPage: number) {
    localStorage.setItem(this.MAX_PER_PAGE, maxPerPage.toString());
  }

  getMaxPerPage(): number {
    const value = localStorage.getItem(this.MAX_PER_PAGE);
    return value ? +value : 10;
  }

  submitSearch() {
    this.pageIndex = 0;
    this.query = query;
    this.list();
  }
}
