/**
 * An object used to get page information from the server
 */
export class Page {
  // The number of elements in the page
  public pageSize: number = 10;
  // The current page number
  public page: number = 1;
  public textSearch?: string;
  public isAsc?: boolean;
}

export interface IPageInfo {
  count: number;
  pageSize: number;
  limit: number;
  offset: number;
}

interface ISortInfo {
  dir: string;
  prop: string;
}

export interface ISortData {
  sorts: ISortInfo[];
}
