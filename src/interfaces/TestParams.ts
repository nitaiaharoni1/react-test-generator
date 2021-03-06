import { IRender } from 'rtl-test-generator/src/interfaces/IRender';
import { IProps } from 'rtl-test-generator/src/interfaces/IProps';

export interface ITest extends IRender {
  container: Element;
  name: string;
  props: IProps;
}
