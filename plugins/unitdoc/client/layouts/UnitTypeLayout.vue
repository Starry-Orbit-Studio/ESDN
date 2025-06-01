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
import i18n from '../../locale'
import UnitButton from '../components/UnitButton.vue'

const frontmatter = usePageFrontmatter<{
  type: Exclude<Parameters<typeof i18n>[1], undefined>
}>()

const data = computed(() => {
  const data = {
    InfantryTypes: () => Object.keys(__ESDNUnitDoc.source.Units.InfantryTypes),
    VehicleTypes: () => Object.keys(__ESDNUnitDoc.source.Units.VehicleTypes),
    AircraftTypes: () => Object.keys(__ESDNUnitDoc.source.Units.AircraftTypes),
    BuildingTypes: () => Object.keys(__ESDNUnitDoc.source.Units.BuildingTypes),
    SuperWeaponTypes: () =>
      Object.keys(__ESDNUnitDoc.source.Units.SuperWeaponTypes),
    WeaponTypes: () => Object.keys(__ESDNUnitDoc.source.Weapons),
    WarheadTypes: () => Object.keys(__ESDNUnitDoc.source.Warheads),
    // GenericPrerequisitesTypes:()=> __ESDNUnitDoc.source.GenericPrerequisitesTypes
  }

  const result = data[frontmatter.value.type as keyof typeof data]
  return result()
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
