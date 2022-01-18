import { IDescribeParams } from 'rtl-test-generator/src/models/DescribeParams/DescribeParams';

export interface ITemplateParams {
  describes: IDescribeParams[];
  component: string;
}
