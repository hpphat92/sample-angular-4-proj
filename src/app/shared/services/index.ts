import{
  Http
} from '@angular/http';

import { AuthService } from './auth';
import { ExtendedHttpService } from './http';
import { Util } from './util';

export const SHARED_SERVICES = [
  AuthService,
  Util,
  { provide: Http, useClass: ExtendedHttpService },
];

export * from './auth';
export * from './http';
export * from './util';
