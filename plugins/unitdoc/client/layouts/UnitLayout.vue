<template>
  <Layout :key="frontmatter.unitId">
    <template #contentBefore>
      <div class="unitdoc-header">
        <UnitDetailHeader
          v-if="frontmatter.unitId"
          :unit="frontmatter.unitId"
          class="unit-detail theme-hope-content" />
      </div>
    </template>
    <template #contentAfter>
      <div class="unitdoc-footer">
        <UnitDetailFooter
          v-if="frontmatter.unitId"
          :unit="frontmatter.unitId"
          class="unit-detail theme-hope-content" />
      </div>
    </template>
  </Layout>
</template>

<script lang="ts" setup>
import Layout from 'vuepress-theme-hope/layouts/base/Layout.js'
import { usePageFrontmatter } from 'vuepress/client'
import UnitDetailFooter from '../components/UnitDetailFooter.vue'
import UnitDetailHeader from '../components/UnitDetailHeader.vue'

const frontmatter = usePageFrontmatter<{
  type: string
  unitId: UnitDoc.Id
}>()

// const init1 = () => {
//   const sidebar = useSidebarItems()
//   sidebar.value[0] = __ESDNUnitDocSidebar
// }
// onBeforeMount(init1)
// onBeforeUpdate(init1)
</script>

<style lang="scss">
.unitdoc-header,
.unitdoc-footer {
  .unit-detail {
    margin: 0 auto;

    table {
      width: fit-content;
    }
  }
}
</style>
