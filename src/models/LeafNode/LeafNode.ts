import { ExpectParams } from 'rtl-test-generator/src/models/ExpectParams/ExpectParams';
import { generateVariableName } from 'rtl-test-generator/src/utils/helpers';
import { SelectorParams } from 'rtl-test-generator/src/models/SelectorParams/SelectorParams';
import { rtlCconstants } from 'rtl-test-generator/src/utils/constants';
import { ICheckParams } from 'rtl-test-generator/src/interfaces/ICheckParams';

export class LeafNode implements ICheckParams {
  expects: ExpectParams[];
  selector: SelectorParams;
  leafElement: Element;
  variable: string;

  constructor(container: Element, leafElement: Element) {
    this.leafElement = leafElement;
    this.variable = this.getVariable();
    this.selector = new SelectorParams(container, this.variable, this.leafElement);
    this.expects = this.getExpectParams();
  }

  getExpectParams(): ExpectParams[] {
    const toHave = this.getToHave();
    const expectParams = new ExpectParams({ variable: this.variable, toHave });
    return [expectParams];
  }

  getToHave(): string {
    return rtlCconstants.TO_BE_IN_THE_DOCUMENT;
  }

  getVariable(): string {
    return generateVariableName(this.leafElement);
  }
}
