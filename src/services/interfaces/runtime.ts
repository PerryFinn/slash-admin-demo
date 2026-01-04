interface IThirdPartyPage {
  [key: string]: any;
}

/**
 * 运行时配置
 */
interface IRuntimeConfig {
  /** 边缘服务器信息 */
  edgeServer: {
    /** 边缘域名 */
    domain: string;
  };
  /** 第三方页面 */
  thirdPartyPage: IThirdPartyPage;
}

export type { IRuntimeConfig };
