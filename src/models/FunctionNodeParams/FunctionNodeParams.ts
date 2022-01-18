import { FireEventParams } from 'rtl-test-generator/src/models/FireEventParams/FireEventParams';
import { SelectorParams } from 'rtl-test-generator/src/models/SelectorParams/SelectorParams';
import { generateVariableName } from 'rtl-test-generator/src/utils/helpers';

export interface IFuncNodeParams {
  selector: SelectorParams;
  fire: FireEventParams;
}

export class FuncNodeParams implements IFuncNodeParams {
  selector: SelectorParams;
  fire: FireEventParams;
  funcNodeElement: Element;
  variable: string;

  constructor(container: Element, funcNode: Element) {
    this.funcNodeElement = funcNode;
    this.variable = this.getVariable();
    this.selector = this.getSelectorParams(container);
    this.fire = this.getFireEventParams();
  }

  getFireEventParams(): FireEventParams {
    const event = this.getEvent();
    return new FireEventParams(event, this.variable);
  }

  getEvent(): string {
    return 'click';
  }

  getSelectorParams(container: Element): SelectorParams {
    return new SelectorParams(container, this.variable, this.funcNodeElement);
  }

  getVariable(): string {
    return generateVariableName(this.funcNodeElement);
  }
}
