<template>
  <Layout>
    <template #contentAfter>
      <ul>
        <li v-for="(item, i) in types" :key="i">
          <RouterLink :to="`${baseUrl}${item.replaceAll('Types', '')}/`">
            {{ i18n('TypeName', item) }}
          </RouterLink>
        </li>
      </ul>
    </template>
  </Layout>
</template>

<script lang="ts" setup>
import Layout from 'vuepress-theme-hope/layouts/base/Layout.js'
import i18n from '../../locale'

const baseUrl = __ESDNUnitDoc.options.baseUrl
const types = Object.keys(__ESDNUnitDoc.source.Types) as UnitDoc.Types[]
</script>
