import { IItTestParams } from 'rtl-test-generator/src/models/ItTestParams/ItTestParams';

export interface IDescribeParams {
  wrapper?: string;
  props?: string;
  tests: IItTestParams[];
}

export class DescribeParams implements IDescribeParams {
  wrapper?: string;
  props?: string;
  tests: IItTestParams[];

  constructor(tests: IItTestParams[], props: string = '', wrapper: string = '') {
    this.tests = tests;
    this.props = props;
    this.wrapper = wrapper;
  }
}
