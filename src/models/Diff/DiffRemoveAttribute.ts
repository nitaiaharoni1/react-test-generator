import { IDiffRaw } from 'rtl-test-generator/src/interfaces/IDiffRaw';
import { ExpectParams } from 'rtl-test-generator/src/models/ExpectParams/ExpectParams';
import { Diff } from 'rtl-test-generator/src/models/Diff/Diff';
import { rtlCconstants } from 'rtl-test-generator/src/utils/constants';

export class DiffRemoveAttribute extends Diff {
  expects: ExpectParams[];

  constructor(container: Element, diff: IDiffRaw) {
    super(container, diff);
    this.expects = this.getDiffExpectParams();
  }

  getDiffExpectParams(): ExpectParams[] {
    const isNegative = this.getIsNegative();
    const name = this.getName();
    const value = this.getValue();
    const toHave = this.getToHave();
    const expectParams = new ExpectParams({
      variable: this.variable, isNegative, name, value, toHave,
    });
    return [expectParams];
  }

  getToHave(): string {
    return rtlCconstants.TO_HAVE_ATTRIBUTE;
  }

  getIsNegative(): boolean {
    return true;
  }

  getName(): string {
    return this.rawDiff.name!;
  }

  getValue(): string {
    return this.rawDiff.value!;
  }
}
