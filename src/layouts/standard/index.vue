<script setup lang="ts">
import Avatar from '../components/Avatar.vue';
import Breadcrumb from '../components/Breadcrumb.vue';
import Copyright from '../components/Copyright.vue';
import More from '../components/More.vue';
import Notification from '../components/Notification.vue';
import Search from '../components/Search.vue';
import Setting from '../components/Setting.vue';
import Version from '../components/Version.vue';

const collapsed = ref(false);
</script>

<template>
  <div class="h-screen overflow-hidden flex flex-col">
    <div class="h-14 px-4 flex items-center gap-2 border-b border-neutral-200">
      <img class="h-6" src="@/assets/logo.svg" />
      <div class="text-xl">TDesign Starter</div>
      <div class="flex-1"></div>
      <Search />
      <Avatar />
    </div>
    <div class="flex-1 overflow-auto flex">
      <div class="flex flex-col border-r border-neutral-200">
        <div
          @click="collapsed = !collapsed"
          class="h-8 flex justify-center items-center cursor-pointer duration-200 border-b border-neutral-200 hover:bg-neutral-100"
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
        <Version class="h-8 text-xs flex justify-center items-center border-t border-neutral-200 text-neutral-400" />
      </div>
      <div class="flex-1 flex flex-col">
        <div class="h-8 px-4 flex items-center gap-2 border-b border-neutral-200">
          <Breadcrumb />
          <div class="flex-1"></div>
          <Setting />
          <More />
        </div>
        <div class="flex-1 p-4 overflow-auto bg-neutral-100">
          <div class="h-full overflow-x-hidden overflow-y-auto rounded border border-neutral-200 bg-white">
            <RouterView />
          </div>
        </div>
        <div class="h-8 px-4 flex items-center gap-2 border-t border-neutral-200">
          <Copyright class="text-xs text-neutral-400" />
          <div class="flex-1"></div>
          <Notification />
        </div>
      </div>
    </div>
  </div>
</template>
