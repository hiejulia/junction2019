import { Moment } from 'moment';

export interface IDiary {
  id?: number;
  content?: string;
  createdAt?: Moment;
  userId?: number;
  n?: string;
}

export const defaultValue: Readonly<IDiary> = {};
