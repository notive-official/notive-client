type PageMeta = {
  page: number; // 0‑based
  size: number;
  totalPages: number;
  totalElements: number;
  hasNext: boolean;
  hasPrev: boolean;
};

type SliceMeta = {
  page: number; // 0‑based
  size: number;
  hasNext: boolean;
  hasPrev: boolean;
};

export type PageRes<T> = {
  content: Array<T>;
  meta: PageMeta;
};

export type ListRes<T> = {
  content: Array<T>;
};

export type SliceRes<T> = {
  content: Array<T>;
  meta: SliceMeta;
};
