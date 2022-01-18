import { generate } from 'rtl-test-generator/src';
import { Test } from 'components/Test/Test';

test('generate', () => {
  generate(Test, { props: { title: 'asdasdasd' } });
});
