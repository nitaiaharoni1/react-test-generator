import { ReactElement } from 'react';
import { IRenderOptions } from 'rtl-test-generator/interfaces/IRenderOptions';

export interface IRender {
  component: ReactElement,
  options?: IRenderOptions,
  debug?: any,
}
