<script setup lang="ts">
import type { RadioValue, TableRowData } from 'tdesign-vue-next';
import { getMenuTreeByRoleId, getDeptTreeByRoleId, updateRole, listAllocated, listUnallocated, allocateUsers, unallocateUsers } from '@/apis/system';
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
const allocatedUsers = ref();
const unallocatedUsers = ref();

watch(
  () => row.roleId,
  () => onTabChange(tab.value),
);

const onTabChange = async (value: RadioValue) => {
  switch (value) {
    case 1:
      console.log(allocateUsers);
      console.log(unallocateUsers);
      break;

    case 2:
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
        checkedDeptKeys.value = undefined;
        deptTree.value = undefined;
      } finally {
        loadingStore.hide();
      }
      break;

    case 3:
      loadingStore.show();
      try {
        const response = await Promise.all([
          listAllocated({ pageNum: 1, pageSize: 9999, roleId: row.roleId }),
          listUnallocated({ pageNum: 1, pageSize: 9999, roleId: row.roleId }),
        ]);
        allocatedUsers.value = response[0].rows;
        unallocatedUsers.value = response[1].rows;
      } catch {
      } finally {
        loadingStore.hide();
      }
      break;
  }
};

const save = async () => {
  loadingStore.show();
  try {
    const { msg } = await updateRole({ ...row, menuIds: checkedMenuKeys.value, deptIds: checkedDeptKeys.value });
    MessagePlugin.success(msg);
  } catch {
  } finally {
    loadingStore.hide();
  }
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
        <t-button @click="onTabChange(tab)" theme="default">
          <template #icon><t-icon name="refresh" /></template><span>刷新</span>
        </t-button>
      </template>
    </div>

    <div v-if="tab === 1" class="flex-1 overflow-y-auto px-4 pb-4">
      <t-descriptions :column="1" :label-style="{ width: '120px' }" bordered>
        <t-descriptions-item label="序号">{{ row.roleSort }}</t-descriptions-item>
        <t-descriptions-item label="角色名称">{{ row.roleName }}</t-descriptions-item>
        <t-descriptions-item label="权限字符">{{ row.roleKey }}</t-descriptions-item>
        <t-descriptions-item label="状态">{{ useDict('sys_normal_disable', row.status) }}</t-descriptions-item>
        <t-descriptions-item label="创建时间">{{ row.createTime }}</t-descriptions-item>
        <t-descriptions-item label="备注">{{ row.remark }}</t-descriptions-item>
      </t-descriptions>
    </div>

    <div v-if="tab === 2" class="flex-1 overflow-auto px-4 pb-4 flex gap-4">
      <div class="flex-1 overflow-y-auto">
        <t-tree v-model="checkedMenuKeys" :data="menuTree" :expand-level="1" :keys="{ value: 'id' }" checkable line />
      </div>
      <div class="flex-1 overflow-y-auto">
        <t-tree v-model="checkedDeptKeys" :data="deptTree" :expand-level="2" :keys="{ value: 'id' }" checkable line />
      </div>
    </div>

    <div v-if="tab === 3" class="flex-1 px-4 pb-4">
      <t-transfer :data="unallocatedUsers" :keys="{ value: 'userId', label: 'userName' }" :operation="['移除', '授权']" class="h-full">
        <template #title="props">
          <div>{{ props.type === 'target' ? '已授权用户' : '未授权用户' }}</div>
        </template>
      </t-transfer>
    </div>
  </div>
</template>

<style scoped>
.t-transfer :deep(.t-transfer__list) {
  flex: 1;
  height: 100%;
}
</style>
