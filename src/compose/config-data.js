function currentConfigData() {
  // const qDest = process.env.QDEST || ''
  const configData = {
    urqlClientUrl: '/graphql',
    GMAPS_API_KEY: process.env.GMAPS_API_KEY,
    GOOGLE_TAG_ID: process.env.GOOGLE_TAG_ID,
  }
  return configData
}

export { currentConfigData }
