import { defineClientConfig } from 'vuepress/client'

import UnitHomePageLayout from './layouts/UnitHomePageLayout.vue'
import UnitTypeLayout from './layouts/UnitTypeLayout.vue'

export default defineClientConfig({
  enhance({ app, router, siteData }) {
    // app.component('UnitButton', UnitButton)
    // app.component('UnitTypeCategory', UnitTypeCategory)
  },
  setup() {},
  layouts: { UnitHomePageLayout, UnitTypeLayout },
  rootComponents: [],
})
