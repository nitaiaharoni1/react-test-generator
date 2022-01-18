import { generateDiffQuerySelector } from 'rtl-test-generator/src/utils/helpers';
import { IDiffRawNode } from 'rtl-test-generator/src/interfaces/IDiffRaw';
import { SelectorParams } from 'rtl-test-generator/src/models/SelectorParams/SelectorParams';

export class DiffSelectorParams implements SelectorParams {
  variable: string;
  selector: string;
  isScreen?: boolean;
  count?: number;

  constructor(container: Element, variable: string, node: IDiffRawNode) {
    const querySelector = generateDiffQuerySelector(node);
    this.selector = querySelector;
    this.isScreen = false;
    this.variable = variable;
    this.count = Array.from(container.querySelectorAll(querySelector)).length;
  }
}
