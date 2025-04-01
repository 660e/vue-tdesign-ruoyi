<script setup lang="ts">
import Filter from './Filter.vue';
import Operation from './Operation.vue';
import Pagination from './Pagination.vue';

defineOptions({ inheritAttrs: false });
</script>

<template>
  <div class="h-full flex flex-col">
    <Filter />
    <div class="p-4 flex gap-2">
      <t-button>
        <template #icon>
          <t-icon name="add" />
        </template>
        <span>新增</span>
      </t-button>
      <t-button theme="danger">
        <template #icon>
          <t-icon name="delete" />
        </template>
        <span>删除</span>
      </t-button>
      <div class="flex-1"></div>
      <Operation />
    </div>
    <div class="px-4 flex-1 overflow-auto">
      <t-table class="h-full" height="100%" row-key="id" v-bind:="$attrs" bordered hover />
    </div>
    <div class="p-4 flex gap-2">
      <t-button theme="default">
        <template #icon>
          <t-icon name="upload" />
        </template>
        <span>导入</span>
      </t-button>
      <t-button theme="default">
        <template #icon>
          <t-icon name="download" />
        </template>
        <span>导出</span>
      </t-button>
      <Pagination />
    </div>
  </div>
</template>
