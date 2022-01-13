/* eslint-disable no-param-reassign, max-len */
import {
  generateDiffQuerySelector,
  generateDiffVariableName,
  generateQuerySelector,
  generateVariableName,
  parseClassNameCleanCss,
  shouldIgnoreDiff,
  valuesDelta
} from './utils/helpers';
import { functionTestContentTemplate } from './templates';
import { MODIFIED_TEXT_ACTION } from './utils/constants';
import { ITest } from './interfaces/TestParams';
import Handlebars from 'handlebars';
import { cleanup, fireEvent, render } from '@testing-library/react';
// @ts-ignore
import { DiffDOM } from 'diff-dom';
import { IDiff } from './interfaces/IDiff';

const dd = new DiffDOM({
  postVirtualDiffApply: (object: any) => {
    object.diff.node = object.node;
  },
});

let test: ITest;

export const generateFunctionTests = (initTest: ITest) => {
  test = initTest;
  return getFunctionElems()?.map((funcNode: any, index: number) => generateFunctionTest(index)).filter(Boolean);
};

const generateFunctionTest = (index: number) => {
  const funcNode = getFunctionElems()[index];

  const functionElemVariable = generateVariableName(funcNode);
  const functionElemSelector = generateQuerySelector(funcNode);

  const diffs = fireEventAndGetDiffs(funcNode);

  const itTest = getFunctionElemItTest(funcNode, diffs);
  let itTestEnriched: object | undefined;
  if (itTest) {
    itTestEnriched = {
      ...itTest,
      functionElemVariable,
      functionElemSelector,
    };
  }
  restartContainer();
  return itTestEnriched;
};

const getFunctionElems = () => Array.from(test.container.getElementsByTagName('*'))?.filter((node: any) =>
  node.onchange || node.onclick || node.onkeyup || node.onkeydown
  || node.onkeypress || node.onmouseover || node.onmouseout
  || node.onmouseenter || node.onmouseleave);

const getFunctionElemItTest = (funcNode: Element, diffs: any) => {
  const nodeName = generateVariableName(funcNode);
  const functionElemDiffParams = getFunctionElemDiffParams(funcNode, diffs);
  if (!functionElemDiffParams.length) return undefined;
  const functionTestTemplate = Handlebars.compile(functionTestContentTemplate);
  const functionTestContent = functionTestTemplate({ diffs: functionElemDiffParams });
  return {
    name: `${'Click'} ${nodeName}`,
    content: functionTestContent,
  };
};

const getFunctionElemDiffParams = (funcNode: Element, diffs: any[]) => {
  const diffsParams = diffs.map((diff: any) => getFunctionsTestParams(funcNode, diff)).filter(Boolean);
  const diffParamsParsed: any = [];
  diffsParams.forEach((diffParam: any) => {
    if (diffParam.byText) {
      const elementsWithSameText = Array.from(test.container.querySelectorAll('*')).filter((el) => el.textContent === diffParam.selector)?.length;
      if (elementsWithSameText > 1) {
        diffParam.count = elementsWithSameText;
      }
      diffParamsParsed?.push(diffParam);
    } else {
      const foundSelectorParamsParsed = diffParamsParsed.find((diffParsed: any) =>
        diffParsed.selector && diffParam?.selector && diffParsed.selector === diffParam?.selector);
      const isSameAttribute = foundSelectorParamsParsed?.attributes?.[0].name === diffParam?.attributes?.[0]?.name;
      if (foundSelectorParamsParsed && !isSameAttribute) {
        diffParam.attributes[0].variable = foundSelectorParamsParsed.variable;
        foundSelectorParamsParsed.attributes?.push(diffParam?.attributes?.[0]);
      } else {
        diffParamsParsed?.push(diffParam);
      }
    }
  });

  return diffParamsParsed;
};

const findDiffDelte = (diff: IDiff): { delta?: string, isNegative?: boolean } => {
  const { newValue, oldValue } = diff;
  const nValue = parseClassNameCleanCss(newValue);
  const oValue = parseClassNameCleanCss(oldValue);
  if (nValue === oValue) return {};
  const positiveDelta = valuesDelta(oldValue, newValue);
  if (positiveDelta) {
    return {
      isNegative: false,
      delta: positiveDelta,
    };
  }
  const negativeDelta = valuesDelta(newValue, oldValue);
  return {
    isNegative: true,
    delta: negativeDelta,
  };
};

const getFunctionsTestParams = (funcNode: Element, diff: any) => {
  if (shouldIgnoreDiff(diff)) return undefined;
  const { name, newValue, action } = diff;
  const byText = [MODIFIED_TEXT_ACTION].includes(action);
  let params = {};
  const variable = generateDiffVariableName(diff);
  if (!byText) {
    let classParams = {};
    if (name === 'class') {
      const diffDelta = findDiffDelte(diff);
      if (!diffDelta.delta) return undefined;
      classParams = {
        isClass: true,
        isNegative: diffDelta.isNegative ? '.not' : '',
        value: diffDelta.delta,
      };
    }
    const selector = generateDiffQuerySelector(diff);
    if (!newValue) return undefined;
    params = {
      selector,
      attributes: [
        {
          name,
          value: newValue,
          variable,
          ...classParams,
        },
      ],
    };
  }
  return {
    selector: newValue,
    variable,
    byText,
    ...params,
  };
};

const restartContainer = () => {
  const { component, options } = test;
  cleanup();
  const { container: newContainer } = render(component, options);
  test.container = newContainer;
};

const fireEventAndGetDiffs = (funcNode: Element): any => {
  const { component, options, container } = test;
  const { container: newContainer } = render(component, options);
  fireEvent.click(funcNode);
  return dd.diff(newContainer, container);
};
