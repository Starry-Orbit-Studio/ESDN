<template>
  <TRHelper v-for="(item, i) in warhead" :data="{ [i]: item }" />
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import i18n from '../../locale'
import TRHelper from './_TRHelper.vue'

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
  if (types.value !== 'WarheadTypes') return
  return __ESDNUnitDoc.source.Data[props.unit] as UnitDoc.Weapon
})

const hasProperty = <T extends UnitDoc.Source['Data'][UnitDoc.Id]>(
  obj: UnitDoc.Source['Data'][UnitDoc.Id],
  property: keyof T,
): obj is T => property in obj && !!obj[property as keyof typeof obj]

const warhead = computed(() => {
  const result: Record<string, string | undefined> = {}
  if (!unitData.value) return result

  result[i18n('CellSpread', types.value, undefined, unitData.value) ?? ''] =
    unitData.value['CellSpread']?.toString()
  result[i18n('AffectsAllies', types.value, undefined, unitData.value) ?? ''] =
    unitData.value['AffectsAllies']?.toString()
  result[i18n('AffectsEnemies', types.value, undefined, unitData.value) ?? ''] =
    unitData.value['AffectsEnemies']?.toString()
  result[i18n('AffectsOwner', types.value, undefined, unitData.value) ?? ''] =
    unitData.value['AffectsOwner']?.toString()

  return result
})
</script>
