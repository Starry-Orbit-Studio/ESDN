import { defineClientConfig } from 'vuepress/client'

import UnitButton from './components/PublicUnitButton.vue'
import UnitHomePageLayout from './layouts/UnitHomePageLayout.vue'
import UnitLayout from './layouts/UnitLayout.vue'
import UnitTypeLayout from './layouts/UnitTypeLayout.vue'

export default defineClientConfig({
  enhance({ app, router, siteData }) {
    app.component('UnitButton', UnitButton)
    // app.component('UnitTypeCategory', UnitTypeCategory)
  },
  setup() {},
  layouts: { UnitHomePageLayout, UnitTypeLayout, UnitLayout },
  rootComponents: [],
})
