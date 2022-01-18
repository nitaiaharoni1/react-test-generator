import { ComponentType } from 'react';
import { IProps } from 'rtl-test-generator/src/interfaces/IProps';

export interface ITestOptions {
  wrappersArr?: ComponentType[],
  wrapper?: ComponentType,
  propsArr?: IProps[],
  props?: IProps,
}

export type IWrapperTestPermutaions = ComponentType | null;
export type IPropsTestPermutations = IProps | null;

export interface ITestOptionsPermutation {
  wrapper: IWrapperTestPermutaions,
  props: IPropsTestPermutations,
}
