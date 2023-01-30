import { Observable } from 'rxjs';
import { IAPIResponse } from './api-response.interface';

export const createHttpObservable = <T>(url: string): Observable<IAPIResponse<T>> => {
  return new Observable<IAPIResponse<T>>((observer) => {
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((body: IAPIResponse<T>) => {
        observer.next(body);
        observer.complete();
      })
      .catch((error) => {
        observer.error(error);
      })
  });
}
