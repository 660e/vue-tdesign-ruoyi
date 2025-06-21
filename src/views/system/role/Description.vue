<script setup lang="ts">
import type { RadioValue, TableRowData, TransferProps } from 'tdesign-vue-next';
import type { AppSystemDictKey } from '@/types';
import { getMenuTreeByRoleId, getDeptTreeByRoleId, updateRole, listAllocated, listUnallocated, allocateUsers, unallocateUsers } from '@/apis/system';
import { useDict } from '@/hooks';
import { useLoadingStore } from '@/stores';

const { activeRowData } = defineProps<{
  activeRowData: TableRowData;
  handle: (value: string, activeRowData: TableRowData) => void;
}>();
const loadingStore = useLoadingStore();

const descriptions = [
  { label: '序号', prop: 'roleSort' },
  { label: '角色名称', prop: 'roleName' },
  { label: '权限字符', prop: 'roleKey' },
  { label: '状态', prop: 'status', dict: 'sys_normal_disable' },
  { label: '创建时间', prop: 'createTime' },
  { label: '备注', prop: 'remark' },
];
const tab = ref(1);
const checkedMenuKeys = ref();
const menuTree = ref();
const checkedDeptKeys = ref();
const deptTree = ref();
const allUsers = ref();
const allocatedUserKeys = ref<number[]>([]);

const onTabChange = async (value: RadioValue) => {
  checkedMenuKeys.value = undefined;
  menuTree.value = undefined;
  checkedDeptKeys.value = undefined;
  deptTree.value = undefined;
  allUsers.value = [];
  allocatedUserKeys.value = [];

  switch (value) {
    case 1:
      break;

    case 2:
      loadingStore.show();
      try {
        const response = await Promise.all([getMenuTreeByRoleId(activeRowData.roleId), getDeptTreeByRoleId(activeRowData.roleId)]);
        checkedMenuKeys.value = response[0].checkedKeys;
        menuTree.value = response[0].menus;
        checkedDeptKeys.value = response[1].checkedKeys;
        deptTree.value = response[1].depts;
      } catch {
      } finally {
        loadingStore.hide();
      }
      break;

    case 3:
      loadingStore.show();
      try {
        const response = await Promise.all([
          listAllocated({ pageNum: 1, pageSize: 9999, roleId: activeRowData.roleId }),
          listUnallocated({ pageNum: 1, pageSize: 9999, roleId: activeRowData.roleId }),
        ]);
        allUsers.value = [...(response[0].rows || []), ...(response[1].rows || [])];
        allocatedUserKeys.value = response[1].rows?.map((e) => e.userId as number) || [];
      } catch {
      } finally {
        loadingStore.hide();
      }
      break;
  }
};

const refresh = async () => await onTabChange(tab.value);

const saveRoles = async () => {
  loadingStore.show();
  try {
    const { msg } = await updateRole({ ...activeRowData, menuIds: checkedMenuKeys.value, deptIds: checkedDeptKeys.value });
    MessagePlugin.success(msg);
  } catch {
  } finally {
    loadingStore.hide();
  }
};

const onAllocatedChange: TransferProps['onChange'] = async (_, { type, movedValue }) => {
  loadingStore.show();
  try {
    const { msg } = await (type === 'target' ? allocateUsers : unallocateUsers)(activeRowData.roleId, movedValue.join(','));
    MessagePlugin.success(msg);
  } catch {
    await refresh();
  } finally {
    loadingStore.hide();
  }
};

watch(
  () => activeRowData.roleId,
  async () => await refresh(),
);
</script>

<template>
  <div class="flex-1 flex flex-col">
    <div class="p-4 flex gap-2 border-b border-neutral-200">
      <t-radio-group v-model="tab" :on-change="(value) => onTabChange(value)" variant="default-filled">
        <t-radio-button :value="1">基本信息</t-radio-button>
        <t-radio-button :value="2">菜单/数据权限</t-radio-button>
        <t-radio-button :value="3">分配用户</t-radio-button>
      </t-radio-group>

      <template v-if="tab === 1">
        <t-button @click="handle('edit', activeRowData)" theme="default">
          <template #icon><t-icon name="edit" /></template><span>修改</span>
        </t-button>
        <t-button @click="handle('delete', activeRowData)" theme="danger">
          <template #icon><t-icon name="delete" /></template><span>删除</span>
        </t-button>
      </template>
      <template v-if="tab === 2">
        <t-button @click="refresh" theme="default">
          <template #icon><t-icon name="refresh" /></template><span>刷新</span>
        </t-button>
        <t-button @click="saveRoles">
          <template #icon><t-icon name="save" /></template><span>保存</span>
        </t-button>
      </template>
      <template v-if="tab === 3">
        <t-button @click="refresh" theme="default">
          <template #icon><t-icon name="refresh" /></template><span>刷新</span>
        </t-button>
      </template>
    </div>

    <div v-if="tab === 1" class="flex-1 overflow-y-auto px-4 pb-4">
      <t-list split>
        <t-list-item v-for="description in descriptions" :key="description.prop">
          <div class="flex">
            <span class="w-20 pr-4 text-right font-bold">{{ description.label }}</span>
            <span v-if="description.dict">{{ useDict(description.dict as AppSystemDictKey, activeRowData[description.prop]) }}</span>
            <span v-else>{{ activeRowData[description.prop] }}</span>
          </div>
        </t-list-item>
      </t-list>
    </div>

    <div v-if="tab === 2" class="flex-1 overflow-auto p-4 flex gap-4">
      <div class="flex-1 overflow-y-auto">
        <t-tree v-model="checkedMenuKeys" :data="menuTree" :expand-level="1" :keys="{ value: 'id' }" checkable line />
      </div>
      <div class="flex-1 overflow-y-auto">
        <t-tree v-model="checkedDeptKeys" :data="deptTree" :expand-level="2" :keys="{ value: 'id' }" checkable line />
      </div>
    </div>

    <div v-if="tab === 3" class="flex-1 p-4">
      <t-transfer
        v-model="allocatedUserKeys"
        :data="allUsers"
        :keys="{ value: 'userId', label: 'userName' }"
        :on-change="onAllocatedChange"
        :operation="['移除', '授权']"
        class="h-full"
      >
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
