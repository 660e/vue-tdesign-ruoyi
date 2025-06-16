<script setup lang="ts">
import type { FormInstanceFunctions, FormProps, TableRowData } from 'tdesign-vue-next';
import type { AppSystemDictKey } from '@/types';
import { createMenu, updateMenu } from '@/apis/system';
import { useDict } from '@/hooks';
import { useLoadingStore } from '@/stores';
import { buildTree } from '@/utils';

const emit = defineEmits<{ confirm: [] }>();
const { itemMaps = {}, menus = [] } = defineProps<{
  itemMaps: Record<string, { label: string; name: string; dict?: AppSystemDictKey }[]>;
  menus: TableRowData[];
}>();

const loadingStore = useLoadingStore();
const menuTree = computed(() => [{ menuName: '根目录', menuId: 0 }, ...buildTree(menus, { idKey: 'menuId' })]);

const visible = ref(false);
const formRef = ref<FormInstanceFunctions>();
const formData = reactive<Record<string, number | string | undefined>>({});
const formRules: FormProps['rules'] = {
  menuName: [{ required: true, trigger: 'blur' }],

  perms: [{ required: true, trigger: 'blur' }],
};

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

      <template v-for="item in itemMaps[formData.menuType || 'M']" :key="item.name">
        <t-form-item :label="item.label" :name="item.name">
          <t-radio-group v-if="item.dict" v-model="formData[item.name]" :options="useDict(item.dict)" theme="button" variant="default-filled" />
          <t-input v-else v-model="formData[item.name]" />
        </t-form-item>
      </template>

      <!--
      <t-form-item label="序号" name="roleSort">
        <t-input-number v-model="formData.roleSort" />
      </t-form-item>
      -->
    </t-form>
  </t-dialog>
</template>
