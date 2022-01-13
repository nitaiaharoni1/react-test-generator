import { ComponentType } from 'react';
import { IProps } from '../interfaces/IProps';

export interface ITestOptions {
  wrappers?: ComponentType[],
  propsArray?: IProps[],
}
