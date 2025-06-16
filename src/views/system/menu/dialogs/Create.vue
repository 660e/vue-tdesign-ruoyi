<script setup lang="ts">
import type { FormInstanceFunctions, FormProps, TableRowData } from 'tdesign-vue-next';
import { createMenu, updateMenu } from '@/apis/system';
// import { useDict } from '@/hooks';
import { useLoadingStore } from '@/stores';
import { buildTree } from '@/utils';

const { menus = [] } = defineProps<{ menus: TableRowData[] }>();

const emit = defineEmits<{ confirm: [] }>();
const loadingStore = useLoadingStore();
const menuTree = computed(() => [{ menuName: '根目录', menuId: 0 }, ...buildTree(menus, { idKey: 'menuId' })]);

const visible = ref(false);
const formRef = ref<FormInstanceFunctions>();
const formData = reactive({
  menuId: undefined,
  parentId: undefined,
});
const formRules: FormProps['rules'] = {};

const show = (row?: TableRowData) => {
  if (row?.menuId) {
    Object.assign(formData, row);
  }
  visible.value = true;
};

const onClosed = () => {
  formRef.value?.reset();
  formData.menuId = undefined;
};

const onConfirm = async () => {
  if ((await formRef.value?.validate()) !== true) return;

  loadingStore.show();
  try {
    const { msg } = await (formData.menuId ? updateMenu : createMenu)(formData);
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
    :header="`${formData.menuId ? '修改' : '新增'}菜单`"
    :on-closed="onClosed"
    :on-confirm="onConfirm"
    placement="center"
    width="500"
  >
    <t-form :data="formData" :rules="formRules" reset-type="initial" ref="formRef">
      <t-form-item label="上级菜单" name="parentId">
        <t-tree-select v-model="formData.parentId" :data="menuTree" :keys="{ label: 'menuName', value: 'menuId' }" />
      </t-form-item>
      <pre>{{ formData }}</pre>
      <!-- <t-form-item label="序号" name="roleSort">
        <t-input-number v-model="formData.roleSort" />
      </t-form-item>
      <t-form-item label="角色名称" name="roleName">
        <t-input v-model="formData.roleName" />
      </t-form-item>
      <t-form-item label="权限字符" name="roleKey">
        <t-input v-model="formData.roleKey" />
      </t-form-item>
      <t-form-item label="状态" name="status">
        <t-radio-group v-model="formData.status" :options="useDict('sys_normal_disable')" theme="button" variant="default-filled" />
      </t-form-item>
      <t-form-item label="备注" name="remark">
        <t-textarea v-model="formData.remark" />
      </t-form-item> -->
    </t-form>
  </t-dialog>
</template>
