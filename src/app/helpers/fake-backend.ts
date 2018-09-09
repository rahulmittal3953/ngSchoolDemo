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
}

export let fakeBackendProvider = {
  // use fake backend in place of Http service for backend-less development
  provide: Http,
  useFactory: fakeBackendFactory,
  deps: [MockBackend, BaseRequestOptions]
};
