<template>
  <div class="flex-1 flex flex-col">
    <div class="p-4 flex">
      <t-radio-group default-value="1" variant="default-filled">
        <t-radio-button value="1">基本信息</t-radio-button>
        <t-radio-button value="2">菜单权限</t-radio-button>
        <t-radio-button value="3">数据权限</t-radio-button>
        <t-radio-button value="4">分配用户</t-radio-button>
      </t-radio-group>
    </div>
    <div class="flex-1 overflow-y-auto">
      <div class="h-[2000px]"></div>
    </div>
  </div>
</template>
