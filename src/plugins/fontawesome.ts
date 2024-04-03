import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'

export function registerFontawesome(app) {
  app.component('font-awesome-icon', FontAwesomeIcon) // Register component globally

  library.add(fas) // Include needed solid icons
  library.add(far) // Include needed regular icons
}
