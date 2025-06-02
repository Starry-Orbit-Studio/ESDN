<template>
  <figure class="unit-icon" :class="{ ['full-width']: fullWidth }">
    <div
      v-if="icon"
      class="image"
      :style="`--unit-icon-src: url('${img(icon)}')`" />
    <figcaption class="title" v-text="alt" />
  </figure>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
const props = defineProps<{
  unit: UnitDoc.Id
  elite?: boolean
  alt?: string
  fullWidth?: boolean
}>()

const unitData = computed(() => __ESDNUnitDoc.source.Data[props.unit])

const types = computed<UnitDoc.Types | undefined>(
  () =>
    Object.entries(__ESDNUnitDoc.source.Types).find(([_, v]) =>
      v.includes(props.unit),
    )?.[0] as UnitDoc.Types,
)

const icon = computed(() => {
  if (!unitData.value) return

  if (props.elite && 'AltCameo' in unitData.value)
    return unitData.value.AltCameo
  if ('Cameo' in unitData.value) return unitData.value.Cameo
  if ('SidebarImage' in unitData.value) return unitData.value.SidebarImage
  if (
    [
      'InfantryTypes',
      'VehicleTypes',
      'AircraftTypes',
      'BuildingTypes',
      'SuperWeaponTypes',
    ].includes(types.value)
  )
    return 'xxicon.webp'
})
const alt = computed(() => {
  if (props.alt) return props.alt

  if ('UIName' in unitData.value && unitData.value.UIName)
    return (
      __ESDNUnitDoc.source.Csf[unitData.value.UIName] ?? unitData.value.UIName
    )

  return props.unit
})

const img = (name: UnitDoc.ImageFileName) =>
  `${__ESDNUnitDoc.options.iconsBaseUrl}${name}`
</script>

<style lang="scss">
figure.unit-icon {
  margin: 0.25rem 0;
  width: 60px;
  max-width: 60px;
  font-size: smaller;

  &.full-width {
    width: unset;
    max-width: unset;
    .title {
      width: unset;
      max-width: unset;
    }
    .image {
      margin: auto;
    }
  }

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
