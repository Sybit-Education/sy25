import { createPinia } from 'pinia'

export const pinia = createPinia()

export function registerPinia(app: any): void {
  app.use(pinia)
}
