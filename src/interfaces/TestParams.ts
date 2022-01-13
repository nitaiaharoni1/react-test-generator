import { IRender } from './IRender';
import { IProps } from './IProps';

export interface ITest extends IRender {
  container: Element;
  name: string;
  props: IProps;
}
