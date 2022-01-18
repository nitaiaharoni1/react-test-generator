/* eslint-disable no-param-reassign */

// @ts-ignore
import { DiffDOM } from 'diff-dom';

const dd = new DiffDOM({
  postVirtualDiffApply: (object: any) => {
    object.diff.node = object.node;
  },
});

export { dd };
