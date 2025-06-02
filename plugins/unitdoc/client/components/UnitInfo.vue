<template>
  <TRHelper
    v-if="unitData"
    :data="{
      [i18n('Cost', types, undefined, unitData) ?? '']: unitData.Cost,
      [i18n('Power', types, undefined, unitData) ?? '']: unitData.Power,
    }" />
  <TRHelper
    v-if="unitData"
    :data="{
      [i18n('Strength', types, undefined, unitData) ?? '']: unitData.Strength,
      [i18n('Armor', types, undefined, unitData) ?? '']: unitData.Armor,
    }" />
  <TRHelper
    v-if="unitData"
    :data="{
      [i18n('Primary', types, undefined, unitData) ?? '']: unitData.Primary,
      [i18n('ElitePrimary', types, undefined, unitData) ?? '']:
        unitData.ElitePrimary,
    }"
    button />
  <TRHelper
    v-if="unitData"
    :data="{
      [i18n('Secondary', types, undefined, unitData) ?? '']: unitData.Secondary,
      [i18n('EliteSecondary', types, undefined, unitData) ?? '']:
        unitData.EliteSecondary,
    }"
    button />
  <TRHelper
    v-for="(_, i) in unitData?.Weapons"
    :key="i"
    :data="{
      [i18n('Weapons', types, undefined, { ...unitData, i }) ?? '']:
        unitData?.Weapons?.[i],
      [i18n('EliteWeapons', types, undefined, { ...unitData, i }) ?? '']:
        unitData?.EliteWeapons?.[i],
    }"
    button />
  <tr v-if="unitData?.Prerequisite?.length">
    <th v-text="i18n('Prerequisite', types, undefined)" />
    <td colspan="255">
      <div class="flex flex-row gap-2 justify-center items-end">
        <UnitButton
          v-for="(unit, index) in unitData.Prerequisite.filter(i => !!i)"
          :key="index"
          :unit="unit"
          full-width />
        <div v-if="!unitData.Prerequisite.filter(i => !!i).length">
          {{ i18n('None') }}
        </div>
      </div>
    </td>
  </tr>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import i18n from '../../locale'
import TRHelper from './_TRHelper.vue'
import UnitButton from './UnitButton.vue'

const props = defineProps<{
  unit: UnitDoc.Id
}>()

const types = computed<UnitDoc.Types | undefined>(
  () =>
    Object.entries(__ESDNUnitDoc.source.Types).find(([_, v]) =>
      v.includes(props.unit),
    )?.[0] as UnitDoc.Types,
)

const unitData = computed<UnitDoc.Unit | undefined>(() => {
  if (
    !types.value ||
    !(<UnitDoc.Types[]>[
      'AircraftTypes',
      'BuildingTypes',
      'InfantryTypes',
      'VehicleTypes',
    ]).includes(types.value)
  )
    return
  return __ESDNUnitDoc.source.Data[props.unit] as UnitDoc.Unit
})
</script>
