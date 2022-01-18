import { FuncNodeParams } from 'rtl-test-generator/src/models/FunctionNodeParams/FunctionNodeParams';
import { ICheckParams } from 'rtl-test-generator/src/interfaces/ICheckParams';

export interface IItTestParams {
  name: string;
  funcNode?: FuncNodeParams;
  checks: ICheckParams[];
}

export class ItTestParams implements IItTestParams {
  name: string;
  funcNode?: FuncNodeParams;
  checks: ICheckParams[];

  constructor(name: string) {
    this.name = name;
    this.checks = [];
  }
}
