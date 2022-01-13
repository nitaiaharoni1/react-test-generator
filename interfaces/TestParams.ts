import { IRender } from 'rtl-test-generator/interfaces/IRender';
import { IProps } from 'rtl-test-generator/interfaces/IProps';

export interface ITest extends IRender {
  container: Element;
  name: string;
  props: IProps;
}
