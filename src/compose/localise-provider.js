import { reactive, readonly } from 'vue'

const state = reactive({
  locale: 'es',
  localeMessages: {
    en: {},
    es: {}
  }
})

function setLocaleMessages(localeMessages, locale) {
  state.localeMessages[locale] = localeMessages
  state.locale = locale
}

function $ft(key) {
  const deepValue = (obj, path) =>
    path
      .replace(/\[|\]\.?/g, '.')
      .split('.')
      .filter(s => s)
      .reduce((acc, val) => acc && acc[val], obj)
  return deepValue(this.state.localeMessages[this.state.locale], key)
}

export const localiseProvider = readonly({
  $ft,
  state,
  setLocaleMessages
})
