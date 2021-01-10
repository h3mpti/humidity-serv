import { DataItemValue } from './data-item-value'

export interface DataItem {
  identifier: string
  name: string
  uom: string
  values?: DataItemValue[]
}
