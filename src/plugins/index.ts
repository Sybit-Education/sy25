// Plugins
import { registerPinia } from './pinia'
import { registerFontawesome } from './fontawesome'
import { registerPrimeVue } from './primevue'

// Types
import type { App } from 'vue'

export function registerPlugins(app: App): void {
  registerFontawesome(app)
  registerPinia(app)
  registerPrimeVue(app)
}
