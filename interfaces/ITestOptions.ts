import { ComponentType } from 'react';
import { IProps } from 'rtl-test-generator/interfaces/IProps';

export interface ITestOptions {
  wrappers?: ComponentType[],
  propsArray?: IProps[],
}
