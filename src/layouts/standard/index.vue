<template>
  <div class="h-screen overflow-hidden flex flex-col">
    <div class="h-14 px-4 flex items-center border-b border-neutral-300">
      <img class="h-6" src="https://www.tencent.com/img/index/menu_logo_hover.png" />
    </div>
    <div class="flex-1 overflow-auto flex">
      <div class="w-60 border-r border-neutral-300">
        <t-menu>
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
          <t-menu-item v-for="n in 10" :value="n + 2" :key="n">
            <template #icon>
              <t-icon name="menu-application" />
            </template>
            <span>菜单{{ n + 2 }}</span>
          </t-menu-item>
        </t-menu>
      </div>
      <div class="flex-1 overflow-y-auto">
        <div class="h-[2000px]"></div>
        <!-- <RouterView /> -->
      </div>
    </div>
  </div>
</template>
