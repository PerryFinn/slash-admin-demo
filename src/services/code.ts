// 成功
export const success = 200;

// 未登录
export const unLogin = [40106, 40004, 40005];

// 访问权限不足
export const forbidden = 40300;

// 服务器端错误
export const serverError = 500;

// 未知错误
export const unknown = -1;

/**
 * 文档地址
 * https://edu-doc.test.seewo.com/documents/%E8%AF%BE%E4%BB%B6%E7%9B%B8%E5%85%B3/%E8%AF%BE%E4%BB%B6%E4%BA%91%E6%9C%8D%E5%8A%A1%E6%8E%A5%E5%8F%A3%E6%96%87%E6%A1%A3.html#%E9%94%99%E8%AF%AF%E7%A0%81
 *
 */

export const EN_CODE = {
  0: "ok",
  1010: "request api not found, 请求的地址错误",
  2004: "Illegal Argument, 请求参数错误",
  4000: "error, 在无法断定错误原因或是不需要向客户端暴露的服务端错误时使用",
  4001: "auth fail, 验证错误, 客户端需要调起登录, 获取新的有效token",
  4004: "third auth fail，第三方登录失败",
  4005: "third auth appName not found，第三方应用名未找到",
  4006: "third auth set cookie error，设置cookie错误",
  4007: "third auth http client not found，未找到该第三方应用对应的httpclient",
  4034: "获取redis锁失败",
  4101: "courseware not found,请求课件未找到(无版本号的无效课件返回)",
  4102: "need to resolve conflict, 需要处理冲突",
  4103: "already have latest version, 客户端已经是最新版本",
  4104: "client version is newer, 客户端文档要新于服务端, which means客户端要push 文档到服务端",
  4105: "client version not found, 客户端上报的版本未找到(带版本号的无效课件返回)",
  4109: "courseware group exist, 课件组已存在",
  4110: "over level limit,超过层数限制",
  4201: "nvalid file type, 无效的文件类型",
  4139: "用户没有操作该课件或者课件组的权限",
  4141: "暂不支持分享只读课件",
};

export const DWS_CODE = {
  40000: "输入参数不合法",
  40106: "当前用户未认证",
  40300: "当前用户未授权",
  40004: "无效token",
  40005: "token已过期",
  40010: "对象已存在",
  40011: "对象不存在",
  69999: "业务效验不通过",
  59999: "系统未知错误，请稍后再试",
  59998: "系统初始化异常",
};

export const HTTP_STATUS_CODE = {
  ...EN_CODE,
  ...DWS_CODE,
};
