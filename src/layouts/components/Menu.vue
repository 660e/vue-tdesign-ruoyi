<script setup lang="tsx">
import type { IRoute } from '@/apis/types';
import { useInfoStore } from '@/stores';

const router = useRouter();
const infoStore = useInfoStore();
const collapsed = ref(false);

const to = (menu: IRoute) => {
  if (menu.meta.link) {
    window.open(menu.meta.link, '_blank');
  } else {
    router.push({ name: menu.name });
  }
};

const MenuItem = ({ routes }: { routes: IRoute[] }) => {
  return routes.map((menu) => {
    if (menu.children?.length) {
      return (
        <t-submenu title={menu.meta.title} value={menu.name}>
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
              <div class="flex items-center gap-2">
                <span>{menu.meta.title}</span>
                <t-icon name={menu.meta.link ? 'link' : undefined} />
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
    class="h-10 flex justify-center items-center cursor-pointer duration-200 border-b border-neutral-200 hover:bg-neutral-100"
  >
    <t-icon :name="`chevron-${collapsed ? 'right' : 'left'}-double`" size="20" />
  </div>
  <t-menu :collapsed="collapsed" class="flex-1 overflow-auto">
    <MenuItem :routes="infoStore.routes" />
  </t-menu>
</template>
