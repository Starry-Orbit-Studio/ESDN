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
import { getUnit } from '../utils'

const props = defineProps<{
  unit: UnitDoc.Id
  elite?: boolean
  alt?: string
}>()

const unitData = computed(() => getUnit(props.unit))

const img = (name: UnitDoc.ImageFileName) =>
  `${__ESDNUnitDoc.options.iconsBaseUrl}${name}`

const url = computed(() => {
  const data = unitData.value?.data as UnitDoc.Unit
  return props.elite ? data?.AltCameo : data?.Cameo
})
const alt = computed(() => {
  if (props.alt) return props.alt
  const data = unitData.value?.data as UnitDoc.Unit

  if (data?.UIName && __ESDNUnitDoc.source.Csf[data?.UIName])
    return __ESDNUnitDoc.source.Csf[data?.UIName]

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
