export class UserToken {
  public accessToken: string;
  public refreshToken: string;
  public expiresIn: number;
  public basicInfo: any;
  public isLoggedInAsImperson: boolean;

  constructor() {
    this.accessToken = undefined;
    this.refreshToken = undefined;
    this.expiresIn = undefined;
    this.basicInfo = undefined;
    this.isLoggedInAsImperson = false;
  }
}

export interface SettingInfo {
  key: string;
  value: string;
}