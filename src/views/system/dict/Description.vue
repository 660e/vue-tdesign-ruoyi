<script setup lang="ts">
import type { TableRowData } from 'tdesign-vue-next';
import { listDictData, deleteDictData } from '@/apis/system';
import { useDict } from '@/hooks';
import { useLoadingStore } from '@/stores';

const { activeRowData } = defineProps<{ activeRowData: TableRowData }>();
const loadingStore = useLoadingStore();
const tableData = ref();

const onHandle = async (value: string, row?: TableRowData) => {
  switch (value) {
    case 'refresh':
      loadingStore.show();
      try {
        const { rows } = await listDictData({ pageNum: 1, pageSize: 9999, dictType: activeRowData.dictType });
        tableData.value = rows?.map((item) => {
          item._editable = false;
          return item;
        });
      } catch {
      } finally {
        loadingStore.hide();
      }
      break;

    case 'close':
      break;

    case 'save':
      break;

    case 'edit':
      if (row) {
        row._cache = structuredClone(toRaw(row));
        row._editable = true;
      }
      break;

    case 'delete': {
      loadingStore.show();
      try {
        const { msg } = await deleteDictData(row?.dictCode);
        MessagePlugin.success(msg);
        await onHandle('refresh');
      } catch {
      } finally {
        loadingStore.hide();
      }
      break;
    }

    case 'create':
      // createDialogRef.value.show();
      break;
  }
};

watch(
  () => activeRowData.dictType,
  async () => await onHandle('refresh'),
);

onMounted(async () => await onHandle('refresh'));
</script>

<template>
  <div class="flex-1 overflow-y-auto p-4 space-y-2">
    <div v-for="row in tableData" :class="[row._editable ? 'bg-blue-50' : 'bg-neutral-100']" class="flex gap-2 p-2 rounded" :key="row.dictCode">
      <t-input-number v-model="row.dictSort" :readonly="!row._editable" class="!w-28" label="序号" theme="column" />
      <t-input v-model="row.dictLabel" :readonly="!row._editable" class="flex-1" label="标签" />
      <t-input v-model="row.dictValue" :readonly="!row._editable" class="flex-1" label="键值" />
      <t-radio-group
        v-model="row.status"
        :options="useDict('sys_normal_disable')"
        :readonly="!row._editable"
        theme="button"
        variant="default-filled"
      />
      <template v-if="row._editable">
        <t-button @click="onHandle('close', row)" shape="square" theme="default">
          <template #icon><t-icon name="close" /></template>
        </t-button>
        <t-button @click="onHandle('save', row)" shape="square" theme="success">
          <template #icon><t-icon name="save" /></template>
        </t-button>
      </template>
      <template v-else>
        <t-button @click="onHandle('edit', row)" shape="square" theme="default">
          <template #icon><t-icon name="edit" /></template>
        </t-button>
        <t-popconfirm @confirm="onHandle('delete', row)" content="确定删除此条数据？" placement="left" theme="danger">
          <t-button shape="square" theme="danger">
            <template #icon><t-icon name="delete" /></template>
          </t-button>
        </t-popconfirm>
      </template>
    </div>
  </div>
</template>
