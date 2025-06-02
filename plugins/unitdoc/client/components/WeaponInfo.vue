<template>
  <TRHelper v-for="(item, i) in weapon" :data="{ [i]: item }" />
  <TRHelper
    v-if="unitData?.Warhead"
    :data="{
      [i18n('Warhead', types, undefined, unitData) ?? '']: unitData.Warhead,
    }"
    button />
  <WarheadInfo v-if="unitData?.Warhead" :unit="unitData.Warhead" />
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import i18n from '../../locale'
import TRHelper from './_TRHelper.vue'
import WarheadInfo from './WarheadInfo.vue'

const props = defineProps<{
  unit: UnitDoc.Id
}>()

const types = computed<UnitDoc.Types | undefined>(
  () =>
    Object.entries(__ESDNUnitDoc.source.Types).find(([_, v]) =>
      v.includes(props.unit),
    )?.[0] as UnitDoc.Types,
)

const unitData = computed<UnitDoc.Weapon | undefined>(() => {
  if (types.value !== 'WeaponTypes') return
  return __ESDNUnitDoc.source.Data[props.unit] as UnitDoc.Weapon
})

const hasProperty = <T extends UnitDoc.Source['Data'][UnitDoc.Id]>(
  obj: UnitDoc.Source['Data'][UnitDoc.Id],
  property: keyof T,
): obj is T => property in obj && !!obj[property as keyof typeof obj]

const weapon = computed(() => {
  const result: Record<string, string | UnitDoc.Id[] | undefined> = {}
  if (!unitData.value) return result

  result[i18n('Damage', types.value, undefined, unitData.value) ?? ''] =
    unitData.value['Damage']?.toString()
  result[i18n('ROF', types.value, undefined, unitData.value) ?? ''] =
    unitData.value['ROF']?.toString()
  result[i18n('Range', types.value, undefined, unitData.value) ?? ''] =
    unitData.value['Range']?.toString()
  result[i18n('Burst', types.value, undefined, unitData.value) ?? ''] =
    unitData.value['Burst']?.toString()
  result[i18n('Burst.Delays', types.value, undefined, unitData.value) ?? ''] =
    unitData.value['Burst.Delays']?.toString()

  return result
})
</script>
