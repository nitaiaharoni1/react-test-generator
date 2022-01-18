/* eslint-disable prefer-const */
import fs from 'fs';

import { render } from '@testing-library/react';
import { JSXElementConstructor, ReactElement } from 'react';
import { isEmpty, uniq } from 'lodash';
import callerPath from 'caller-path';
import { getPropsString, printTest } from 'rtl-test-generator/src/utils/helpers';
import { getFunctionTestsParams } from 'rtl-test-generator/src/functionTest';
import { DescribeParams } from 'rtl-test-generator/src/models/DescribeParams/DescribeParams';
import { getSmokeTestParams } from 'rtl-test-generator/src/smokeTest';
import { ITest } from 'rtl-test-generator/src/interfaces/ITest';
import {
  IPropsTestPermutations,
  ITestOptions,
  ITestOptionsPermutation,
  IWrapperTestPermutaions,
} from 'rtl-test-generator/src/interfaces/ITestOptions';

// @ts-ignore
let test: ITest = {};

export const generate = (Component: JSXElementConstructor<any>, testOptions?: ITestOptions) => {
  const testPermutations = getTestOptionsPermutations(testOptions);
  const describes = testPermutations.map((testPermutation) => getDescribeParams(Component, testPermutation));
  const templateParams = { describes, component: test.name };
  printTest(templateParams, test);
};

export const initTest = (Component: JSXElementConstructor<any>, testPermutation: ITestOptionsPermutation): ITest => {
  const path = `${callerPath()?.split('/').slice(0, -1).join('/')}/tests`;
  if (!fs.existsSync(path)) fs.mkdirSync(path);
  const { props, wrapper } = testPermutation;
  const options = wrapper ? { wrapper } : undefined;
  const { container, debug } = render(<Component {...props}/>, options);
  const component: ReactElement = <Component {...props}/>;
  const { name } = Component;
  return {
    path,
    component,
    debug,
    props,
    options,
    containerNew: container,
    containerOld: container.cloneNode(true) as Element,
    name,
  };
};

const getDescribeParams = (Component: JSXElementConstructor<any>, testPermutation: ITestOptionsPermutation): DescribeParams => {
  const { wrapper, props } = testPermutation;
  test = initTest(Component, testPermutation);
  const smokeTestContent = getSmokeTestParams(test);
  const functionTests = getFunctionTestsParams(test);
  const propsStr = getPropsString(props);
  return new DescribeParams([smokeTestContent, ...functionTests], propsStr, wrapper?.name);
};

const getTestOptionsPermutations = (testOptions: ITestOptions | undefined): ITestOptionsPermutation[] => {
  if (!testOptions || isEmpty(testOptions)) return [{ wrapper: null, props: null }];
  const { propsArr, wrappersArr, props, wrapper } = testOptions;

  let propsPermutations: IPropsTestPermutations[] = propsArr || [];
  let wrapperPermutations: IWrapperTestPermutaions[] = wrappersArr || [];

  if (!isEmpty(props)) propsPermutations.push(props as IPropsTestPermutations);
  if (wrapper) wrapperPermutations.push(wrapper);

  if (isEmpty(propsPermutations)) propsPermutations.push(null);
  if (isEmpty(wrapperPermutations)) wrapperPermutations.push(null);

  propsPermutations = uniq(propsPermutations);
  return wrapperPermutations.flatMap((wrapr) =>
    propsPermutations.map((prop) =>
      ({ wrapper: wrapr, props: prop })));
};

