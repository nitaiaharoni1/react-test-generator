import { ExpectParams } from 'rtl-test-generator/src/models/ExpectParams/ExpectParams';
import { SelectorParams } from 'rtl-test-generator/src/models/SelectorParams/SelectorParams';

export interface ICheckParams {
  expects: ExpectParams[];
  selector: SelectorParams;
  variable: string;
}
