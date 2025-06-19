<script setup lang="ts">
import type { FormInstanceFunctions, FormProps, TableRowData } from 'tdesign-vue-next';
import type { AppSystemDictKey } from '@/types';
import { createMenu, updateMenu } from '@/apis/system';
import { useDict } from '@/hooks';
import { useLoadingStore } from '@/stores';
import { buildTree, iconConverter } from '@/utils';

type MenuType = 'M' | 'C' | 'F' | undefined;

const emit = defineEmits<{ confirm: [] }>();
const {
  activeRowsData = [],
  itemMap = {},
  tableData = [],
} = defineProps<{
  activeRowsData: TableRowData[];
  itemMap: Record<string, { label: string; name: string; dict?: AppSystemDictKey }[]>;
  tableData: TableRowData[];
}>();

const loadingStore = useLoadingStore();
const menuTree = computed(() => [{ menuName: '根目录', menuId: 0 }, ...buildTree(tableData, { idKey: 'menuId' })]);
const menuType = ref<MenuType>();
const dialogHeader = computed(() => {
  if (formData.menuId) {
    switch (formData.menuType) {
      case 'M':
        return '修改目录';
      case 'C':
        return '修改菜单';
      case 'F':
        return '修改按钮';
    }
  } else {
    switch (menuType.value) {
      case 'M':
      case 'C':
        return '新增目录/菜单';
      case 'F':
        return '新增按钮';
    }
  }
});

const visible = ref(false);
const formRef = ref<FormInstanceFunctions>();
const formData = reactive<Record<string, number | string | undefined>>({});
const formRules: FormProps['rules'] = {
  orderNum: [{ required: true, trigger: 'blur' }],
  menuName: [{ required: true, trigger: 'blur' }],
  path: [{ required: true, trigger: 'blur' }],
  component: [{ required: true, trigger: 'blur' }],
  perms: [{ required: true, trigger: 'blur' }],
};

const show = (row?: TableRowData, index = 0) => {
  if (row?.menuId) {
    menuType.value = undefined;
    Object.assign(formData, row);
    formData.icon = iconConverter(formData.icon as string);
  } else {
    menuType.value = activeRowsData[index - 1]?.menuType === 'C' ? 'F' : 'M';
    formData.menuId = undefined;
    formData.parentId = activeRowsData[index - 1]?.menuId || 0;
    formData.menuType = menuType.value;
    formData.orderNum = 0;
    formData.icon = '';
    formData.menuName = '';
    formData.path = '';
    formData.component = '';
    formData.perms = '';
    formData.isCache = '0';
    formData.isFrame = '0';
    formData.visible = '0';
    formData.status = '0';
  }
  visible.value = true;
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
  <t-dialog v-model:visible="visible" :header="dialogHeader" :on-confirm="onConfirm" placement="center" width="500">
    <t-form :data="formData" :rules="formRules" reset-type="initial" ref="formRef">
      <t-form-item label="上级目录" name="parentId">
        <t-tree-select v-model="formData.parentId" :data="menuTree" :keys="{ label: 'menuName', value: 'menuId' }" :readonly="!formData.menuId" />
      </t-form-item>
      <t-form-item v-if="menuType && menuType !== 'F'" label="菜单类型" name="menuType">
        <t-radio-group
          v-model="formData.menuType"
          :options="[
            { label: '目录', value: 'M' },
            { label: '菜单', value: 'C' },
          ]"
          theme="button"
          variant="default-filled"
        />
      </t-form-item>
      <template v-for="item in itemMap[formData.menuType || 'M']" :key="item.name">
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
