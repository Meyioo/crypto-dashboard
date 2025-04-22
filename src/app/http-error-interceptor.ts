import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandlerFn,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NotificationService } from './services/notification.service';

export function httpErrorInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> {
  const notificationService = inject(NotificationService);

  return next(req).pipe(
    catchError((error: any) => {
      let userMessage = 'An unexpected error occurred. Please try again.';
      // Handle offline status
      if (!navigator.onLine) {
        userMessage = 'No internet connection. Please check your network.';
      }
      // Handle CORS errors
      else if (error instanceof HttpErrorResponse) {
        if (error.status === 0) {
          if (error.error instanceof ProgressEvent) {
            // This is usually a CORS issue or the server is unreachable.
            userMessage =
              'Connection blocked. Possible CORS error or server is unreachable.';
          } else {
            userMessage = 'Unknown network error occurred.';
          }
        } else if (error.status >= 400 && error.status < 500) {
          userMessage = error.error?.message ?? 'A client-side error occurred.';
        } else if (error.status >= 500) {
          userMessage = 'A server error occurred. Please try again later.';
        }
      }
      // Unknown type of error (maybe a thrown object, or TypeError like in CORS)
      else if (error instanceof TypeError) {
        userMessage =
          'A network error occurred. Possible CORS misconfiguration.';
      }

      notificationService.showError(userMessage);
      return throwError(() => error);
    }),
  );
}
