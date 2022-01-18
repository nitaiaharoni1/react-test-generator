import { FuncNodeParams } from 'rtl-test-generator/src/models/FunctionNodeParams/FunctionNodeParams';
import { Diff } from 'rtl-test-generator/src/models/Diff/Diff';
import { ItTestParams } from 'rtl-test-generator/src/models/ItTestParams/ItTestParams';

export class ItTestParamsFunctions extends ItTestParams {
  funcNode?: FuncNodeParams;

  constructor(container: Element, checks: Diff[], name: string, funcNode: Element) {
    super(name);
    this.funcNode = new FuncNodeParams(container, funcNode);
    this.checks = checks;
  }
}
