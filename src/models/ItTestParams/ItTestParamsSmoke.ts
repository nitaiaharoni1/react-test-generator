import { ItTestParams } from 'rtl-test-generator/src/models/ItTestParams/ItTestParams';
import { LeafNode } from 'rtl-test-generator/src/models/LeafNode/LeafNode';

export class ItTestParamsSmoke extends ItTestParams {
  constructor(checks: LeafNode[], name: string) {
    super(name);
    this.checks = checks;
  }
}
