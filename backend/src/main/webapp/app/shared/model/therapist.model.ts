export interface ITherapist {
  id?: number;
  name?: string;
  expertise?: string;
  userId?: number;
}

export const defaultValue: Readonly<ITherapist> = {};
