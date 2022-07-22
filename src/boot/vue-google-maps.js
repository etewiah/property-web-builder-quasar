import { boot } from 'quasar/wrappers'
import VueGoogleMaps from '@fawmi/vue-google-maps'
import { currentConfigData } from 'src/compose/config-data'

export default boot(({ app }) => {
  const configData = currentConfigData()
  const gak = configData.GMAPS_API_KEY
  app.use(VueGoogleMaps, {
    load: {
      key: gak,
      libraries: 'places'
    },
  })
})
