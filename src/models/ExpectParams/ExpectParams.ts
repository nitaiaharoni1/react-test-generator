import { rtlCconstants } from 'rtl-test-generator/src/utils/constants';

export interface IExpectParams {
  variable?: string;
  name?: string;
  value?: string;
  notExact?: boolean;
  isNegative?: boolean;
  toHave?: string;
}

export class ExpectParams implements IExpectParams {
  variable: string;
  name?: string;
  value?: string;
  toHave?: string;
  notExact?: boolean;
  isNegative?: boolean;

  constructor(expectArgs: IExpectParams = {}) {
    const { variable, name, value, toHave, notExact, isNegative } = expectArgs;
    this.variable = variable || this.getVariable();
    this.name = name || this.getName();
    this.value = value || this.getValue();
    this.toHave = toHave || this.getToHave();
    this.notExact = notExact || this.getNotExact();
    this.isNegative = isNegative || this.getIsNegative();
  }

  getToHave(): string {
    return rtlCconstants.TO_BE_IN_THE_DOCUMENT;
  }

  getName(): string {
    return '';
  }

  getValue(): string {
    return '';
  }

  getVariable(): string {
    return '';
  }

  getIsNegative(): boolean {
    return false;
  }

  getNotExact(): boolean {
    return false;
  }
}
