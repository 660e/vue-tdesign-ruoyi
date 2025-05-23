<script setup lang="tsx">
import type { RouteRecordRaw } from 'vue-router';
import type { MenuValue } from 'tdesign-vue-next';
import { useInfoStore } from '@/stores';

const route = useRoute();
const router = useRouter();
const infoStore = useInfoStore();
const collapsed = ref(false);
const defaultValue = ref();
const defaultExpanded = ref();

const to = (menu: RouteRecordRaw) => {
  if (menu.meta?.frameBlank && menu.meta.frameSrc) {
    window.open(menu.meta.frameSrc, '_blank');
  } else {
    defaultValue.value = menu.name;
    router.push({ name: menu.name });
  }
};

const expand = (value: MenuValue[]) => {
  defaultExpanded.value = value;
};

const MenuItem = ({ routes }: { routes: RouteRecordRaw[] }) => {
  return routes.map((menu) => {
    if (menu.children?.length) {
      return (
        <t-submenu title={menu.meta?.title} value={menu.name}>
          {{
            icon: () => <t-icon name="menu-application" />,
            default: () => MenuItem({ routes: menu.children || [] }),
          }}
        </t-submenu>
      );
    }
    return (
      <t-menu-item onClick={() => to(menu)} value={menu.name}>
        {{
          icon: () => <t-icon name="menu-application" />,
          default: () => {
            return (
              <div class="flex justify-between items-center">
                <span>{menu.meta?.title}</span>
                <t-icon class="!w-4 !h-4 !m-0" name={menu.meta?.frameBlank && menu.meta.frameSrc ? 'jump' : undefined} />
              </div>
            );
          },
        }}
      </t-menu-item>
    );
  });
};

onMounted(() => {
  const matched = route.matched.slice(1, route.matched.length - 1);
  defaultValue.value = route.name as string;
  defaultExpanded.value = matched.length ? matched.map((e) => e.name) : [];
});
</script>

<template>
  <div
    @click="collapsed = !collapsed"
    class="h-10 flex justify-center items-center cursor-pointer duration-200 border-b border-neutral-200 hover:bg-neutral-100"
  >
    <t-icon :name="`chevron-${collapsed ? 'right' : 'left'}-double`" size="20" />
  </div>
  <t-menu :collapsed="collapsed" :expanded="defaultExpanded" :value="defaultValue" @expand="expand" class="flex-1 overflow-auto" expand-mutex>
    <MenuItem :routes="infoStore.routes" />
  </t-menu>
</template>

<style scoped>
.t-default-menu :deep(.t-menu__item) .t-menu__content {
  flex: 1;
}
</style>
