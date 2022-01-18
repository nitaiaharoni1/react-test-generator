import { IDiffRaw } from 'rtl-test-generator/src/interfaces/IDiffRaw';
import { Diff } from 'rtl-test-generator/src/models/Diff/Diff';
import { getDiffMapping } from 'rtl-test-generator/src/utils/getDiffMapping';

export class Diffs {
  checks: Diff[];
  container: Element;

  constructor(container: Element, rawDiffs: IDiffRaw[]) {
    this.container = container;
    this.checks = this.getChecks(container, rawDiffs);
  }

  getChecks(container: Element, rawDiffs: IDiffRaw[]): Diff[] {
    const checks = this.getChecksParams(container, rawDiffs);
    return this.getParsedChecks(checks);
  }

  getChecksParams(container: Element, rawDiffs: IDiffRaw[]): Diff[] {
    // @ts-ignore
    return rawDiffs.map((rawDiff: IDiffRaw) => getDiffMapping(this.container, rawDiff)).filter(Boolean);
  }

  getParsedChecks(checks: Diff[]): Diff[] {
    return checks;
  }
}
