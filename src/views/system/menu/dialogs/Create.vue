<script setup lang="ts">
import type { FormInstanceFunctions, FormProps, TableRowData } from 'tdesign-vue-next';
import type { AppSystemDictKey } from '@/types';
import { createMenu, updateMenu } from '@/apis/system';
import { useDict } from '@/hooks';
import { useLoadingStore } from '@/stores';
import { buildTree } from '@/utils';

type MenuType = 'M' | 'C' | 'F' | undefined;

const emit = defineEmits<{ confirm: [] }>();
const {
  itemMap = {},
  listData = [],
  menuCascader = [],
} = defineProps<{
  itemMap: Record<string, { label: string; name: string; dict?: AppSystemDictKey }[]>;
  listData: TableRowData[];
  menuCascader: TableRowData[][];
}>();

const loadingStore = useLoadingStore();
const menuTree = computed(() => [{ menuName: '根目录', menuId: 0 }, ...buildTree(listData, { idKey: 'menuId' })]);
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
    return '新增';
  }
});

const visible = ref(false);
const formRef = ref<FormInstanceFunctions>();
const formData = reactive<Record<string, number | string | undefined>>({});
const formRules: FormProps['rules'] = {
  orderNum: [{ required: true, trigger: 'blur' }],
  icon: [{ required: true, trigger: 'blur' }],
  menuName: [{ required: true, trigger: 'blur' }],
  path: [{ required: true, trigger: 'blur' }],
  component: [{ required: true, trigger: 'blur' }],
  perms: [{ required: true, trigger: 'blur' }],
};

const show = (row?: TableRowData, index = 0) => {
  if (row?.menuId) {
    Object.assign(formData, row);
  } else {
    menuType.value = menuCascader[index].some((e) => e.menuType === 'F') ? 'F' : 'M';
    formData.menuType = menuType.value;
    formData.visible = '0';
    formData.status = '0';
    // console.log(index);
  }
  visible.value = true;
};

const onClosed = () => {
  menuType.value = undefined;
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
  <t-dialog v-model:visible="visible" :header="dialogHeader" :on-closed="onClosed" :on-confirm="onConfirm" placement="center" width="500">
    <t-form :data="formData" :rules="formRules" reset-type="initial" ref="formRef">
      <t-form-item label="上级目录" name="parentId">
        <t-tree-select v-model="formData.parentId" :data="menuTree" :keys="{ label: 'menuName', value: 'menuId' }" />
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
        <t-form-item v-else :label="item.label" :name="item.name">
          <t-radio-group v-if="item.dict" v-model="formData[item.name]" :options="useDict(item.dict)" theme="button" variant="default-filled" />
          <t-input v-else v-model="formData[item.name]" />
        </t-form-item>
      </template>
    </t-form>
  </t-dialog>
</template>
