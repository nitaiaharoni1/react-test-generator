export interface IDiffRawNodeAttribute {
  [key: string]: string
}

export interface IDiffRawNode {
  nodeName: string,
  data?: string,
  attributes?: IDiffRawNodeAttribute,
  childNodes: IDiffRawNode[],
  outerDone: boolean,
  subsets?: any[],
  subsetsAge?: number,
  innerDone?: boolean
}

export interface IDiffRaw {
  action: string,
  name?: string,
  value?: string,
  route: number[],
  oldValue: string,
  newValue: string,
  node?: IDiffRawNode
  element?: IDiffRawNode
}
