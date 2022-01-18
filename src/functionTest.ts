import { generateVariableName, getFunctionElems, printStep } from 'rtl-test-generator/src/utils/helpers';
import { range } from 'lodash';
import { ItTestParams } from 'rtl-test-generator/src/models/ItTestParams/ItTestParams';
import { ItTestParamsFunctions } from 'rtl-test-generator/src/models/ItTestParams/ItTestParamsFunctions';
import { Diff } from 'rtl-test-generator/src/models/Diff/Diff';
import { fireEvent, render } from 'setupTests';
import { Diffs } from 'rtl-test-generator/src/models/Diffs/Diffs';
import { ITest } from 'rtl-test-generator/src/interfaces/ITest';
import { cleanup } from '@testing-library/react';
import { dd } from 'rtl-test-generator/src/initDomDiff';

let test: ITest;
let functionNodeName: string;
let functionNodeIndex: number;

export const getFunctionTestsParams = (initTest: ITest): ItTestParams[] => {
  test = initTest;
  const functionsNodesNum = getFunctionElems(test.containerNew)?.length || 0;
  return range(functionsNodesNum).map((_, index: number) => getIItTestParams(index));
};

const getIItTestParams = (index: number): ItTestParams => {
  const functionNode = getFunctionElems(test.containerNew)[index];
  functionNodeName = generateVariableName(functionNode);
  functionNodeIndex = index;
  const diffs = fireEventAndGetDiffs(functionNode);
  const itTestName = `#${index}`;
  return new ItTestParamsFunctions(test.containerNew, diffs, itTestName, functionNode);
};

const fireEventAndGetDiffs = (funcNode: Element): Diff[] => {
  const { component, options, debug } = test;
  printStep(debug, `before fire event - ${functionNodeName}#${functionNodeIndex}`);
  fireEvent.click(funcNode);
  printStep(debug, `after fire event - ${functionNodeName}#${functionNodeIndex}`);
  test.containerOld = test.containerNew.cloneNode(true) as Element;
  cleanup();
  const { container } = render(component, options);
  test.containerNew = container;
  const rawDiffs = dd.diff(test.containerNew, test.containerOld);
  return (new Diffs(test.containerNew, rawDiffs)).checks;
};

