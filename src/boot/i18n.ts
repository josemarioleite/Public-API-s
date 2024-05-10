import { boot } from 'quasar/wrappers'
import { createI18n } from 'vue-i18n'
import { useAppStore } from 'src/stores/app.store'

import messages from 'src/i18n'

export type MessageLanguages = keyof typeof messages
export type MessageSchema = typeof messages['pt-BR']

/* eslint-disable @typescript-eslint/no-empty-interface */
declare module 'vue-i18n' {
  export interface DefineLocaleMessage extends MessageSchema {}
  export interface DefineDateTimeFormat {}
  export interface DefineNumberFormat {}
}

/* eslint-enable @typescript-eslint/no-empty-interface */
export default boot(({ app }) => {
  const appStore = useAppStore()

  const i18n = createI18n({
    locale: localStorage.getItem('local-language') || 'pt-BR',
    legacy: false,
    messages,
  })

  app.use(i18n)
})
