<template>
 <router-view :key="$route" />
</template>
<script>
import { defineComponent, ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useQuery } from '@urql/vue'
import { localiseProvider } from 'src/compose/localise-provider.js'
import { sitedetailsProvider } from 'src/compose/sitedetails-provider.js'
export default defineComponent({
  name: 'VPublicApp',
  provide: {
    localiseProvider,
    sitedetailsProvider
  },
  watch: {
    '$route.params': {
      handler (newValue, oldVal) {
        this.publicLocale = newValue.publicLocale
      }
    },
    gqlError: {
      handler (newError) {
        this.$q.notify({
          color: 'negative',
          position: 'top',
          message: newError.message,
          icon: 'report_problem'
        })
      }
    },
    gqlData: {
      handler (newValue, oldVal) {
        this.localiseProvider.setLocaleMessages(
          newValue.getTranslations.result,
          newValue.getTranslations.locale
        )
        const topNavDisplayLinks =
          newValue.getSiteDetails.topNavDisplayLinks || []
        this.sitedetailsProvider.setTopNavItems(
          this.publicLocale,
          topNavDisplayLinks
        )
        const footerDisplayLinks =
          newValue.getSiteDetails.footerDisplayLinks || []
        this.sitedetailsProvider.setFooterNavItems(
          this.publicLocale,
          footerDisplayLinks
        )
        this.sitedetailsProvider.setAgency(
          newValue.getSiteDetails.agency,
          newValue.getSiteDetails.supportedLocales
        )
      }
    }
  },
  mounted () {},
  setup () {
    const route = useRoute()
    const publicLocale = ref(route.params.publicLocale || 'en')
    const result = useQuery({
      pause: computed(() => !publicLocale.value),
      variables: {
        publicLocale
      },
      query: `
        query ($publicLocale: String! ) {
            getSiteDetails(locale: $publicLocale) {
                supportedLocales,
                styleVariables,
                supportedLocalesWithVariants,
                agency {
                  emailPrimary,
                  displayName,
                  phoneNumberPrimary
                }
                footerDisplayLinks {
                  sortOrder,
                  slug,
                  linkUrl,
                  linkPath,
                  linkTitle,
                  linkPathParams,
                }
                topNavDisplayLinks {
                  sortOrder,
                  slug,
                  linkUrl,
                  linkPath,
                  linkTitle,
                  linkPathParams,
                }
            }
            getTranslations(locale: $publicLocale) {
              locale,
              result
            }
        }
      `
    })
    return {
      publicLocale,
      localiseProvider,
      sitedetailsProvider,
      gqlFetching: result.fetching,
      gqlData: result.data,
      gqlError: result.error
    }
  }
})
</script>
