/* eslint-disable @typescript-eslint/quotes, max-len */

const componentPropsTemplate = 'ComponentProps<typeof {{this.component}}>';

const expect = `expect({{this.variable}}){{#if this.isNegative}}.not{{/if}}.{{this.toHave}}({{#if this.name}}'{{this.name}}', {{/if}}{{#if this.value}}'{{this.value}}', {{/if}}{{#if this.notExact}}{ exact: false }{{/if}})`;
const selector = `{{#selector}}const {{this.variable}} = {{#if this.isScreen}}screen.get{{#ifCond this.count '>' 1 }}All{{/ifCond}}ByText{{else}}container.querySelector{{/if}}(\`{{this.selector}}\`){{/selector}}`;
const fire = `{{#fire}}fireEvent.{{this.event}}({{this.variable}}){{/fire}}`;

export const fullTestTemplate = `
{{#if this.props}}import { ComponentProps } from 'react'{{/if}}
import { fireEvent, render, screen } from '@testing-library/react'

{{#describes}}
    describe('{{@root.component}} - Props: #{{@index}}{{#if this.wrapper}} - Wrapper: {{this.wrapper}}{{/if}}', () => {
        {{#if this.props}}const props: ${componentPropsTemplate} = {{{this.props}}}{{/if}}
        const renderComponent = () => render(<{{@root.component}}{{#if this.props}} {...props}{{/if}}/>{{#if this.wrapper}}, { wrapper: {{this.wrapper}} }{{/if}})
        
        {{#tests}}
            test('Should {{this.name}}', () => {
                const { container } = renderComponent()
                
                {{#funcNode}}
                  ${selector} || new Element()
                  ${fire}
                {{/funcNode}}
                {{#checks}}
                  ${selector}
                  {{#expects}}
                    ${expect}
                  {{/expects}}
                {{/checks}}
            })
        {{/tests}}
    })
{{/describes}}
`;
