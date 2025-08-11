<template>
  <div class="main-layout">
    <div class="nav-bar">
      <FoliageNav
        :title="config?.title"
      />
    </div>
    <div class="content">
      <FoliageSafeArea>
        <NuxtPage />
        <!-- !For Testing -->
      </FoliageSafeArea>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { FoliageNav, FoliageSafeArea } from '#components';
import config from '@@/flory.config';
</script>

<style lang="css" scoped>

.nav-bar {
  width: 100%;
  height: 3rem;
}
.content {
  width: 100%;
  height: 100%; /* Adjust height to fill the remaining space */
}
</style>