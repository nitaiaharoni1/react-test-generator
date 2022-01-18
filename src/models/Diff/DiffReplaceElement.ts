import { Diff } from 'rtl-test-generator/src/models/Diff/Diff';
import { ExpectParams } from 'rtl-test-generator/src/models/ExpectParams/ExpectParams';
import { IDiffRaw } from 'rtl-test-generator/src/interfaces/IDiffRaw';
import { generateDiffVariableName } from 'rtl-test-generator/src/utils/helpers';
import { SelectorParams } from 'rtl-test-generator/src/models/SelectorParams/SelectorParams';

export class DiffReplaceElement extends Diff {
  // expects: ExpectParams[];
  // selector: SelectorParams;
  //
  // constructor(container: Element, diff: IDiffRaw) {
  //   super(container, diff);
  //   this.selector = this.getDiffSelectorParams();
  //   this.expects = this.getDiffExpectParams();
  // }
  //
  // getDiffSelectorParams(): SelectorParams {
  //   return new SelectorParams(this.container,this.variable, undefined, this.rawDiff.element!);
  // }
  //
  // getDiffExpectParams(): ExpectParams[] {
  //   const variable = this.getVariable();
  //   const expectParams = new ExpectParams({ variable });
  //   return [expectParams];
  // }
  //
  // getVariable(): string {
  //   return generateDiffVariableName(this.rawDiff.element!);
  // }
}
