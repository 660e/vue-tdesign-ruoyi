<script setup lang="ts">
import PKG from '../../../package.json';

const collapsed = ref(false);
</script>

<template>
  <div class="h-screen overflow-hidden flex flex-col">
    <div class="h-14 px-4 flex items-center gap-2 border-b border-neutral-200">
      <img class="h-6" src="@/assets/logo.svg" />
      <span class="text-xl">TDesign Starter</span>
    </div>
    <div class="flex-1 overflow-auto flex">
      <div class="flex flex-col border-r border-neutral-200">
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
          class="h-8 flex justify-center items-center cursor-pointer duration-200 border-t border-neutral-200 hover:bg-neutral-100"
        >
          <t-icon :name="`chevron-${collapsed ? 'right' : 'left'}-double`" size="20" />
        </div>
      </div>
      <div class="flex-1 flex flex-col">
        <div class="h-8 px-4 flex justify-between items-center border-b border-neutral-200">
          <t-breadcrumb>
            <t-breadcrumb-item>首页</t-breadcrumb-item>
            <t-breadcrumb-item>菜单1</t-breadcrumb-item>
            <t-breadcrumb-item>菜单2</t-breadcrumb-item>
          </t-breadcrumb>
          <div class="text-sm text-neutral-400">{{ PKG.version }}</div>
        </div>
        <div class="flex-1">
          <!-- <div class="h-[2000px]"></div> -->
          <!-- <RouterView /> -->
        </div>
        <div class="h-8 px-4 flex justify-center items-center border-t border-neutral-200">
          <div class="text-sm text-neutral-400">Copyright © 2025 660e All Rights Reserved.</div>
        </div>
      </div>
    </div>
  </div>
</template>
