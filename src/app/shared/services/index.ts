import{
  Http
} from '@angular/http';

import { AuthService } from './auth';
import { ExtendedHttpService } from './http';
import { Util } from './util';
import { ProgressService } from "./progress";

export const SHARED_SERVICES = [
  AuthService,
  Util,
  ProgressService,
  { provide: Http, useClass: ExtendedHttpService },
];

export * from './auth';
export * from './http';
export * from './util';
export * from './progress';
