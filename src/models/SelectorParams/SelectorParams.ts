import { IDiffRawNode } from 'rtl-test-generator/src/interfaces/IDiffRaw';
import { DiffSelectorParams } from 'rtl-test-generator/src/models/SelectorParams/DiffSelectorParams';
import { ElemSelectorParams } from 'rtl-test-generator/src/models/SelectorParams/ElemSelectorParams';

export class SelectorParams {
  variable: string;
  selector: string;
  isScreen?: boolean;
  count?: number;

  constructor(container: Element, variable: string, element?: Element, diffRawNode?: IDiffRawNode) {
    let selectorParams: any = {
      selector: '', isScreen: undefined, count: undefined,
    };
    if (diffRawNode) selectorParams = new DiffSelectorParams(container, variable, diffRawNode);
    if (element) selectorParams = new ElemSelectorParams(container, variable, element!);

    const { selector, isScreen, count } = selectorParams;
    this.variable = variable;
    this.selector = selector;
    this.isScreen = isScreen;
    this.count = count;
  }
}
