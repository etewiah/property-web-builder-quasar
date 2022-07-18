
const routes = [
  {
    path: '/',
    component: () => import('layouts/PublicLayout.vue'),
    children: [
      {
        path: '',
        name: 'rDefaultLocaleHomePage',
        component: () => import('pages/IndexPage.vue')
        // component: () => import('pages/PageContainer.vue')
      },
      {
        path: '/:publicLocale',
        name: 'rLocaleHome',
        component: () => import('pages/EmptyContainer.vue'),
        children: [
          // {
          //   path: '',
          //   name: 'rLocaleHomePage',
          //   component: () => import('pages/PageContainer.vue')
          // }
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
