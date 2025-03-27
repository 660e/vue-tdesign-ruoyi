<template>
  <t-tooltip content="通知" placement="left">
    <div class="flex items-center gap-1 clickable">
      <div :style="{ backgroundColor: 'var(--td-error-color)' }" class="px-2 rounded-full text-xs text-white">100</div>
      <t-icon name="notification" />
    </div>
  </t-tooltip>
</template>
