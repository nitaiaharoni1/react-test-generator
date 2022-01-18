import { IDiffRaw } from 'rtl-test-generator/src/interfaces/IDiffRaw';
import { Diff } from 'rtl-test-generator/src/models/Diff/Diff';
import { SelectorParams } from 'rtl-test-generator/src/models/SelectorParams/SelectorParams';

export class DiffModifyText extends Diff {
  constructor(container: Element, diff: IDiffRaw) {
    super(container, diff);
    this.variable = this.getVariable();
  }

  getDiffSelectorParams(): SelectorParams {
    const selector = new SelectorParams(this.container, this.variable, undefined, this.rawDiff.node);
    return {
      ...selector, selector: this.getValue(), isScreen: this.getIsScreen(),
    };
  }

  getValue(): string {
    return this.rawDiff.newValue;
  }

  getIsScreen(): boolean {
    return true;
  }
}
