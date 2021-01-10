import { DataItem } from './data-item';

export interface DataModule {
  deviceUuid: string;
  deviceIdentifier: number;
  name: string;
  acquisitionInterval: number;
  dataItems: DataItem[];
}
