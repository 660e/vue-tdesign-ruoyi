<script setup lang="ts">
const collapsed = ref(false);
</script>

<template>
  <div
    @click="collapsed = !collapsed"
    class="h-10 flex justify-center items-center cursor-pointer duration-200 border-b border-neutral-200 hover:bg-neutral-100"
  >
    <t-icon :name="`chevron-${collapsed ? 'right' : 'left'}-double`" size="20" />
  </div>
  <t-menu :collapsed="collapsed" class="flex-1 overflow-auto">
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
</template>
