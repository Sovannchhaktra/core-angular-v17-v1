import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IRequestOptions } from '../model/request-option';
import { Observable } from 'rxjs';
import { DataResponse } from '../model/data-response';
import { environment } from '../../environments/environment';
import { DetailResponse, ListResponse } from '../model/response.model';
import { InjectionToken, Inject } from '@angular/core';

export const URL_TOKEN = new InjectionToken<string>('url');
@Injectable({
  providedIn: 'root',
})
export class BaseRestService<T> {
  private readonly url: string;
  baseUrl = environment.baseUrl;

  protected httpClient = inject(HttpClient);

  protected constructor(@Inject(URL_TOKEN) url: string) {
    this.url = `${this.baseUrl}/${url}`;
  }

  /**
   * Example
   * getUrl(): string {
   *   return '/api/newsCategory/';
   * }
   */

  // abstract getUrl(): string;

  /**
   * Get a list of resources from server
   * @param options the options of the request
   */
  public list(options?: IRequestOptions): Observable<ListResponse<T>> {
    // if (this.baseParams) {
    //   if (!options) {
    //     options = {};
    //     options.params = new HttpParams();
    //   }
    //   options.params = this.mapAdditionalParams(options.params);
    // }
    return this.httpClient.get<ListResponse<T>>(this.url, options);
  }

  /**
   * Get single object from api
   * @param id the object id
   * @param options the options of the request
   */
  public get(
    id: number,
    options?: IRequestOptions
  ): Observable<DetailResponse<T>> {
    return this.httpClient.get<DetailResponse<T>>(`${this.url}/${id}`, options);
  }

  /**
   * Save a new resource to server
   * @param body the body to saved
   * @param options the options of the request
   */
  public create(
    body: any,
    options?: IRequestOptions
  ): Observable<DataResponse> {
    return this.httpClient.post<DataResponse>(this.url, body, options);
  }

  /**
   * Update an existing resource in server
   * @param id the id of resource
   * @param body the boyd of resource to updated
   * @param options the options of the request
   */
  public update(
    id: number,
    body: any,
    options?: IRequestOptions
  ): Observable<DataResponse> {
    return this.httpClient.put<DataResponse>(
      `${this.url}/${id}`,
      body,
      options
    );
  }

  /**
   * Delete an existing resource from server base on the given resource's id
   * @param id the id of recourse
   * @param options the options of the request
   */
  public delete(
    id: number,
    options?: IRequestOptions
  ): Observable<DataResponse> {
    return this.httpClient.delete<DataResponse>(`${this.url}/${id}`, options);
  }

  /**
   * Map additional params with base params
   * Return new params object
   * @param params
   */
  // private mapAdditionalParams(params: HttpParams) {
  //   for (const key in this.baseParams) {
  //     if (this.baseParams.hasOwnProperty(key) && this.baseParams[key]) {
  //       params = params.set(key, this.baseParams[key]);
  //     }
  //   }
  //   return params;
  // }
}
