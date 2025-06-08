<template>
  <t-popup placement="top-right" trigger="click">
    <div class="flex items-center gap-1 clickable">
      <div :style="{ backgroundColor: 'var(--td-error-color)' }" class="px-2 rounded-full text-xs text-white">100</div>
      <t-icon name="notification" />
    </div>
    <template #content>
      <div>Lorem ipsum dolor sit amet.</div>
    </template>
  </t-popup>
</template>
