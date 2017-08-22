import { AnonymousPage, AuthGuard, AuthorizedPage } from "./services/auth-guard/auth-guard.service";
export * from './pipes/shared-pipes.module';
export * from './guard/auth.guard';
export const SHARED_SERVICES = [
  AuthGuard,
  AnonymousPage,
  AuthorizedPage
];
