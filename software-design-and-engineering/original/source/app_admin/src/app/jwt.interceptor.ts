import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';

import { AuthenticationService } from './services/authentication.service';

export const jwtInterceptor: HttpInterceptorFn = (request, next) => {
  const authenticationService = inject(AuthenticationService);

  const isAuthAPI =
    request.url.endsWith('/login') ||
    request.url.endsWith('/register');

  if (authenticationService.isLoggedIn() && !isAuthAPI) {
    const token = authenticationService.getToken();

    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(request);
};