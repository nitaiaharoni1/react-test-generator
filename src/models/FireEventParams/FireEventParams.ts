export interface IFireEventParams {
  event: string;
  variable: string;
}

export class FireEventParams implements IFireEventParams {
  event: string;
  variable: string;

  constructor(event: string, variable: string) {
    this.event = event;
    this.variable = variable;
  }
}
