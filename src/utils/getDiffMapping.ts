import { IDiffRaw } from 'rtl-test-generator/src/interfaces/IDiffRaw';
import { rtlCconstants } from 'rtl-test-generator/src/utils/constants';
import { DiffAddElement } from 'rtl-test-generator/src/models/Diff/DiffAddElement';
import { DiffModifyAttribute } from 'rtl-test-generator/src/models/Diff/DiffModifyAttribute';
import { DiffModifyText } from 'rtl-test-generator/src/models/Diff/DiffModifyText';
import { Diff } from 'rtl-test-generator/src/models/Diff/Diff';
import { DiffAddAttribute } from 'rtl-test-generator/src/models/Diff/DiffAddAttribute';
import { DiffRemoveAttribute } from 'rtl-test-generator/src/models/Diff/DiffRemoveAttribute';
import { DiffRemoveElement } from 'rtl-test-generator/src/models/Diff/DiffRemoveElement';
import { DiffReplaceElement } from 'rtl-test-generator/src/models/Diff/DiffReplaceElement';

// REMOVE_TEXT_ELEMENT: 'removeTextElement',
// ADD_TEXT_ELEMENT: 'addTextElement',
// REPLACE_ELEMENT: 'replaceElement',
// MODIFY_VALUE: 'modifyValue',
// MODIFY_CHECKED: 'modifyChecked',
// MODIFY_SELECTED: 'modifySelected',

export const getDiffMapping = (container: Element, diff: IDiffRaw): Diff | undefined => {
  switch (diff.action) {
    case rtlCconstants.ADD_ELEMENT:
      return new DiffAddElement(container, diff);
      break;
    case rtlCconstants.REMOVE_ELEMENT:
      return new DiffRemoveElement(container, diff);
      break;
    // case rtlCconstants.REPLACE_ELEMENT:
    //   return new DiffReplaceElement(container, diff);
    //   break;
    case rtlCconstants.MODIFIED_ATTRIBUTE_ACTION:
      return new DiffModifyAttribute(container, diff);
      break;
    case rtlCconstants.ADD_ATTRIBUTE_ACTION:
      return new DiffAddAttribute(container, diff);
      break;
    case rtlCconstants.REMOVE_ATTRIBUTE_ACTION:
      return new DiffRemoveAttribute(container, diff);
      break;
    case rtlCconstants.MODIFIED_TEXT_ACTION:
      return new DiffModifyText(container, diff);
      break;
    default:
      return undefined;
  }
};
