import { Plugin } from "vue";

export type SFCWithInstall<T> = T & Plugin;

export function withInstall<T>(comp: T) {
  (comp as SFCWithInstall<T>).install = function (app) {
    const { name } = comp as unknown as { name: string };
    app.component(name, comp);
  };
  return comp;
}
