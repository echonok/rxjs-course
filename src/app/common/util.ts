import { Observable } from 'rxjs';
import { IAPIResponse } from './api-response.interface';

export const createHttpObservable = <T>(url: string): Observable<IAPIResponse<T>> => {
  return new Observable<IAPIResponse<T>>((observer) => {

    const controller = new AbortController();
    const signal = controller.signal;

    fetch(url, { signal })
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

    return () => controller.abort();

  });
}
