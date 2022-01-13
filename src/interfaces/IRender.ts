import { ReactElement } from 'react';
import { IRenderOptions } from './IRenderOptions';

export interface IRender {
  component: ReactElement,
  options?: IRenderOptions,
  debug?: any,
}
