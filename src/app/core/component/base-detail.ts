import { LoadingService } from '../../share/service/loading.service';
import { MsgService } from '../../share/service/msg.service';
import { ConfirmationService } from 'primeng/api';
import { ActivatedRoute, Params } from '@angular/router';
import { BaseRestService } from '../../service/base-rest.service';
import { Injector } from '@angular/core';
import { DetailResponse } from '../../model/response.model';

export class BaseDetail<T> {
  record: T;
  id: number;
  loadingService: LoadingService;
  msgService: MsgService;
  confirmationService: ConfirmationService;
  activatedRoute: ActivatedRoute;

  constructor(
    private injector: Injector,
    protected service: BaseRestService<T>
  ) {
    this.loadingService = injector.get(LoadingService);
    this.msgService = injector.get(MsgService);
    this.confirmationService = injector.get(ConfirmationService);
    this.activatedRoute = injector.get(ActivatedRoute);
    this.activatedRoute.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.loadDetail();
    });
  }

  /**
   * call service to get object data and assign to obj
   */
  loadDetail() {
    this.loadingService.load();
    this.service.get(this.id).subscribe((res: DetailResponse<T>) => {
      this.record = res.result!;
      this.afterLoadDetail();
      this.loadingService.stop();
    });
  }

  /**
   * In case chile component want to perform other tasks after get detail
   * this method will handler after got response from get detail data
   * overwrite this method if you have other tasks after got data response
   */
  afterLoadDetail() {}
}
