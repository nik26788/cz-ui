// 组件相关的属性，和ts的类型
import { ExtractPropTypes, PropType } from "vue";

export const iconProps = {
  color: String,
  size: [Number, String] as PropType<number | string>,
} as const;

export type IconProps = ExtractPropTypes<typeof iconProps>;
