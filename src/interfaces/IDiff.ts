export interface IDiffNodeAttribute {
  [key: string]: string
}

export interface IDiffNode {
  nodeName: string,
  data?: string,
  attributes?: IDiffNodeAttribute,
  childNodes: IDiffNode[],
  outerDone: boolean,
  subsets?: any[],
  subsetsAge?: number,
  innerDone?: boolean
}

export interface IDiff {
  action: string,
  route: number[],
  oldValue: string,
  newValue: string,
  node: IDiffNode
}
