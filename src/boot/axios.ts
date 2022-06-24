import { boot } from 'quasar/wrappers';
import axios, { AxiosInstance } from 'axios';
import { InjectionKey } from 'vue';

export const apiKey: InjectionKey<AxiosInstance> = Symbol('api-key');
export default boot(({ app }) => {
  const api = axios.create({ baseURL: '/' });

  app.provide(apiKey, api);
});
