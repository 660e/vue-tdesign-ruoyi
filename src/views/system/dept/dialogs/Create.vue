<script setup lang="ts">
import type { FormInstanceFunctions, FormProps, TableRowData } from 'tdesign-vue-next';
import type { AppSystemDictKey } from '@/types';
import { createDept, updateDept } from '@/apis/system';
import { useDict } from '@/hooks';
import { useLoadingStore } from '@/stores';
import { buildTree } from '@/utils';

const emit = defineEmits<{ confirm: [] }>();
const {
  activeRowsData = [],
  itemMap = [],
  tableData = [],
} = defineProps<{
  activeRowsData: TableRowData[];
  itemMap: { label: string; name: string; dict?: AppSystemDictKey }[];
  tableData: TableRowData[];
}>();

const loadingStore = useLoadingStore();
const deptTree = computed(() => [{ deptName: '根目录', deptId: 0 }, ...buildTree(tableData, { idKey: 'deptId' })]);

const visible = ref(false);
const formRef = ref<FormInstanceFunctions>();
const formData = reactive<Record<string, number | string | undefined>>({
  parentId: 0,
  orderNum: 0,
  deptName: '',
  leader: '',
  phone: '',
  email: '',
  status: '0',
});
const formRules: FormProps['rules'] = {
  orderNum: [{ required: true, trigger: 'blur' }],
  deptName: [{ required: true, trigger: 'blur' }],
};

const show = (row?: TableRowData, index = 0) => {
  if (row?.deptId) {
    Object.assign(formData, row);
  } else {
    formData.parentId = activeRowsData[index - 1]?.deptId || 0;
  }
  visible.value = true;
};

const onClosed = () => {
  formRef.value?.reset();
  formData.deptId = undefined;
};

const onConfirm = async () => {
  if ((await formRef.value?.validate()) !== true) return;

  loadingStore.show();
  try {
    const { msg } = await (formData.deptId ? updateDept : createDept)(formData);
    MessagePlugin.success(msg);
    emit('confirm');
    visible.value = false;
  } catch {
  } finally {
    loadingStore.hide();
  }
};

defineExpose({ show });
</script>

<template>
  <t-dialog
    v-model:visible="visible"
    :header="`${formData.deptId ? '修改' : '新增'}部门`"
    :on-closed="onClosed"
    :on-confirm="onConfirm"
    placement="center"
    width="500"
  >
    <t-form :data="formData" :rules="formRules" reset-type="initial" ref="formRef">
      <t-form-item label="上级部门" name="parentId">
        <t-tree-select v-model="formData.parentId" :data="deptTree" :keys="{ label: 'deptName', value: 'deptId' }" :readonly="!formData.deptId" />
      </t-form-item>
      <template v-for="item in itemMap" :key="item.name">
        <t-form-item v-if="item.name === 'orderNum'" :label="item.label" :name="item.name">
          <t-input-number v-model="formData[item.name]" />
        </t-form-item>
        <t-form-item v-else-if="item.name === 'icon'" :label="item.label" :name="item.name">
          <q-icon-select v-model="formData[item.name]" clearable />
        </t-form-item>
        <t-form-item v-else :label="item.label" :name="item.name">
          <t-radio-group v-if="item.dict" v-model="formData[item.name]" :options="useDict(item.dict)" theme="button" variant="default-filled" />
          <t-input v-else v-model="formData[item.name]" />
        </t-form-item>
      </template>
    </t-form>
  </t-dialog>
</template>
