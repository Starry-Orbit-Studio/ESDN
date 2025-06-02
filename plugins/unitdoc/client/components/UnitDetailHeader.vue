<template>
  <div v-if="unitData" class="unit-detail">
    <table>
      <thead>
        <UnitInfoHeader :unit />
      </thead>
      <tbody>
        <UnitInfo :unit />
        <SuperWeaponInfo v-if="types === 'SuperWeaponTypes'" :unit />
        <WeaponInfo v-if="types === 'WeaponTypes'" :unit />
        <WarheadInfo v-if="types === 'WarheadTypes'" :unit />
      </tbody>
    </table>
    <!-- <details v-if="unitData.DamageModifiers">
      <summary
        v-text="
          i18n('DamageModifiers', types, undefined, unitData)
        " />

      <table>
        <tr v-for="(value, key) in unitData.DamageModifiers" :key="key">
          <th v-text="key" />
          <td v-text="value" />
        </tr>
      </table>
    </details> -->
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import SuperWeaponInfo from './SuperWeaponInfo.vue'
import UnitInfo from './UnitInfo.vue'
import UnitInfoHeader from './UnitInfoHeader.vue'
import WarheadInfo from './WarheadInfo.vue'
import WeaponInfo from './WeaponInfo.vue'

const props = defineProps<{
  unit: UnitDoc.Id
}>()

const types = computed<UnitDoc.Types | undefined>(
  () =>
    Object.entries(__ESDNUnitDoc.source.Types).find(([_, v]) =>
      v.includes(props.unit),
    )?.[0] as UnitDoc.Types,
)

const unitData = computed(() => __ESDNUnitDoc.source.Data[props.unit])
</script>

<style lang="scss">
.unit-detail {
  table {
    .gap-2 {
      gap: 0.5rem;
    }

    .flex {
      display: flex;
    }

    .flex-row {
      flex-direction: row;
    }

    .justify-center {
      justify-content: center;
    }

    .items-center {
      align-items: center;
    }

    .items-end {
      align-items: end;
    }
  }
}
</style>
