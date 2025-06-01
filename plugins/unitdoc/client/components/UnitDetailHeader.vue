<template>
  <div v-if="unitData?.data" class="unit-detail">
    <table>
      <thead>
        <tr>
          <th colspan="255">
            {{ i18n('TypeName', unitData?.type, undefined, unitData?.data) }}
            :
            {{
              (unitData?.data?.UIName &&
                data.source.Csf[unitData?.data?.UIName]) ??
              unit
            }}
          </th>
        </tr>
        <tr v-if="unitData?.data.Cameo || unitData?.data.AltCameo">
          <th
            v-text="i18n('Icon', unitData?.type, undefined, unitData?.data)" />
          <td colspan="255">
            <div
              class="unit-detail-icon"
              :class="{ elite: unitData?.data.AltCameo }">
              <UnitIcon :unit="unit" alt="普通" />
              <UnitIcon
                v-if="unitData?.data.AltCameo"
                :unit="unit"
                alt="精英"
                elite />
            </div>
          </td>
        </tr>
        <TRHelper
          :data="{
            [i18n('Description', unitData?.type, undefined, unitData?.data) ??
            '']: data.source.Csf[unitData?.data.UIDescription!],
          }" />
      </thead>
      <tbody>
        <TRHelper
          :data="{
            [i18n('Cost', unitData?.type, undefined, unitData?.data) ?? '']:
              unitData?.data.Cost,
            [i18n('Power', unitData?.type, undefined, unitData?.data) ?? '']:
              unitData?.data.Power,
          }" />
        <TRHelper
          :data="{
            [i18n('Strength', unitData?.type, undefined, unitData?.data) ?? '']:
              unitData?.data.Strength,
            [i18n('Armor', unitData?.type, undefined, unitData?.data) ?? '']:
              unitData?.data.Armor,
          }" />
        <TRHelper
          :data="{
            [i18n('Primary', unitData?.type, undefined, unitData?.data) ?? '']:
              unitData?.data.Primary,
            [i18n('ElitePrimary', unitData?.type, undefined, unitData?.data) ??
            '']: unitData?.data.ElitePrimary,
          }"
          button />
        <TRHelper
          :data="{
            [i18n('Secondary', unitData?.type, undefined, unitData?.data) ??
            '']: unitData?.data.Secondary,
            [i18n(
              'EliteSecondary',
              unitData?.type,
              undefined,
              unitData?.data,
            ) ?? '']: unitData?.data.EliteSecondary,
          }"
          button />
        <tr v-if="unitData?.data.Prerequisite?.length">
          <th v-text="i18n('Prerequisite', unitData?.type, undefined)" />
          <td colspan="255">
            <div class="flex flex-row gap-2 justify-center">
              <UnitButton
                v-for="(unit, index) in unitData?.data.Prerequisite"
                :key="index"
                :unit="unit" />
            </div>
          </td>
        </tr>
        <TRHelper
          :data="{
            [i18n('Damage', unitData?.type, undefined, unitData?.data) ?? '']:
              unitData?.data.Damage,
            [i18n('ROF', unitData?.type, undefined, unitData?.data) ?? '']:
              unitData?.data.ROF,
            [i18n('Range', unitData?.type, undefined, unitData?.data) ?? '']:
              unitData?.data.Range,
            [i18n('Burst', unitData?.type, undefined, unitData?.data) ?? '']:
              unitData?.data.Burst,
            [i18n('Burst_Delays', unitData?.type, undefined, unitData?.data) ??
            '']: unitData?.data.Burst_Delays,
          }" />
        <TRHelper
          :data="{
            [i18n('Warhead', unitData?.type, undefined, unitData?.data) ?? '']:
              unitData?.data.Warhead,
          }"
          button />
        <TRHelper
          :data="{
            [i18n('CellSpread', unitData?.type, undefined, unitData?.data) ??
            '']: unitData?.data.CellSpread,
            [i18n('AffectsAllies', unitData?.type, undefined, unitData?.data) ??
            '']: unitData?.data.AffectsAllies,
            [i18n(
              'AffectsEnemies',
              unitData?.type,
              undefined,
              unitData?.data,
            ) ?? '']: unitData?.data.AffectsEnemies,
            [i18n('AffectsOwner', unitData?.type, undefined, unitData?.data) ??
            '']: unitData?.data.AffectsOwner,
          }" />
      </tbody>
    </table>
    <!-- <details v-if="unitData?.data.DamageModifiers">
      <summary
        v-text="
          i18n('DamageModifiers', unitData?.type, undefined, unitData?.data)
        " />

      <table>
        <tr v-for="(value, key) in unitData?.data.DamageModifiers" :key="key">
          <th v-text="key" />
          <td v-text="value" />
        </tr>
      </table>
    </details> -->
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import i18n from '../../locale'
import { getUnit } from '../utils'
import UnitButton from './UnitButton.vue'
import UnitIcon from './UnitIcon.vue'
import TRHelper from './_TRHelper.vue'

const data = __ESDNUnitDoc

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
</script>

<style lang="scss">
.unit-detail {
  table {
    .unit-detail-icon {
      display: grid;
      grid-template-columns: 1fr;

      &.elite {
        grid-template-columns: 1fr 1fr;
      }

      & > * {
        margin: auto;
      }
    }

    .gap-2 {
      gap: 0.5rem;
    }

    .flex {
      display: flex;
    }
    .flex-row {
      flex-direction: row;
    }
    .justify-center {
      justify-content: center;
    }
    .items-center {
      align-items: center;
    }
  }
}
</style>
