import{
  Http
} from '@angular/http';

import { AuthService } from './auth';
import { ExtendedHttpService } from './http';
import { Util } from './util';
import { ProgressService } from "./progress";
import { EmbeddedCodeService } from "./embeddedcode";

export const SHARED_SERVICES = [
  AuthService,
  Util,
  ProgressService,
  EmbeddedCodeService,
  { provide: Http, useClass: ExtendedHttpService },
];

export * from './auth';
export * from './http';
export * from './util';
export * from './progress';
export * from './embeddedcode';