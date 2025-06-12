<script setup lang="ts">
import type { TableRowData } from 'tdesign-vue-next';

defineEmits<{ handle: [value: string, row: TableRowData] }>();

const { row } = defineProps<{ row: TableRowData }>();
</script>

<template>
  <div class="flex-1 flex flex-col">
    <div class="p-4 flex">
      <t-radio-group default-value="1" variant="default-filled">
        <t-radio-button value="1">基本信息</t-radio-button>
        <t-radio-button value="2">菜单权限</t-radio-button>
        <t-radio-button value="3">数据权限</t-radio-button>
        <t-radio-button value="4">分配用户</t-radio-button>
      </t-radio-group>
    </div>
    <div class="flex-1 overflow-y-auto">
      <div class="px-4">
        <t-descriptions :column="1" :label-style="{ width: '120px' }" bordered>
          <t-descriptions-item label="序号">{{ row.roleSort }}</t-descriptions-item>
          <t-descriptions-item label="角色名称">{{ row.roleName }}</t-descriptions-item>
          <t-descriptions-item label="权限字符">{{ row.roleKey }}</t-descriptions-item>
          <t-descriptions-item label="状态">{{ row.status }}</t-descriptions-item>
          <t-descriptions-item label="备注">{{ row.remark }}</t-descriptions-item>
        </t-descriptions>
        <div class="pt-4 flex gap-2">
          <t-button @click="$emit('handle', 'delete', row)" theme="danger">
            <template #icon><t-icon name="delete" /></template><span>删除</span>
          </t-button>
          <t-button @click="$emit('handle', 'edit', row)" theme="default">
            <template #icon><t-icon name="edit" /></template><span>修改</span>
          </t-button>
        </div>
      </div>
    </div>
  </div>
</template>
