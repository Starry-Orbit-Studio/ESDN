<template>
  <div v-if="visible && unitData">
    <h3 v-text="i18n('ExtraInfo', types, undefined)" id="extraInfo" />
    <ul>
      <li
        v-if="unitData?.OpportunityFire"
        v-text="i18n('OpportunityFire', types, undefined, unitData)" />
      <li
        v-if="unitData?.DetectDisguise"
        v-text="i18n('DetectDisguise', types, undefined, unitData)" />
      <li
        v-if="unitData?.BuildTimeMultiplier"
        v-text="
          i18n('BuildTimeMultiplier', types, undefined, unitData, data =>
            typeof data === 'number' ? `${data * 100}%` : `${data}`,
          )
        " />
      <li
        v-if="unitData?.CrushLevel"
        v-text="i18n('CrushLevel', types, undefined, unitData)" />
      <li
        v-if="unitData?.OmniCrusher"
        v-text="i18n('OmniCrusher', types, undefined, unitData)" />
      <li
        v-if="unitData?.BuildLimit"
        v-text="i18n('BuildLimit', types, undefined, unitData)" />
      <li
        v-if="unitData?.Cloakable"
        v-text="i18n('Cloakable', types, undefined, unitData)" />
      <li
        v-if="unitData?.Deployer"
        v-text="i18n('Deployer', types, undefined, unitData)" />
      <li v-if="unitData?.DeploysInto">
        <div class="flex flex-row items-center">
          <span
            v-text="
              i18n('DeploysInto', types, undefined, unitData, () => '')
            " />
          <UnitButton :unit="unitData.DeploysInto" />
        </div>
      </li>
      <li
        v-if="unitData?.Occupier"
        v-text="i18n('Occupier', types, undefined, unitData)" />
      <li
        v-if="unitData?.SelfHealing"
        v-text="i18n('SelfHealing', types, undefined, unitData)" />
      <li
        v-if="unitData?.ImmuneToEMP"
        v-text="i18n('ImmuneToEMP', types, undefined, unitData)" />
      <li
        v-if="unitData?.ImmuneToVeins"
        v-text="i18n('ImmuneToVeins', types, undefined, unitData)" />
      <li
        v-if="unitData?.ImmuneToPsionics"
        v-text="i18n('ImmuneToPsionics', types, undefined, unitData)" />
      <li
        v-if="unitData?.ImmuneToRadiation"
        v-text="i18n('ImmuneToRadiation', types, undefined, unitData)" />
      <li
        v-if="unitData?.ImmuneToPoison"
        v-text="i18n('ImmuneToPoison', types, undefined, unitData)" />
      <li
        v-if="unitData?.Ammo"
        v-text="i18n('Ammo', types, undefined, unitData)" />
      <li
        v-if="unitData?.RechargeTime"
        v-text="i18n('RechargeTime', types, undefined, unitData)" />
      <li
        v-if="unitData?.Cloneable"
        v-text="i18n('Cloneable', types, undefined, unitData)" />
      <li
        v-if="unitData?.Bunkerable"
        v-text="i18n('Bunkerable', types, undefined, unitData)" />
      <li
        v-if="unitData?.Trainable"
        v-text="i18n('Trainable', types, undefined, unitData)" />
      <li
        v-if="unitData?.Crushable"
        v-text="i18n('Crushable', types, undefined, unitData)" />
      <li
        v-if="unitData?.IsPowered"
        v-text="i18n('IsPowered', types, undefined, unitData)" />
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import i18n from '../../locale'
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

const unitData = computed(
  () =>
    __ESDNUnitDoc.source.Data[props.unit] as UnitDoc.Unit &
      UnitDoc.Weapon &
      UnitDoc.Warhead &
      UnitDoc.SuperWeapon,
)

const visible = computed(
  () =>
    unitData.value?.OpportunityFire ||
    unitData.value?.DetectDisguise ||
    unitData.value?.BuildTimeMultiplier ||
    unitData.value?.CrushLevel ||
    unitData.value?.OmniCrusher ||
    unitData.value?.BuildLimit ||
    unitData.value?.Cloakable ||
    unitData.value?.Deployer ||
    unitData.value?.DeploysInto ||
    unitData.value?.Occupier ||
    unitData.value?.SelfHealing ||
    unitData.value?.ImmuneToEMP ||
    unitData.value?.ImmuneToVeins ||
    unitData.value?.ImmuneToPsionics ||
    unitData.value?.ImmuneToRadiation ||
    unitData.value?.ImmuneToPoison ||
    unitData.value?.Ammo ||
    unitData.value?.RechargeTime ||
    unitData.value?.Cloneable ||
    unitData.value?.Bunkerable ||
    unitData.value?.Trainable ||
    unitData.value?.Crushable ||
    unitData.value?.IsPowered,
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
