import { RenderOptions } from '@testing-library/react';
import { ComponentType } from 'react';

export interface IRenderOptions extends RenderOptions {
  wrappers?: ComponentType[],
}
