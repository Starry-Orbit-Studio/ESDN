<template>
  <tr>
    <th colspan="255">
      <span>
        {{ i18n('TypeName', types, undefined, unitData) }}
      </span>
      :
      <span v-if="hasProperty<UnitDoc.Unit>(unitData, 'UIName')">
        {{ ESDNUnitDoc.source.Csf[unitData.UIName!] }}
      </span>
      <span v-else>
        {{ unit }}
      </span>
    </th>
  </tr>
  <tr v-if="hasProperty<UnitDoc.Unit>(unitData, 'Cameo')">
    <th v-text="i18n('Icon', types, undefined, unitData)" />
    <td colspan="255">
      <div class="unit-detail-icon" :class="{ elite: unitData.AltCameo }">
        <UnitIcon :unit="unit" alt="普通" />
        <UnitIcon v-if="unitData.AltCameo" :unit="unit" alt="精英" elite />
      </div>
    </td>
  </tr>
  <tr v-else-if="hasProperty<UnitDoc.SuperWeapon>(unitData, 'SidebarImage')">
    <th v-text="i18n('Icon', types, undefined, unitData)" />
    <td colspan="255">
      <div class="unit-detail-icon">
        <UnitIcon :unit="unit" />
      </div>
    </td>
  </tr>
  <TRHelper
    v-if="hasProperty<UnitDoc.Unit>(unitData, 'UIDescription')"
    :data="{
      [i18n('Description', types, undefined, unitData) ?? '']:
        ESDNUnitDoc.source.Csf[unitData.UIDescription!],
    }" />
  <tr v-if="hasProperty<UnitDoc.Unit>(unitData, 'TechLevel')">
    <th v-text="i18n('TechLevel', types, undefined, unitData)" />
    <td v-if="unitData.TechLevel === 0x4e445345" colspan="255">
      <span class="tech-level-highlight">ESDN</span>
    </td>
    <td v-else-if="unitData.TechLevel === -0x4e445345" colspan="255">
      <span class="tech-level-colorful">ESDN</span>
    </td>
    <td v-else colspan="255">
      {{ unitData.TechLevel }}
    </td>
  </tr>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import i18n from '../../locale'
import TRHelper from './_TRHelper.vue'
import UnitIcon from './UnitIcon.vue'

const ESDNUnitDoc = __ESDNUnitDoc

const props = defineProps<{
  unit: UnitDoc.Id
}>()

const hasProperty = <T extends UnitDoc.Source['Data'][UnitDoc.Id]>(
  obj: UnitDoc.Source['Data'][UnitDoc.Id],
  property: keyof T,
): obj is T => property in obj && !!obj[property as keyof typeof obj]

const types = computed<UnitDoc.Types | undefined>(
  () =>
    Object.entries(__ESDNUnitDoc.source.Types).find(([_, v]) =>
      v.includes(props.unit),
    )?.[0] as UnitDoc.Types,
)

const unitData = computed(() => __ESDNUnitDoc.source.Data[props.unit])
</script>
<style lang="scss">
.unit-detail-icon {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;

  &.elite {
    grid-template-columns: 1fr 1fr;
  }

  & > * {
    place-self: center;
  }
}
.tech-level-highlight {
  color: var(--vp-c-accent);
}
.tech-level-colorful {
  color: transparent;
  background-image: linear-gradient(
    to right bottom,
    #ff0000,
    #00ff00,
    #0000ff,
    #00ff00,
    #ff0000
  );
  background-clip: text;
  background-size: 400% 100%;
  animation: tech-level-highlight-animation 4s infinite linear;
}
@keyframes tech-level-highlight-animation {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: -400% 0;
  }
}
</style>
