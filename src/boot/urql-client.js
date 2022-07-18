import { boot } from 'quasar/wrappers'
// import VueGoogleMaps from '@fawmi/vue-google-maps'
// import { currentConfigData } from 'src/utils/config-data'
import urql from '@urql/vue'

export default boot(({ app }) => {
  // const configData = currentConfigData()
  // const gak = configData.GMAPS_API_KEY
  app.use(urql, {
    url: '/graphql'
  })
})
