import VueImageZoomer from 'vue-image-zoomer'
import 'vue-image-zoomer/dist/style.css'

export function registerImagezoomer(app: any): void {
    app.use(VueImageZoomer)
  }