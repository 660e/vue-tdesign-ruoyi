<script setup lang="ts">
import Avatar from '../components/Avatar.vue';
import Breadcrumb from '../components/Breadcrumb.vue';
import Copyright from '../components/Copyright.vue';
import Menu from '../components/Menu.vue';
import Notification from '../components/Notification.vue';
import Search from '../components/Search.vue';
import Setting from '../components/Setting.vue';
import Version from '../components/Version.vue';
import Initial from './Initial.vue';

const initialized = ref(false);
</script>

<template>
  <div v-if="initialized" class="h-screen overflow-hidden flex flex-col">
    <div class="h-14 px-4 flex items-center gap-4 border-b border-neutral-200">
      <div class="flex items-center gap-2">
        <img class="h-6" src="@/assets/logo.svg" />
        <div class="text-xl">TDesign Starter</div>
      </div>
      <div class="flex-1"></div>
      <Search />
      <Avatar />
    </div>
    <div class="flex-1 overflow-auto flex">
      <div class="flex flex-col border-r border-neutral-200">
        <Menu />
        <Version class="h-9 text-xs flex justify-center items-center border-t border-neutral-200 text-neutral-400" />
      </div>
      <div class="flex-1 flex flex-col overflow-x-auto">
        <div class="h-9 px-4 flex items-center gap-2 border-b border-neutral-200">
          <Breadcrumb />
          <div class="flex-1"></div>
          <Setting />
        </div>
        <div class="flex-1 overflow-auto bg-neutral-100">
          <RouterView />
        </div>
        <div class="h-9 px-4 flex items-center gap-2 border-t border-neutral-200">
          <Copyright class="text-xs text-neutral-400" />
          <div class="flex-1"></div>
          <Notification />
        </div>
      </div>
    </div>
  </div>

  <Initial v-else :done="() => (initialized = true)" />
</template>
