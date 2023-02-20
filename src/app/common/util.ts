import { Observable } from 'rxjs';

export const createHttpObservable = <T>(url: string): Observable<T> => {
  return new Observable<T>((observer) => {

    const controller = new AbortController();
    const signal = controller.signal;

    fetch(url, { signal })
      .then((response) => {
        return response.json();
      })
      .then((body: T) => {
        observer.next(body);
        observer.complete();
      })
      .catch((error) => {
        observer.error(error);
      })

    return () => controller.abort();

  });
}
