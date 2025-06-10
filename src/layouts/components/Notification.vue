<template>
  <t-popup placement="top-right" trigger="click">
    <div class="flex items-center gap-1 cursor-pointer duration-200 hover:text-blue-700">
      <div :style="{ backgroundColor: 'var(--td-error-color)' }" class="px-2 rounded-full text-xs text-white">100</div>
      <t-icon name="notification" />
    </div>
    <template #content>
      <div class="w-[600px]">
        <t-list size="small" split>
          <t-list-item>
            <t-tag class="!mr-2" size="small" theme="primary" variant="light">通知</t-tag>
            <span>列表内容的描述性文字</span><span class="flex-1"></span><span class="text-neutral-400">2025-06-09 18:00:00</span>
          </t-list-item>
          <t-list-item>
            <t-tag class="!mr-2" size="small" theme="primary" variant="light">通知</t-tag>
            <span>列表内容的描述性文字</span><span class="flex-1"></span><span class="text-neutral-400">2025-06-09 18:00:00</span>
          </t-list-item>
          <t-list-item>
            <t-tag class="!mr-2" size="small" theme="primary" variant="light">通知</t-tag>
            <span>列表内容的描述性文字</span><span class="flex-1"></span><span class="text-neutral-400">2025-06-09 18:00:00</span>
          </t-list-item>
        </t-list>

        <div class="pt-2 pb-1 flex justify-center">
          <t-link theme="primary">查看更多...</t-link>
        </div>
      </div>
    </template>
  </t-popup>
</template>
