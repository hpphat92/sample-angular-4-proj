import { BaseModel } from './base.model';

export class UserInfo extends BaseModel {
  public firstName: string;
  public lastName: string;
  public phone: string;
  public email: string;
  public driversLicenseUrl: string;
  public publicAdjusterLicenseUrl: string;
  public suretyBondUrl: string;
  public avatarUrl?: string;

  constructor() {
    super();
    this.id = undefined;
    this.firstName = undefined;
    this.lastName = undefined;
    this.phone = undefined;
    this.email = undefined;
    this.driversLicenseUrl = undefined;
    this.publicAdjusterLicenseUrl = undefined;
    this.suretyBondUrl = undefined;
    this.avatarUrl = undefined;
  }
}
