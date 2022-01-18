import { ReactElement } from 'react';
import { IRenderOptions } from 'rtl-test-generator/src/interfaces/IRenderOptions';

export interface IRender {
  component: ReactElement,
  options?: IRenderOptions,
}
