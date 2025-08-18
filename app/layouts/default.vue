<template>
  <div class="default-layout">
    <div class="nav-bar">
      <FoliageNav
        :title="config?.title"
      />
    </div>
    <div class="content">
      <FoliageSafeArea>
        <slot />
      </FoliageSafeArea>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { FoliageNav, FoliageSafeArea } from '#components';
import config from '@@/flory.config';
</script>

<style lang="css" scoped>

.default-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.nav-bar {
  width: 100%;
  height: 3rem;
  position: sticky;
  top: 0;
  z-index: 10;
}

.content {
  flex: 1;
  width: 100%;
}
</style>