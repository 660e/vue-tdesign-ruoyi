<template>
  <t-layout class="h-screen overflow-hidden">
    <t-header class="flex items-center px-4 border-b border-neutral-300">
      <img class="h-6" src="https://www.tencent.com/img/index/menu_logo_hover.png" />
    </t-header>
    <t-layout class="overflow-auto">
      <t-aside class="border-r border-neutral-300">
        <div>aside</div>
      </t-aside>
      <t-layout>
        <t-content class="overflow-y-auto">
          <RouterView />
        </t-content>
      </t-layout>
    </t-layout>
  </t-layout>
</template>
