import {
  Http,
  BaseRequestOptions,
  Response,
  ResponseOptions,
  RequestMethod
} from "@angular/http";
import { MockBackend, MockConnection } from "@angular/http/testing";
import { Student } from "../models/student";
import { Class } from "../models/class";

import {StudentData} from './student.data';
import classesData from './class.data';

export function fakeBackendFactory(
  backend: MockBackend,
  options: BaseRequestOptions
) {
  // configure fake backend
  backend.connections.subscribe((connection: MockConnection) => {
    let testUser = {
      username: "test",
      password: "test",
      firstName: "Test",
      lastName: "User"
    };

  // let student :Student [] = StudentData;
   let classd :Class [] = classesData;

    // wrap in timeout to simulate server api call
    setTimeout(() => {
      // fake authenticate api end point
      if (
        connection.request.url.endsWith("/api/authenticate") &&
        connection.request.method === RequestMethod.Post
      ) {
        // get parameters from post request
        let params = JSON.parse(connection.request.getBody());

        // check user credentials and return fake jwt token if valid
        if (
          params.username === testUser.username &&
          params.password === testUser.password
        ) {
          connection.mockRespond(
            new Response(
              new ResponseOptions({
                status: 200,
                body: { token: "fake-jwt-token", username:testUser.username, firstName: testUser.firstName, lastName : testUser.lastName}
              })
            )
          );
        } else {
          connection.mockRespond(
            new Response(new ResponseOptions({ status: 200 }))
          );
        }
      }

     
       // fake users api end point
       if (
        connection.request.url.endsWith("/api/students") &&
        connection.request.method === RequestMethod.Get
      ) {
        // check for fake auth token in header and return test users if valid, this security is implemented server side
        // in a real application
        if (
          connection.request.headers.get("Authorization") ===
          "Bearer fake-jwt-token"
        ) {
          connection.mockRespond(
            new Response(new ResponseOptions({ status: 200, body: ''/*student*/ }))
          );
        } else {
          // return 401 not authorised if token is null or invalid
          connection.mockRespond(
            new Response(new ResponseOptions({ status: 401 }))
          );
        }
      }
      
      if (
        connection.request.url.endsWith("/api/listclasses") &&
        connection.request.method === RequestMethod.Get
      ) {
        // check for fake auth token in header and return test users if valid, this security is implemented server side
        // in a real application
        if (
          connection.request.headers.get("Authorization") ===
          "Bearer fake-jwt-token"
        ) {
          connection.mockRespond(
            new Response(new ResponseOptions({ status: 200, body: classd }))
          );
        } else {
          // return 401 not authorised if token is null or invalid
          connection.mockRespond(
            new Response(new ResponseOptions({ status: 401 }))
          );
        }
      }

      // fake users api end point
      if (
        connection.request.url.endsWith("/api/users") &&
        connection.request.method === RequestMethod.Get
      ) {
        // check for fake auth token in header and return test users if valid, this security is implemented server side
        // in a real application
        if (
          connection.request.headers.get("Authorization") ===
          "Bearer fake-jwt-token"
        ) {
          connection.mockRespond(
            new Response(new ResponseOptions({ status: 200, body: [testUser] }))
          );
        } else {
          // return 401 not authorised if token is null or invalid
          connection.mockRespond(
            new Response(new ResponseOptions({ status: 401 }))
          );
        }
      }
    }, 500);
  });

  return new Http(backend, options);
}

export let fakeBackendProvider = {
  // use fake backend in place of Http service for backend-less development
  provide: Http,
  useFactory: fakeBackendFactory,
  deps: [MockBackend, BaseRequestOptions]
};
