<template>
  <Layout>
    <template #contentAfter>
      <ul>
        <li>
          <RouterLink :to="`${baseUrl}Infantry/`">
            {{ i18n('TypeName', 'InfantryTypes') }}
          </RouterLink>
        </li>
        <li>
          <RouterLink :to="`${baseUrl}Vehicle/`">
            {{ i18n('TypeName', 'VehicleTypes') }}
          </RouterLink>
        </li>
        <li>
          <RouterLink :to="`${baseUrl}Aircraft/`">
            {{ i18n('TypeName', 'AircraftTypes') }}
          </RouterLink>
        </li>
        <li>
          <RouterLink :to="`${baseUrl}Building/`">
            {{ i18n('TypeName', 'BuildingTypes') }}
          </RouterLink>
        </li>
        <li>
          <RouterLink :to="`${baseUrl}SuperWeapon/`">
            {{ i18n('TypeName', 'SuperWeaponTypes') }}
          </RouterLink>
        </li>
        <li>
          <RouterLink :to="`${baseUrl}Weapon/`">
            {{ i18n('TypeName', 'Weapons') }}
          </RouterLink>
        </li>
        <li>
          <RouterLink :to="`${baseUrl}Warhead/`">
            {{ i18n('TypeName', 'Warheads') }}
          </RouterLink>
        </li>
        <li>
          <RouterLink :to="`${baseUrl}GenericPrerequisites/`">
            {{ i18n('TypeName', 'GenericPrerequisitesTypes') }}
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
</script>
