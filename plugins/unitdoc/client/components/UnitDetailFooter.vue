<template>
  <div v-if="visible && unitData">
    <h3 v-text="i18n('ExtraInfo', unitData.type, undefined)" id="extraInfo" />
    <ul>
      <li
        v-if="unitData?.data?.OpportunityFire"
        v-text="
          i18n('OpportunityFire', unitData.type, undefined, unitData.data)
        " />
      <li
        v-if="unitData?.data?.DetectDisguise"
        v-text="
          i18n('DetectDisguise', unitData.type, undefined, unitData.data)
        " />
      <li
        v-if="unitData?.data?.BuildTimeMultiplier"
        v-text="
          i18n(
            'BuildTimeMultiplier',
            unitData.type,
            undefined,
            unitData,
            data => (typeof data === 'number' ? `${data * 100}%` : `${data}`),
          )
        " />
      <li
        v-if="unitData?.data?.CrushLevel"
        v-text="i18n('CrushLevel', unitData.type, undefined, unitData.data)" />
      <li
        v-if="unitData?.data?.OmniCrusher"
        v-text="i18n('OmniCrusher', unitData.type, undefined, unitData.data)" />
      <li
        v-if="unitData?.data?.BuildLimit"
        v-text="i18n('BuildLimit', unitData.type, undefined, unitData.data)" />
      <li
        v-if="unitData?.data?.Cloakable"
        v-text="i18n('Cloakable', unitData.type, undefined, unitData.data)" />
      <li
        v-if="unitData?.data?.Deployer"
        v-text="i18n('Deployer', unitData.type, undefined, unitData.data)" />
      <li v-if="unitData?.data?.DeploysInto">
        <div class="flex flex-row items-center">
          <span
            v-text="
              i18n(
                'DeploysInto',
                unitData.type,
                undefined,
                unitData,
                data => '',
              )
            " />
          <UnitButton :unit="unitData.data.DeploysInto" />
        </div>
      </li>
      <li
        v-if="unitData?.data?.Occupier"
        v-text="i18n('Occupier', unitData.type, undefined, unitData.data)" />
      <li
        v-if="unitData?.data?.SelfHealing"
        v-text="i18n('SelfHealing', unitData.type, undefined, unitData.data)" />
      <li
        v-if="unitData?.data?.ImmuneToEMP"
        v-text="i18n('ImmuneToEMP', unitData.type, undefined, unitData.data)" />
      <li
        v-if="unitData?.data?.ImmuneToVeins"
        v-text="
          i18n('ImmuneToVeins', unitData.type, undefined, unitData.data)
        " />
      <li
        v-if="unitData?.data?.ImmuneToPsionics"
        v-text="
          i18n('ImmuneToPsionics', unitData.type, undefined, unitData.data)
        " />
      <li
        v-if="unitData?.data?.ImmuneToRadiation"
        v-text="
          i18n('ImmuneToRadiation', unitData.type, undefined, unitData.data)
        " />
      <li
        v-if="unitData?.data?.ImmuneToPoison"
        v-text="
          i18n('ImmuneToPoison', unitData.type, undefined, unitData.data)
        " />
      <li
        v-if="unitData?.data?.Ammo"
        v-text="i18n('Ammo', unitData.type, undefined, unitData.data)" />
      <li
        v-if="unitData?.data?.RechargeTime"
        v-text="
          i18n('RechargeTime', unitData.type, undefined, unitData.data)
        " />
      <li
        v-if="unitData?.data?.Cloneable"
        v-text="i18n('Cloneable', unitData.type, undefined, unitData.data)" />
      <li
        v-if="unitData?.data?.Bunkerable"
        v-text="i18n('Bunkerable', unitData.type, undefined, unitData.data)" />
      <li
        v-if="unitData?.data?.Trainable"
        v-text="i18n('Trainable', unitData.type, undefined, unitData.data)" />
      <li
        v-if="unitData?.data?.Crushable"
        v-text="i18n('Crushable', unitData.type, undefined, unitData.data)" />
      <li
        v-if="unitData?.data?.IsPowered"
        v-text="i18n('IsPowered', unitData.type, undefined, unitData.data)" />
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import i18n from '../../locale'
import { getUnit } from '../utils'
import UnitButton from './UnitButton.vue'

const props = defineProps<{
  unit: UnitDoc.Id
}>()

const unitData = computed(
  () =>
    getUnit(props.unit)! as {
      type: UnitDoc.Type
      data?: Partial<UnitDoc.Unit & UnitDoc.Weapon & UnitDoc.Warhead>
    },
)

const visible = computed(
  () =>
    unitData.value?.data?.OpportunityFire ||
    unitData.value?.data?.DetectDisguise ||
    unitData.value?.data?.BuildTimeMultiplier ||
    unitData.value?.data?.CrushLevel ||
    unitData.value?.data?.OmniCrusher ||
    unitData.value?.data?.BuildLimit ||
    unitData.value?.data?.Cloakable ||
    unitData.value?.data?.Deployer ||
    unitData.value?.data?.DeploysInto ||
    unitData.value?.data?.Occupier ||
    unitData.value?.data?.SelfHealing ||
    unitData.value?.data?.ImmuneToEMP ||
    unitData.value?.data?.ImmuneToVeins ||
    unitData.value?.data?.ImmuneToPsionics ||
    unitData.value?.data?.ImmuneToRadiation ||
    unitData.value?.data?.ImmuneToPoison ||
    unitData.value?.data?.Ammo ||
    unitData.value?.data?.RechargeTime ||
    unitData.value?.data?.Cloneable ||
    unitData.value?.data?.Bunkerable ||
    unitData.value?.data?.Trainable ||
    unitData.value?.data?.Crushable ||
    unitData.value?.data?.IsPowered,
)
</script>

<style lang="scss">
.flex {
  display: flex;
}
.flex-row {
  flex-direction: row;
}
.items-center {
  align-items: center;
}
</style>
