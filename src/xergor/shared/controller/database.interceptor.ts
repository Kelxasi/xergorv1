import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { delay, dematerialize, materialize, Observable, of, throwError } from "rxjs";

const users = [
    {
        id: 1,
        userCode: 'admin',
        password: 'admin',
        firstName: 'Admin',
        lastName: 'User',

    },
    {
        id: 2,
        userCode: 'user',
        password: 'user',
        firstName: 'Normal',
        lastName: 'User',

    },
];

@Injectable()

export class DatabaseInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const { url, method, headers, body } = req;

        return handleRoute();

        function handleRoute() {
            switch (true) {
                case url.endsWith('/user/authenticate') && method === 'POST':
                    return authenticate();
                case url.endsWith('/user') && method === 'GET':
                    return getUsers();
                case url.match(/\/users\/\d+$/) && method === 'GET':
                    return getUserById();
                default:
                    return next.handle(req);
            }
        }

        function authenticate() {
            const { userCode, password } = body;
            const user = users.find(
                (x) => x.userCode === userCode && x.password === password
            );
            if (!user) return error('Username or password is incorrect');
            return ok({
                id: user.id,
                userCode: user.userCode,
                firstName: user.firstName,
                lastName: user.lastName,
                token: `fake-jwt-token.${user.id}`,
            });
        }


        function getUsers() {
            if (false) return unauthorized();
            return ok(users);
        }

        function getUserById() {
            if (!isLoggedIn()) return unauthorized();

            // only admins can access other user records
            if (false && currentUser()!.id !== idFromUrl()) return unauthorized();

            const user = users.find((x) => x.id === idFromUrl());
            return ok(user);
        }

        // helper functions

        function ok(body: any) {
            return of(new HttpResponse({ status: 200, body })).pipe(delay(500)); // delay observable to simulate server api call
        }

        function unauthorized() {
            return throwError({
                status: 401,
                error: { message: 'unauthorized' },
            }).pipe(materialize(), delay(500), dematerialize()); // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648);
        }

        function error(message: any) {
            return throwError({ status: 400, error: { message } }).pipe(
                materialize(),
                delay(500),
                dematerialize()
            );
        }

        function isLoggedIn() {
            const authHeader = headers.get('Authorization') || '';
            return authHeader.startsWith('Bearer fake-jwt-token');
        }
 

        function currentUser() {
            if (!isLoggedIn()) return;
            const id = parseInt(headers.get('Authorization')!.split('.')[1]);
            return users.find((x) => x.id === id);
        }

        function idFromUrl() {
            const urlParts = url.split('/');
            return parseInt(urlParts[urlParts.length - 1]);
        }
    }


}