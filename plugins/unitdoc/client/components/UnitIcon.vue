<template>
  <figure class="unit-icon">
    <div
      v-if="url"
      class="image"
      :style="`--unit-icon-src: url('${img(url)}')`" />
    <figcaption class="title" v-text="alt" />
  </figure>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

const props = defineProps<{
  unit: UnitDoc.Id
  elite?: boolean
  alt?: string
}>()

const unitData = computed(() => {
  return (
    __ESDNUnitDoc.source.Units.InfantryTypes[props.unit] ??
    __ESDNUnitDoc.source.Units.VehicleTypes[props.unit] ??
    __ESDNUnitDoc.source.Units.AircraftTypes[props.unit] ??
    __ESDNUnitDoc.source.Units.BuildingTypes[props.unit] ??
    __ESDNUnitDoc.source.Units.SuperWeaponTypes[props.unit]
  )
})

const img = (name: UnitDoc.ImageFileName) =>
  `${__ESDNUnitDoc.options.iconsBaseUrl}${name}`

const url = computed(() =>
  props.elite ? unitData.value?.AltCameo : unitData.value?.Cameo,
)
const alt = computed(() => {
  if (props.alt) return props.alt

  if (
    unitData.value?.UIName &&
    __ESDNUnitDoc.source.Csf[unitData.value?.UIName]
  )
    return __ESDNUnitDoc.source.Csf[unitData.value?.UIName]

  return props.unit
})
</script>

<style lang="scss">
figure.unit-icon {
  margin: 0.25rem 0;
  width: 60px;
  max-width: 60px;
  font-size: smaller;

  .title {
    width: 60px;
    max-width: 60px;
    overflow: hidden;
    white-space: nowrap;
    text-wrap: nowrap;
    text-overflow: ellipsis;
  }

  .image {
    width: 60px;
    height: 48px;
    background-image: var(--unit-icon-src);
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    background-clip: content-box;
  }
}
</style>
