import { LeafNode } from 'rtl-test-generator/src/models/LeafNode/LeafNode';
import { ItTestParamsSmoke } from 'rtl-test-generator/src/models/ItTestParams/ItTestParamsSmoke';
import { ITest } from 'rtl-test-generator/src/interfaces/ITest';
import { printStep } from 'rtl-test-generator/src/utils/helpers';

const getLeafNodes = (container: Element) =>
  Array.from(container.getElementsByTagName('*'))?.filter((node: Element) => node?.children?.length === 0 && node?.textContent?.trim() !== '');

export const getSmokeTestParams = (test: ITest): ItTestParamsSmoke => {
  const { containerNew, debug } = test;
  printStep(debug, 'smoke test');
  const leafTextNodes = getLeafNodes(containerNew);
  const checks = leafTextNodes.map((leafNode) => new LeafNode(containerNew, leafNode));
  if (!checks.length) throw new Error('Nothing was rendered. No DOM leaf nodes found.');
  return new ItTestParamsSmoke(checks, 'Smoke Test');
};
