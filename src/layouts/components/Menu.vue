<script setup lang="tsx">
import type { RouteRecordRaw } from 'vue-router';
import type { MenuValue } from 'tdesign-vue-next';
import { useAppStore } from '@/stores';

const route = useRoute();
const router = useRouter();
const appStore = useAppStore();
const collapsed = ref(false);
const defaultValue = ref();
const defaultExpanded = ref();

const to = (menu: RouteRecordRaw) => {
  if (menu.meta?.frameBlank && menu.meta.frameSrc) {
    window.open(menu.meta.frameSrc, '_blank');
  } else {
    router.push({ name: menu.name });
  }
};

const expand = (value: MenuValue[]) => {
  defaultExpanded.value = value;
};

const setMenuState = () => {
  const matched = route.matched.slice(1, route.matched.length - 1);
  defaultValue.value = route.name;
  defaultExpanded.value = matched.length ? matched.map((e) => e.name) : [];
};

onMounted(() => setMenuState());
watch(route, () => setMenuState());

const MenuItem = ({ routes }: { routes: RouteRecordRaw[] }) => {
  return routes.map((menu) => {
    if (menu.children?.length) {
      return (
        <t-submenu title={menu.meta?.title} value={menu.name}>
          {{
            icon: () => <t-icon name={menu.meta?.icon} />,
            default: () => MenuItem({ routes: menu.children || [] }),
          }}
        </t-submenu>
      );
    }
    return (
      <t-menu-item onClick={() => to(menu)} value={menu.name}>
        {{
          icon: () => <t-icon name={menu.meta?.icon} />,
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
</script>

<template>
  <div
    @click="collapsed = !collapsed"
    class="h-9 flex justify-center items-center cursor-pointer duration-200 border-b border-neutral-200 hover:bg-neutral-100"
  >
    <t-icon :name="`chevron-${collapsed ? 'right' : 'left'}-double`" size="20" />
  </div>
  <div class="flex-1 overflow-y-auto">
    <t-menu :collapsed="collapsed" :expanded="defaultExpanded" :value="defaultValue" @expand="expand" class="!h-auto" expand-mutex>
      <MenuItem :routes="appStore.routes" />
    </t-menu>
  </div>
</template>
