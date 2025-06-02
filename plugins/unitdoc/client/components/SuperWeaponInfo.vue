<template>
  <TRHelper :data="superWeapon" />
  <WeaponInfo v-if="unitData?.WeaponType" :unit="unitData.WeaponType" />
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

const unitData = computed<UnitDoc.SuperWeapon | undefined>(() => {
  if (types.value !== 'SuperWeaponTypes') return
  return __ESDNUnitDoc.source.Data[props.unit] as UnitDoc.SuperWeapon
})

const superWeapon = computed(() => {
  const result: Record<string, string | UnitDoc.Id[] | undefined> = {}
  if (!unitData.value) return result

  result[i18n('IsPowered', types.value, undefined, unitData.value) ?? ''] =
    unitData.value['IsPowered']?.toString()
  result[i18n('RechargeTime', types.value, undefined, unitData.value) ?? ''] =
    unitData.value['RechargeTime']?.toString()

  return result
})
</script>
