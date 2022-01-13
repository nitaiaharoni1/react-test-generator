import {
  MODIFIED_ATTRIBUTE_ACTION,
  TESTED_DIFF_ACTIONS,
  TESTED_DIFF_ATTRIBUTE_NAMES
} from '../utils/constants';
import { camelCase } from 'lodash';
import { IDiff } from '../interfaces/IDiff';
// @ts-ignore
import { v4 as uuidv4 } from 'uuid';

export const shouldIgnoreDiff = (diff: any) =>
  !diff
  || !TESTED_DIFF_ACTIONS.includes(diff.action)
  || (diff.action === MODIFIED_ATTRIBUTE_ACTION && !TESTED_DIFF_ATTRIBUTE_NAMES.includes(diff.name));

export const parseClassNameCleanCss = (className?: string) => className?.replace(/css-.*(\s)?/g, '')?.trim() || '';
export const parseClassNameWithDots = (className: string) => parseClassNameCleanCss(className)?.replace(/\s/g, '.')?.replace(/\.$/, '').trim();
export const parseElementsClassNameWithDots = (el: Element) => (el?.className ? `.${parseClassNameWithDots(el.className)}` : '');

export const generateDiffQuerySelector = (diff: IDiff) => {
  const { node: { nodeName, attributes } } = diff;
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

export const generateDiffVariableName = (diff: IDiff) => {
  const { node: { nodeName = '', data = '', attributes } } = diff;
  let str = '';
  const id = attributes?.id;
  if (nodeName) str += nodeName.toLowerCase();
  if (id) str += `-${id}`;
  if (data) str += `-${data.toLowerCase()}`;
  if (!data && !id) str += `-${uuidv4().slice(0, 4)}`;
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

export const getResultText = (result: string) => result.toString().trim().replace(/\n {2,}?\n/g, '\n\n').replace(/\n\n\n/g, '\n\n');
