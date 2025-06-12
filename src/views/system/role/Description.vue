<script setup lang="ts">
import type { RadioValue, TableRowData } from 'tdesign-vue-next';
import { useDict } from '@/hooks';

defineEmits<{ handle: [value: string, row: TableRowData] }>();

const { row } = defineProps<{ row: TableRowData }>();

const tab = ref(1);
const onTabChange = (value: RadioValue) => {
  console.log(value);
};
</script>

<template>
  <div class="flex-1 flex flex-col">
    <div class="p-4 flex gap-2">
      <t-radio-group v-model="tab" :on-change="onTabChange" variant="default-filled">
        <t-radio-button :value="1">基本信息</t-radio-button>
        <t-radio-button :value="2">菜单权限</t-radio-button>
        <t-radio-button :value="3">数据权限</t-radio-button>
        <t-radio-button :value="4">分配用户</t-radio-button>
      </t-radio-group>

      <template v-if="tab === 1">
        <t-button @click="$emit('handle', 'edit', row)" theme="default">
          <template #icon><t-icon name="edit" /></template><span>修改</span>
        </t-button>
        <t-button @click="$emit('handle', 'delete', row)" theme="danger">
          <template #icon><t-icon name="delete" /></template><span>删除</span>
        </t-button>
      </template>
      <template v-if="tab === 2">
        <t-button>
          <template #icon><t-icon name="save" /></template><span>保存</span>
        </t-button>
      </template>
      <template v-if="tab === 3">
        <t-button>
          <template #icon><t-icon name="save" /></template><span>保存</span>
        </t-button>
      </template>
    </div>

    <div class="flex-1 overflow-y-auto">
      <div v-if="tab === 1" class="px-4 pb-4">
        <t-descriptions :column="1" :label-style="{ width: '120px' }" bordered>
          <t-descriptions-item label="序号">{{ row.roleSort }}</t-descriptions-item>
          <t-descriptions-item label="角色名称">{{ row.roleName }}</t-descriptions-item>
          <t-descriptions-item label="权限字符">{{ row.roleKey }}</t-descriptions-item>
          <t-descriptions-item label="状态">{{ useDict('sys_normal_disable', row.status) }}</t-descriptions-item>
          <t-descriptions-item label="创建时间">{{ row.createTime }}</t-descriptions-item>
          <t-descriptions-item label="备注">{{ row.remark }}</t-descriptions-item>
        </t-descriptions>
      </div>

      <div v-if="tab === 2">菜单权限</div>

      <div v-if="tab === 3">数据权限</div>

      <div v-if="tab === 4">分配用户</div>
    </div>
  </div>
</template>
