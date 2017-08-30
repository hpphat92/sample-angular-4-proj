export class UserToken {
  public accessToken: string;
  public refreshToken: string;
  public expiresIn: number;
  public basicInfo: any;

  constructor() {
    this.accessToken = undefined;
    this.refreshToken = undefined;
    this.expiresIn = undefined;
    this.basicInfo = undefined;
  }
}
