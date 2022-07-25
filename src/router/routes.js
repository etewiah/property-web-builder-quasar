
const routes = [
  {
    path: '/',
    component: () => import('layouts/PublicLayout.vue'),
    children: [
      {
        path: '',
        name: 'rDefaultLocaleHomePage',
        component: () => import('pages/PageContainer.vue')
      },
      {
        path: '/:publicLocale',
        name: 'rLocaleHome',
        component: () => import('pages/EmptyContainer.vue'),
        // component: () => import("pages/EmptyContainer.vue"),
        children: [
          {
            path: '',
            name: 'rLocaleHomePage',
            component: () => import('pages/PageContainer.vue')
          },
          {
            path: 'p/:pageSlug',
            name: 'rPublicPage',
            component: () => import('pages/PageContainer.vue')
          },
          {
            path: 'contact-us',
            name: 'rContactUs',
            component: () => import('pages/SearchView.vue')
          },
          {
            path: 'for-sale',
            name: 'rForSaleSearch',
            component: () => import('pages/SearchView.vue')
          },
          {
            path: 'for-sale/:listingSlug',
            name: 'rForSaleListing',
            component: () => import('pages/ListingView.vue')
          },
          {
            path: 'for-rent',
            name: 'rForRentSearch',
            component: () => import('pages/SearchView.vue')
          },
          {
            path: 'for-rent/:listingSlug',
            name: 'rForRentListing',
            component: () => import('pages/ListingView.vue')
          }
        ]

      }]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
