export interface ReqResult<T = unknown> {
  statusCode: number;
  message: string;
  data: T;
  success: boolean;
}

/**
 * 分页通用接口定义
 */
export interface IPagination<T> {
  /** 是否第一页 */
  first: boolean;
  /** 当前页数量 */
  currentElements: number;
  /** 每页数量 */
  size: number;
  /** 总页数 */
  totalPages: number;
  /** 是否最后一页 */
  last: boolean;
  /** 数据 */
  content: T[];
  /** 当前第几页 */
  number: number;
  /** 当前页数量 */
  numberOfElements: number;
  /** 总数量 */
  totalElements: number;
}

/**
 * 获取列表参数
 */
export interface IGetListParams {
  /** 当前页 */
  page?: number;
  /** 页数量 */
  size?: number;
}
