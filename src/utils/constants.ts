export const rtlCconstants = {
  MODIFIED_ATTRIBUTE_ACTION: 'modifyAttribute',
  ADD_ATTRIBUTE_ACTION: 'addAttribute',
  REMOVE_ATTRIBUTE_ACTION: 'removeAttribute',
  MODIFIED_TEXT_ACTION: 'modifyTextElement',
  ADD_ELEMENT: 'addElement',
  REMOVE_ELEMENT: 'removeElement',
  REMOVE_TEXT_ELEMENT: 'removeTextElement',
  ADD_TEXT_ELEMENT: 'addTextElement',
  REPLACE_ELEMENT: 'replaceElement',
  MODIFY_VALUE: 'modifyValue',
  MODIFY_CHECKED: 'modifyChecked',
  MODIFY_SELECTED: 'modifySelected',

  CLASS_ATTRIBUTE: 'class',
  STYLE_ATTRIBUTE: 'style',

  TO_BE_IN_THE_DOCUMENT: 'toBeInTheDocument',
  TO_HAVE_LENGTH: 'toHaveLength',
  TO_HAVE_ATTRIBUTE: 'toHaveAttribute',
  TO_HAVE_BEEN_CALLED_TIMES: 'toHaveBeenCalledTimes',
  TO_HAVE_TEST_CONTENT: 'toHaveTextContent',

};

export const TESTED_DIFF_ACTIONS = [
  rtlCconstants.REPLACE_ELEMENT,
  rtlCconstants.ADD_ELEMENT,
  rtlCconstants.ADD_TEXT_ELEMENT,
  rtlCconstants.MODIFIED_ATTRIBUTE_ACTION,
  rtlCconstants.ADD_ATTRIBUTE_ACTION,
  rtlCconstants.REMOVE_ATTRIBUTE_ACTION,
  rtlCconstants.MODIFIED_TEXT_ACTION,
];

export const TESTED_DIFF_ATTRIBUTE_NAMES = [
  rtlCconstants.CLASS_ATTRIBUTE,
  rtlCconstants.STYLE_ATTRIBUTE,
];
