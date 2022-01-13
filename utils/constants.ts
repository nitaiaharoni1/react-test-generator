export const MODIFIED_ATTRIBUTE_ACTION = 'modifyAttribute';
export const ADD_ATTRIBUTE_ACTION = 'addAttribute';
export const REMOVE_ATTRIBUTE_ACTION = 'removeAttribute';
export const MODIFIED_TEXT_ACTION = 'modifyTextElement';
export const ADD_ELEMENT = 'addElement';
export const ADD_TEXT_ELEMENT = 'addTextElement';
export const REPLACE_ELEMENT = 'replaceElement';

export const CLASS_ATTRIBUTE = 'class';
export const STYLE_ATTRIBUTE = 'style';

export const TESTED_DIFF_ACTIONS = [ADD_TEXT_ELEMENT, MODIFIED_ATTRIBUTE_ACTION, ADD_ATTRIBUTE_ACTION, REMOVE_ATTRIBUTE_ACTION, MODIFIED_TEXT_ACTION];
export const TESTED_DIFF_ATTRIBUTE_NAMES = [CLASS_ATTRIBUTE, STYLE_ATTRIBUTE];
