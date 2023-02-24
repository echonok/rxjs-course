import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

export enum RxJSLogging {
  TRACE,
  DEBUG,
  INFO,
  ERROR,
}

let _rxjsLoggingLevel = RxJSLogging.INFO;

export const setRxjsLoggingLevel = (level: RxJSLogging) => _rxjsLoggingLevel = level;

export const debug = (level: number, message: string) => {
  return (source: Observable<any>) => source
    .pipe(
      tap((value) => {
        if (level >= _rxjsLoggingLevel) {
          console.log(message + ':', value);
        }
      })
    )
}
