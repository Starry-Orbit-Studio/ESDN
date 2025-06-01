<template>
  <Layout>
    <template #contentAfter>
      <ul>
        <li v-for="(item, id) in data">
          <RouterLink v-if="isUnit(item)" :to="`${baseUrl}/${type}/${id}`">
            {{ csf(item.UIName) ?? item.UIName ?? id }}
          </RouterLink>
          <RouterLink v-else :to="`${baseUrl}/${type}/${id}`">
            {{ id }}
          </RouterLink>
        </li>
      </ul>
    </template>
  </Layout>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import Layout from 'vuepress-theme-hope/layouts/base/Layout.js'
import { usePageFrontmatter } from 'vuepress/client'
import i18n from '../../locale'

const baseUrl = __ESDNUnitDoc.options.baseUrl

const frontmatter = usePageFrontmatter<{
  type: Exclude<Parameters<typeof i18n>[1], undefined>
}>()

const type = frontmatter.value.type?.replace('Types', '')

const isUnit = (obj: any): obj is UnitDoc.Unit =>
  ['Infantry', 'Vehicle', 'Aircraft', 'Building', 'SuperWeapon'].includes(
    type ?? '',
  )

const csf = (key?: UnitDoc.CsfLabel) => key && __ESDNUnitDoc.source.Csf[key]

const data = computed(() => {
  const data = {
    InfantryTypes: () => __ESDNUnitDoc.source.Units.InfantryTypes,
    VehicleTypes: () => __ESDNUnitDoc.source.Units.VehicleTypes,
    AircraftTypes: () => __ESDNUnitDoc.source.Units.AircraftTypes,
    BuildingTypes: () => __ESDNUnitDoc.source.Units.BuildingTypes,
    SuperWeaponTypes: () => __ESDNUnitDoc.source.Units.SuperWeaponTypes,
    WeaponTypes: () => __ESDNUnitDoc.source.Weapons,
    WarheadTypes: () => __ESDNUnitDoc.source.Warheads,
    // GenericPrerequisitesTypes:()=> __ESDNUnitDoc.source.GenericPrerequisitesTypes
  }

  const result = data[frontmatter.value.type as keyof typeof data]
  return result()
})
</script>
