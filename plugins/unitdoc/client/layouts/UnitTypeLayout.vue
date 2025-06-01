<template>
  <Layout>
    <template #contentAfter>
      <div class="unit-grid">
        <UnitButton v-for="(id, i) in data" :unit="id" />
      </div>
    </template>
  </Layout>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import Layout from 'vuepress-theme-hope/layouts/base/Layout.js'
import { usePageFrontmatter } from 'vuepress/client'
import UnitButton from '../components/UnitButton.vue'

const frontmatter = usePageFrontmatter<{
  type: UnitDoc.Type
}>()

const data = computed(() => {
  if (!frontmatter.value.type) return []

  return Object.keys(
    __ESDNUnitDoc.source.Units[
      frontmatter.value.type as keyof typeof __ESDNUnitDoc.source.Units
    ] ??
      __ESDNUnitDoc.source[
        frontmatter.value.type as keyof typeof __ESDNUnitDoc.source
      ],
  )
})
</script>

<style lang="scss">
.unit-grid {
  display: flex;
  flex-wrap: wrap;
  align-items: end;
  gap: 0.25rem;
}
</style>
