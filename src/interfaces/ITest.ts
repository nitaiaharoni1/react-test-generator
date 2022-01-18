import { IRender } from 'rtl-test-generator/src/interfaces/IRender';
import { IProps } from 'rtl-test-generator/src/interfaces/IProps';

export interface ITest extends IRender {
  containerOld: Element;
  containerNew: Element;
  name: string;
  props?: IProps | null;
  debug: () => void;
  path: string;
}
