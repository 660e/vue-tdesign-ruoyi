<template>
  <t-breadcrumb>
    <t-breadcrumb-item v-for="breadcrumb in $route.matched" :to="{ path: breadcrumb.path }" :key="breadcrumb.name">
      <template v-if="breadcrumb.meta.icon" #icon><t-icon :name="breadcrumb.meta.icon" /></template>
      <span>{{ breadcrumb.meta.title }}</span>
    </t-breadcrumb-item>
  </t-breadcrumb>
</template>
