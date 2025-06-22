import { withInstall } from '@czui/utils/with-install';
import _Icon from './src/icon.vue';

const Icon = withInstall(_Icon);

export default Icon;

export * from './src/icon';

// The types defined here can be parsed in the vue template
declare module 'vue' {
  export interface GlobalComponents {
    CzIcon: typeof Icon;
  }
}

