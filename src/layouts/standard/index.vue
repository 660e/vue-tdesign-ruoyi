<script setup lang="ts">
const collapsed = ref(false);
</script>

<template>
  <div class="h-screen overflow-hidden flex flex-col">
    <div class="h-14 px-4 flex items-center border-b border-neutral-300">
      <img class="h-6" src="https://www.tencent.com/img/index/menu_logo_hover.png" />
    </div>
    <div class="flex-1 overflow-auto flex">
      <div class="flex flex-col border-r border-neutral-300">
        <t-menu :collapsed="collapsed" class="overflow-auto">
          <t-menu-item value="1">
            <template #icon>
              <t-icon name="menu-application" />
            </template>
            <span>菜单1</span>
          </t-menu-item>
          <t-submenu title="菜单2" value="2">
            <template #icon>
              <t-icon name="menu-application" />
            </template>
            <t-menu-item value="2-1">
              <span>菜单2-1</span>
            </t-menu-item>
            <t-menu-item value="2-2">
              <span>菜单2-2</span>
            </t-menu-item>
          </t-submenu>
        </t-menu>
        <div
          @click="collapsed = !collapsed"
          class="h-8 flex justify-center items-center cursor-pointer duration-200 border-t border-neutral-300 hover:bg-neutral-100"
        >
          <t-icon :name="`chevron-${collapsed ? 'right' : 'left'}-double`" size="20" />
        </div>
      </div>
      <div class="flex-1 overflow-x-hidden overflow-y-auto">
        <div class="h-[2000px]"></div>
        <!-- <RouterView /> -->
      </div>
    </div>
  </div>
</template>
