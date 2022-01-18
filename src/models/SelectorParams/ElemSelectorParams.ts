import { generateQuerySelector } from 'rtl-test-generator/src/utils/helpers';
import { SelectorParams } from 'rtl-test-generator/src/models/SelectorParams/SelectorParams';

export class ElemSelectorParams implements SelectorParams {
  variable: string;
  selector: string;
  isScreen?: boolean;
  count?: number;

  constructor(container: Element, variable: string, element: Element) {
    this.variable = variable;
    const querySelector = generateQuerySelector(element);
    this.selector = element.textContent || querySelector;
    this.isScreen = !!element.textContent;
    this.count = Array.from(container.querySelectorAll(querySelector)).length;
  }
}
