export type Prettify<T> = { [K in keyof T]: T[K] } & {};

export type ObjectType = Record<string, unknown>;

export type NextQuery = {
  [key: string]: string;
};
