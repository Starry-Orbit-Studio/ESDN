<template>
  <div class="unit-button">
    <RouterLink v-if="path" :to="path">
      <UnitIcon :unit="id" @mouseenter="mouseenter" @mouseleave="mouseleave" />
    </RouterLink>
    <div
      v-else
      v-text="i18n('unknown', undefined, undefined, { unit: alt ?? unit })" />
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
import UnitIcon from './UnitIcon.vue'

const props = defineProps<{
  unit: UnitDoc.Id
}>()

const path = computed(() => {
  let uri = __ESDNUnitDoc.options.baseUrl

  if (__ESDNUnitDoc.source.Units.InfantryTypes[props.unit]) uri += 'Infantry'
  if (__ESDNUnitDoc.source.Units.VehicleTypes[props.unit]) uri += 'Vehicle'
  if (__ESDNUnitDoc.source.Units.AircraftTypes[props.unit]) uri += 'Aircraft'
  if (__ESDNUnitDoc.source.Units.BuildingTypes[props.unit]) uri += 'Building'
  if (__ESDNUnitDoc.source.Units.SuperWeaponTypes[props.unit])
    uri += 'SuperWeapon'
  if (__ESDNUnitDoc.source.Warheads[props.unit]) uri += 'Warhead'
  if (__ESDNUnitDoc.source.Weapons[props.unit]) uri += 'Weapon'

  return uri + '/' + props.unit
})
/** 单位 (或 通用建造前提) */
const id = computed(() => {
  // if (unitData.value?.genericPrerequisites) {
  //   return unitData.value.genericPrerequisites[0]
  // } else {
  return props.unit
  // }
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
