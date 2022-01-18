import fs from 'fs';

import { camelCase, isEmpty } from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import { IDiffRawNode } from 'rtl-test-generator/src/interfaces/IDiffRaw';
import { rtlCconstants, TESTED_DIFF_ACTIONS, TESTED_DIFF_ATTRIBUTE_NAMES } from 'rtl-test-generator/src/utils/constants';
import beautify from 'js-beautify';
import { beautifyOptions } from 'rtl-test-generator/src/utils/beautifyOptions';
import { Handlebars } from 'rtl-test-generator/src/initHandleBars';
import { fullTestTemplate } from 'rtl-test-generator/src/templates';
import { ITemplateParams } from 'rtl-test-generator/src/interfaces/ITemplateParams';
import { ITest } from 'rtl-test-generator/src/interfaces/ITest';

export const shouldIgnoreDiff = (diff: any) =>
  !diff
  || !TESTED_DIFF_ACTIONS.includes(diff.action)
  || (diff.action === rtlCconstants.MODIFIED_ATTRIBUTE_ACTION && !TESTED_DIFF_ATTRIBUTE_NAMES.includes(diff.name));

export const parseClassNameCleanCss = (className?: string): string => className?.replace(/css-.*(\s)?/g, '')?.trim() || '';

export const parseClassNameWithDots = (className: string): string =>
  parseClassNameCleanCss(className)?.replace(/\s/g, '.')?.replace(/\.$/, '').trim();

export const parseElementsClassNameWithDots = (el: Element) => (el?.className ? `.${parseClassNameWithDots(el.className)}` : '');

export const generateDiffQuerySelector = (diffNode: IDiffRawNode) => {
  const { nodeName, attributes } = diffNode;
  const tagName = nodeName?.toLowerCase();
  const classNames = parseClassNameCleanCss(attributes?.class);
  const id = attributes?.id;
  if (tagName === 'html') return 'HTML';
  let str = tagName;
  str += id ? `#${id}` : '';
  if (classNames) {
    const classes = classNames.split(/\s/);
    classes?.forEach((c: string) => {
      str += `.${c}`;
    });
  }
  return str;
};

export const generateQuerySelector = (el: Element) => {
  const tagName = el.tagName?.toLowerCase();
  const classNames = parseClassNameCleanCss(el.className);
  if (tagName.toLowerCase() === 'html') return 'HTML';
  let str = tagName;
  str += el.id ? `#${el.id}` : '';
  if (classNames) {
    const classes = classNames.split(/\s/);
    classes?.forEach((c: string) => {
      str += `.${c}`;
    });
  }
  return str;
};

export const generateDiffVariableName = (diffNode: IDiffRawNode) => {
  const { nodeName = '', data = '', attributes } = diffNode;
  let str = '';
  const id = attributes?.id;
  const role = attributes?.role;
  if (nodeName) str += nodeName.toLowerCase();
  if (id) str += `-${id}`;
  if (role) str += `-${role}`;
  if (data) str += `-${data.toLowerCase()}`;
  if (!data && !id && !role) str += `-${uuidv4().slice(0, 4)}`;
  if (+str) str = `value-${str}`;
  return camelCase(str);
};

export const generateVariableName = (el: Element) => {
  if (el.tagName.toLowerCase() === 'html') return 'HTML';
  let str = el.tagName;
  const { id } = el;
  const { textContent } = el;
  if (id) str += ` ${id} `;
  if (textContent) str += ` ${textContent} `;
  if (!id && !textContent) str += uuidv4();
  if (+str) str = `value ${str}`;
  return camelCase(str);
};

export const valuesDelta = (value1: string, value2: string): string =>
  value2?.split(' ')?.filter((str) => !value1.split(' ').includes(str))?.join(' ') || '';

export const getResultText = (result: string) => {
  const data = result.toString().replace(/"jest.fn\(\)"/g, 'jest.fn()');
  return beautify.js(data, beautifyOptions);
};

export const printStep = (debug: () => void, step: string) => {
  console.log(`\n\n############################################## - ${step.toUpperCase()} - ##############################################\n\n`);
  debug();
};

export const printDebugFile = (test: ITest, wrapper?: any) => {
  const { containerNew, name, path } = test;
  const { innerHTML } = containerNew;
  if (!innerHTML) throw new Error('Something went wrong. The component did not render. Probably something is worng with the props or providers');
  const wrapperName = wrapper ? wrapper.name : '';
  const debugFileName = `${name}-${uuidv4().slice(0, 4)}${wrapperName ? `-${wrapperName}` : ''}.html`;
  const debugPath = `${path}/${debugFileName}`;
  const htmlString = beautify.html(innerHTML);
  fs.writeFileSync(debugPath, htmlString);
};

export const getFunctionElems = (container: Element) => Array.from(container.getElementsByTagName('*'))?.filter((node: any) =>
  node.onchange || node.onclick || node.onkeyup || node.onkeydown
  || node.onkeypress || node.onmouseover || node.onmouseout
  || node.onmouseenter || node.onmouseleave);

export const getPropsString = (props?: object | null): string => {
  if (!props || isEmpty(props)) return '';
  const propsStr = JSON.stringify(props, (k: any, v: any) => {
    if (typeof v === 'function') {
      return v.name === 'mockConstructor' ? 'jest.fn()' : v.name;
    }
    return v;
  });
  if (propsStr !== '{}') return '';
  return propsStr;
};

export const printTest = (templateParams: ITemplateParams, test: ITest) => {
  const template = Handlebars.compile(fullTestTemplate);
  const result = template(templateParams);
  const resultText = getResultText(result);
  const testPath = `${test.path}/${test.name}.test.tsx`;
  fs.writeFileSync(testPath, resultText);
};
