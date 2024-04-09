import PrimeVueUnstyled from 'primevue/config'
//import Lara from '@/presets/lara' //import preset

export function registerPrimeVue(app: any): void {
  app.use(PrimeVueUnstyled, {
    unstyled: false
    //pt: Lara //apply preset
  })
}
