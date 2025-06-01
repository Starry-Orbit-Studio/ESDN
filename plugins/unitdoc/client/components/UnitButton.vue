<template>
  <div class="unit-button">
    <RouterLink v-if="path" :to="path">
      <UnitIcon :unit @mouseenter="mouseenter" @mouseleave="mouseleave" />
    </RouterLink>
    <div
      v-else
      v-text="i18n('Unknown', undefined, undefined, { unit: alt ?? unit })" />
    <!-- <div
      v-show="showDetail"
      class="unit-detail"
      @mouseenter="mouseenter"
      @mouseleave="mouseleave">
      <table>
        <tbody>
          <tr>
            <th v-text="i18n('icon')" />
            <td><UnitIcon :unit="unit" /></td>
            <td><UnitIcon :unit="unit" elite /></td>
          </tr>
          <tr v-if="unitData?.prerequisite">
            <th v-text="'生产前提'" />
            <td colspan="2" class="prerequisite">
              <UnitButton
                v-for="(unit, index) in unitData.prerequisite"
                :key="index"
                :unit="unit" />
            </td>
          </tr>
          {{
            unitData?.prerequisite
          }}
        </tbody>
      </table>
      {{ data.units[unit] }}
    </div> -->
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import i18n from '../../locale'
import { getUnit } from '../utils'
import UnitIcon from './UnitIcon.vue'

const props = defineProps<{
  unit: UnitDoc.Id
}>()

const path = computed(() => {
  const res = getUnit(props.unit)

  let type = res?.type ?? '404'
  type = type.endsWith('s') ? type.substring(0, type.length - 1) : type
  type = type.endsWith('Type') ? type.substring(0, type.length - 4) : type

  return (
    __ESDNUnitDoc.options.baseUrl +
    '/' +
    type +
    '/' +
    props.unit
  ).replaceAll('//', '/')
})
const alt = computed(() => {
  return props.unit
  // if (unitData.value?.genericPrerequisites) {
  //   return i18n('genericPrerequisites', undefined, undefined, {
  //     unit: props.unit,
  //   })
  // }
})

onMounted(() => {})

const showDetail = ref(false)
let detailTimer: NodeJS.Timeout
const mouseenter = (payload: MouseEvent) => {
  clearTimeout(detailTimer)
  showDetail.value = true
}
const mouseleave = (payload: MouseEvent) => {
  detailTimer = setTimeout(() => {
    showDetail.value = false
  }, 1000)
}
</script>

<style lang="scss">
.unit-button {
  display: inline-block;

  .unit-detail {
    position: fixed;
    z-index: 9999;

    .prerequisite {
      text-align: center;
    }
  }
}
</style>

<!-- <style lang="scss" scoped>
.unit-detail {
}
</style> -->
