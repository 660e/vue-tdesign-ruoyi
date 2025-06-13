<script setup lang="ts">
import type { RadioValue, TableRowData } from 'tdesign-vue-next';
import { getMenuTreeByRoleId, getDeptTreeByRoleId } from '@/apis/system';
import { useDict } from '@/hooks';
import { useLoadingStore } from '@/stores';

defineEmits<{ handle: [value: string, row: TableRowData] }>();

const { row } = defineProps<{ row: TableRowData }>();
const loadingStore = useLoadingStore();

const tab = ref(1);
const checkedMenuKeys = ref();
const menuTree = ref();
const checkedDeptKeys = ref();
const deptTree = ref();

watch(
  () => row.roleId,
  () => onTabChange(tab.value),
);

const onTabChange = async (value: RadioValue) => {
  switch (value) {
    case 1:
      break;

    case 2: {
      loadingStore.show();
      try {
        const response = await Promise.all([getMenuTreeByRoleId(row.roleId), getDeptTreeByRoleId(row.roleId)]);

        checkedMenuKeys.value = response[0].checkedKeys;
        menuTree.value = response[0].menus;
        checkedDeptKeys.value = response[1].checkedKeys;
        deptTree.value = response[1].depts;
      } catch {
        checkedMenuKeys.value = undefined;
        menuTree.value = undefined;
      } finally {
        loadingStore.hide();
      }
      break;
    }

    case 3:
      break;
  }
};

const save = () => {
  console.log({ menuIds: checkedMenuKeys.value });
};
</script>

<template>
  <div class="flex-1 flex flex-col">
    <div class="p-4 flex gap-2">
      <t-radio-group v-model="tab" :on-change="(value) => onTabChange(value)" variant="default-filled">
        <t-radio-button :value="1">基本信息</t-radio-button>
        <t-radio-button :value="2">菜单/数据权限</t-radio-button>
        <t-radio-button :value="3">分配用户</t-radio-button>
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
        <t-button @click="onTabChange(tab)" theme="default">
          <template #icon><t-icon name="refresh" /></template><span>刷新</span>
        </t-button>
        <t-button @click="save">
          <template #icon><t-icon name="save" /></template><span>保存</span>
        </t-button>
      </template>
      <template v-if="tab === 3">
        <div></div>
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

      <div v-if="tab === 2" class="px-4 pb-4 flex gap-4">
        <t-tree v-model="checkedMenuKeys" :data="menuTree" :expand-level="1" :keys="{ value: 'id' }" class="flex-1" checkable line />
        <t-tree v-model="checkedDeptKeys" :data="deptTree" :expand-level="2" :keys="{ value: 'id' }" class="flex-1" checkable line />
      </div>

      <div v-if="tab === 3">
        <pre>{{ row }}</pre>
      </div>
    </div>
  </div>
</template>
