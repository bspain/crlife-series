/* eslint @typescript-eslint/no-explicit-any: 0 */
declare function appfig(configFilePath: any, options?: any, afterConfigLoaded?: any): any;

declare module 'appfig' {
  export = appfig;
}
