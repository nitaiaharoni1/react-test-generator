import { IDiffRaw } from 'rtl-test-generator/src/interfaces/IDiffRaw';
import { ExpectParams } from 'rtl-test-generator/src/models/ExpectParams/ExpectParams';
import { SelectorParams } from 'rtl-test-generator/src/models/SelectorParams/SelectorParams';
import { ICheckParams } from 'rtl-test-generator/src/interfaces/ICheckParams';
import { generateDiffVariableName } from 'rtl-test-generator/src/utils/helpers';

export class Diff implements ICheckParams {
  expects: ExpectParams[];
  selector: SelectorParams;
  rawDiff: IDiffRaw;
  action: string;
  container: Element;
  variable: string;

  constructor(container: Element, diff: IDiffRaw) {
    this.rawDiff = diff;
    this.container = container;
    this.action = diff.action;
    this.variable = this.getVariable();
    this.selector = this.getDiffSelectorParams();
    this.expects = this.getDiffExpectParams();
  }

  getDiffSelectorParams(): SelectorParams {
    return new SelectorParams(this.container, this.variable, undefined, this.rawDiff.node);
  }

  getDiffExpectParams(): ExpectParams[] {
    const expectParams = new ExpectParams({ variable: this.variable });
    return [expectParams];
  }

  getVariable(): string {
    return generateDiffVariableName(this.rawDiff.node!);
  }
}
