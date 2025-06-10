<template>
  <t-popup :overlay-inner-style="{ padding: 0 }" placement="top-right" trigger="click">
    <div class="flex items-center gap-1 cursor-pointer duration-200 hover:text-blue-700">
      <div :style="{ backgroundColor: 'var(--td-error-color)' }" class="px-2 rounded-full text-xs text-white">100</div>
      <t-icon name="notification" />
    </div>
    <template #content>
      <div class="w-[600px]">
        <div class="px-3 py-1.5">
          <div class="q-list-item q-clickable hover:!bg-transparent">
            <t-tag size="small" theme="primary" variant="light">通知</t-tag>
            <span>Lorem ipsum dolor sit amet.</span>
            <span class="flex-1"></span>
            <span class="text-neutral-400">2025-06-09 18:00:00</span>
          </div>
          <div class="q-list-item q-clickable hover:!bg-transparent">
            <t-tag size="small" theme="danger" variant="light">公告</t-tag>
            <span>Natus tenetur veritatis aperiam cum?</span>
            <span class="flex-1"></span>
            <span class="text-neutral-400">2025-06-09 18:00:00</span>
          </div>
        </div>
        <t-divider class="!my-0" />
        <div>Lorem ipsum dolor sit amet.</div>
      </div>
    </template>
  </t-popup>
</template>
