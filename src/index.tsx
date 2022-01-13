/* eslint-disable no-param-reassign, prefer-const */
import fs from 'fs';

import { render } from '@testing-library/react';
import React, { ComponentType, JSXElementConstructor, ReactElement } from 'react';
import Handlebars from 'handlebars';
import { fullTestTemplate } from './templates';
import { generateSmokeTest } from './smokeTest';
import { generateFunctionTests } from './functionTest';
import { cloneDeep, uniqBy } from 'lodash';
import { IProps } from './interfaces/IProps';
import { ITest } from './interfaces/TestParams';
import callerPath from 'caller-path';
import { getResultText } from './utils/helpers';
import { ITestOptions } from './interfaces/ITestOptions';
import { html } from 'js-beautify';

let test: ITest;
let path: string = '';

export const initTest = (Component: JSXElementConstructor<any>, props: IProps = {}, wrapper: ComponentType | undefined = undefined): ITest => {
  const options = wrapper ? { wrapper } : {};
  const { container, debug } = render(<Component {...props}/>, options);
  const { innerHTML } = container;
  if (!innerHTML) throw new Error('Something went wrong. The component did not render. Probably something is worng with the props or providers');
  const wrapperName = wrapper ? wrapper.name : '';
  const debugFileName = `${Component.name}-props#${props.index}${wrapperName ? `-${wrapperName}` : ''}.html`;
  const debugPath = `${path}/${debugFileName}`;
  const htmlString = html(innerHTML);
  fs.writeFileSync(debugPath, htmlString);
  const component: ReactElement = <Component {...props}/>;
  const { name } = Component;
  return cloneDeep({
    component,
    props,
    options,
    container,
    debug,
    name,
  });
};

const printTest = (templateParams: any) => {
  const template = Handlebars.compile(fullTestTemplate);
  const result = template(templateParams);
  const resultText = getResultText(result);
  const testPath = `${path}/${test.name}.test.tsx`;
  fs.writeFileSync(testPath, resultText);
};

const iteratePropsArray = (propsArray: IProps[], Component: JSXElementConstructor<any>, wrapper?: ComponentType) =>
  propsArray.map((props: IProps, propIndex: number) => {
    props.index = propIndex;
    test = initTest(Component, props, wrapper);
    const smokeTestContent = generateSmokeTest(test);
    const functionTests = generateFunctionTests(test);
    const propsStr = JSON.stringify(props, (k: any, v: any) => {
      if (typeof v === 'function') {
        return v.name === 'mockConstructor' ? 'jest.fn()' : v.name;
      }
      return v;
    });
    const describe = {
      tests: [smokeTestContent, ...functionTests],
      componentName: test.name,
      propIndex: propIndex + 1,
    };
    // @ts-ignore
    if (props && propsStr !== '{}') describe.props = propsStr;
    // @ts-ignore
    if (wrapper?.name) describe.wrapperName = wrapper.name;
    return describe;
  });

export const getDescribes = (propsArray: IProps[], Component: JSXElementConstructor<any>, wrappers?: ComponentType[]) => {
  let describes;
  if (!wrappers || wrappers?.length === 0) {
    describes = iteratePropsArray(propsArray, Component).flat();
  } else {
    describes = wrappers?.map((wrapper) => iteratePropsArray(propsArray, Component, wrapper)).flat();
  }
  return describes;
};

export const generate = (Component: JSXElementConstructor<any>, testOptions: ITestOptions) => {
  let { propsArray = [{}], wrappers } = testOptions;
  path = `${callerPath()?.split('/').slice(0, -1).join('/')}`;
  if (propsArray.length === 0) propsArray = [{}];
  propsArray = uniqBy(propsArray, JSON.stringify);
  const describes = getDescribes(propsArray, Component, wrappers);
  const uniqueDescribes = uniqBy(describes, (e: any) => e.tests?.map((test: any) => test.content).join(' '));
  printTest({
    describes: uniqueDescribes,
    componentName: test.name,
  });
};
