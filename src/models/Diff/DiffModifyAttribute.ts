import { IDiffRaw } from 'rtl-test-generator/src/interfaces/IDiffRaw';
import { ExpectParams } from 'rtl-test-generator/src/models/ExpectParams/ExpectParams';
import { Diff } from 'rtl-test-generator/src/models/Diff/Diff';
import { rtlCconstants } from 'rtl-test-generator/src/utils/constants';

export class DiffModifyAttribute extends Diff {
  expects: ExpectParams[];

  constructor(container: Element, diff: IDiffRaw) {
    super(container, diff);
    this.expects = this.getDiffExpectParams();
  }

  getDiffExpectParams(): ExpectParams[] {
    const name = this.getName();
    const value = this.getValue();
    const toHave = this.getToHave();
    const expectParams = new ExpectParams({
      variable: this.variable, name, value, toHave,
    });
    return [expectParams];
  }

  getToHave(): string {
    return rtlCconstants.TO_HAVE_ATTRIBUTE;
  }

  getName(): string {
    return this.rawDiff.name!;
  }

  getValue(): string {
    return this.rawDiff.value!;
  }
}
