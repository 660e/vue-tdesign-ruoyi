<script setup lang="ts">
import type { FormInstanceFunctions, FormProps, TableRowData } from 'tdesign-vue-next';
import { createMenu, updateMenu } from '@/apis/system';
// import { useDict } from '@/hooks';
import { useLoadingStore } from '@/stores';
import { buildTree } from '@/utils';

type MenuType = 'M' | 'C' | 'F' | undefined;

const emit = defineEmits<{ confirm: [] }>();
const { itemMaps = {}, menus = [] } = defineProps<{
  itemMaps: Record<string, { label: string; name: string; dict?: string }[]>;
  menus: TableRowData[];
}>();

const loadingStore = useLoadingStore();
const menuTree = computed(() => [{ menuName: '根目录', menuId: 0 }, ...buildTree(menus, { idKey: 'menuId' })]);

const visible = ref(false);
const menuType = ref<MenuType>();
const formRef = ref<FormInstanceFunctions>();
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const formData = reactive<any>({});
const formRules: FormProps['rules'] = {
  menuName: [{ required: true, trigger: 'blur' }],
};

const show = (row?: TableRowData, type?: MenuType) => {
  if (row?.menuId) {
    menuType.value = type;
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

      <template v-for="item in menuType ? itemMaps[menuType] : []" :key="item.name">
        <t-form-item :label="item.label" :name="item.name">
          <t-input v-model="formData[item.name]" />
        </t-form-item>
      </template>
      <!-- <template v-if="menuType === 'M'"></template>
      <template v-if="menuType === 'C'"></template>
      <template v-if="menuType === 'F'">
        <t-form-item label="按钮名称" name="menuName">
          <t-input v-model="formData.menuName" />
        </t-form-item>
      </template> -->
      <pre>{{ menuType ? itemMaps[menuType] : {} }}</pre>
      <pre>{{ formData }}</pre>
      <!-- <t-form-item label="序号" name="roleSort">
        <t-input-number v-model="formData.roleSort" />
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
