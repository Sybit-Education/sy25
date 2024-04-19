import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { createPinia } from 'pinia'

export const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

export function registerPinia(app: any): void {
  app.use(pinia)
}
