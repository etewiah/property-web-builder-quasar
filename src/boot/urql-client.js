import { boot } from 'quasar/wrappers'
import { currentConfigData } from 'src/compose/config-data'
import urql from '@urql/vue'

export default boot(({ app }) => {
  const configData = currentConfigData()
  const urqlClientUrl = configData.urqlClientUrl
  app.use(urql, {
    url: urqlClientUrl // 'http://localhost:3000/graphql'
  })
})
