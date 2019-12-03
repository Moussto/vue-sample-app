import Vue from 'vue'
import VueI18n from 'vue-i18n'

import fr from '@/i18n/fr.json'

Vue.use(VueI18n)

const messages = {
  fr
}

export default new VueI18n({
  locale: process.env.VUE_APP_I18N_LOCALE || 'fr',
  fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || 'fr',
  messages
})
