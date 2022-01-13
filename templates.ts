const renderComponentTemplate = 'const { container } = renderComponent();';
const querySelectorTemplate = "const {{this.variable}} = container.querySelector('{{this.selector}}');";
const querySelectorFireEventTemplate = "const {{this.functionElemVariable}} = container.querySelector('{{this.functionElemSelector}}') || new Element();";
const fireEventClickTemplate = 'fireEvent.click({{this.functionElemVariable}});';
const getByAttributeTemplate = "const {{this.variable}} = screen.getBy{{attribute}}('{{this.selector}}');";
const getByTextTemplate = "const {{this.variable}} = screen.getByText('{{this.selector}}');";
const getAllByTextTemplate = "const {{this.variable}} = screen.getAllByText('{{this.selector}}');";
const toBeInTheDocumentTemplate = 'expect({{this.variable}}).toBeInTheDocument();';
const toHaveLengthTemplate = 'expect({{this.variable}}).toHaveLength({{count}});';
const toHaveTextContentTemplate = 'expect({{this.variable}}).toHaveTextContent({{this.selector}});';
const toHaveAttributeTemplate = "expect({{this.variable}}).toHaveAttribute('{{this.name}}', '{{this.value}}');";
const toHaveClassExactFalseTemplate = "expect({{this.variable}}){{this.isNegative}}.toHaveClass('{{this.value}}', { exact: false });";

const typeofComponentTemplate = '<typeof Component>';
const componentPropsTemplate = 'ComponentProps<typeof {{this.componentName}}>';
const componentsWithPropsTemplate = '<{{this.componentName}}{{#if this.props}} {...props}{{/if}}/>';

const testItTemplate = `
  test('Should {{this.name}}', () => {
    ${renderComponentTemplate}
    {{#if this.functionElemVariable}}
    ${querySelectorFireEventTemplate}
    ${fireEventClickTemplate}
    {{/if}}
    {{{this.content}}}
  });`;

export const describeTemplate = `
describe('{{this.componentName}} - Props: #{{propIndex}}{{#if this.wrapperName}} - Wrapper: {{this.wrapperName}}{{/if}}', () => {
  {{#if this.props}}const props: ${componentPropsTemplate} = {{{this.props}}};{{/if}}
  const renderComponent = () => render(${componentsWithPropsTemplate}{{#if this.wrapperName}}, { wrapper: {{this.wrapperName}} }{{/if}});

  {{#tests}}
      ${testItTemplate}
  {{/tests}}
});`;

export const fullTestTemplate = `
import { ComponentProps } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

{{#describes}}
${describeTemplate}
{{/describes}}
`;

export const smokeTestContentTemplate = `
{{#nodes}}

    {{#if this.count}}
    ${getAllByTextTemplate}
    ${toHaveLengthTemplate}
    {{else}}
    ${getByTextTemplate}
    ${toBeInTheDocumentTemplate}
    {{/if}}

{{/nodes}}`;

export const functionTestContentTemplate = `
{{#diffs}}
    {{#if this.byText}}
    {{#if this.count}}
    ${getAllByTextTemplate}
    ${toHaveLengthTemplate}
    {{else}}
    ${getByTextTemplate}
    ${toBeInTheDocumentTemplate}
    {{/if}}
    {{else}}
    ${querySelectorTemplate}
    {{#attributes}}
    {{#if this.isClass}}
    ${toHaveClassExactFalseTemplate}
    {{else}}
    ${toHaveAttributeTemplate}
    {{/if}}
    {{/attributes}}
    {{/if}}
    
{{/diffs}}
`;
