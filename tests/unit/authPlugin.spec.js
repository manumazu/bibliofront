import Vue from 'vue';
import { createLocalVue } from '@vue/test-utils';
import AuthPlugin from '@/plugin';

describe('AuthPlugin plugin', () => {
  const localVue = createLocalVue();

  it('has install', () => {
    expect(typeof AuthPlugin.install).toBe('function');
  });

  it('adds a $auth method to the Vue prototype', () => {
    expect(Vue.prototype.$auth).toBeUndefined();
    localVue.use(AuthPlugin);
    expect(typeof localVue.prototype.$auth.login).toBe('function');
  });
});
