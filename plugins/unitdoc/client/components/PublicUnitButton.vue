<template>
  <UnitButton v-if="unit" :unit="unit" :full-width />
  <div
    v-else
    v-text="`单位按钮使用说明：<UnitButton unit=&quot;单位注册名&quot; />`" />
</template>

<script lang="ts" setup>
import UnitButton from './UnitButton.vue'
defineProps<{
  unit?: UnitDoc.Id
  fullWidth?: boolean
}>()
</script>
