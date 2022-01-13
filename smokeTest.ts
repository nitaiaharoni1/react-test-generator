import { smokeTestContentTemplate } from 'rtl-test-generator/templates';
import { ITest } from 'rtl-test-generator/interfaces/TestParams';
import Handlebars from 'handlebars';
import { generateVariableName } from 'rtl-test-generator/utils/helpers';

const getLeafNodes = (container: Element) =>
  Array.from(container.getElementsByTagName('*'))?.filter((node: Element) => node?.children?.length === 0 && node?.textContent?.trim() !== '');

const getLeafTestParams = (leaf: Element) => {
  const selector = leaf.textContent;
  const variable = generateVariableName(leaf);
  return {
    variable,
    selector,
  };
};

export const generateSmokeTest = (test: ITest) => {
  const { container } = test;

  const leafTextNodes = getLeafNodes(container);
  const leafNodesParams = leafTextNodes.map((leaf) => getLeafTestParams(leaf));
  const leafNodesParamsParsed: any[] = [];
  leafNodesParams.forEach((param: any) => {
    const foundInParsedParams = leafNodesParamsParsed.find((parsedParam: any) => parsedParam.selector === param.selector);
    if (foundInParsedParams) {
      foundInParsedParams.count = foundInParsedParams.count ? foundInParsedParams.count + 1 : 2;
    } else {
      leafNodesParamsParsed.push(param);
    }
  });
  const smokeTestTemplate = Handlebars.compile(smokeTestContentTemplate);
  const smokeTestContent = smokeTestTemplate({ nodes: leafNodesParamsParsed });
  return {
    name: 'Smoke Test',
    content: smokeTestContent,
  };
};
