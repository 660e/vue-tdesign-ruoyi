<script setup lang="tsx">
import type { IRoute } from '@/apis/types';
import { useInfoStore } from '@/stores';

const collapsed = ref(false);
const infoStore = useInfoStore();

const MenuItem = ({ routes }: { routes: IRoute[] }) => {
  return routes.map((menu) => {
    if (menu.children?.length) {
      return (
        <t-submenu title={menu.meta.title} value={menu.name}>
          {{
            icon: () => <t-icon name="menu-application" />,
            default: () => MenuItem({ routes: menu.children }),
          }}
        </t-submenu>
      );
    } else {
      return (
        <t-menu-item value={menu.name}>
          {{
            icon: () => <t-icon name="menu-application" />,
            default: () => menu.meta.title,
          }}
        </t-menu-item>
      );
    }
  });
};
</script>

<template>
  <div
    @click="collapsed = !collapsed"
    class="h-10 flex justify-center items-center cursor-pointer duration-200 border-b border-neutral-200 hover:bg-neutral-100"
  >
    <t-icon :name="`chevron-${collapsed ? 'right' : 'left'}-double`" size="20" />
  </div>
  <t-menu :collapsed="collapsed" class="flex-1 overflow-auto">
    <MenuItem :routes="infoStore.routes" />
  </t-menu>
</template>
