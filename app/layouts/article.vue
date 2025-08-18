<template>
  <div class="article-layout">
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
    <div 
      class="right-image-pattern" 
      v-if="rightImage"
      :style="{
        width: `${squareSize}px`,
        height: `${squareSize}px`
      }"
    >
      <img :src="rightImage" alt="Right pattern image" draggable="false"/>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { FoliageNav, FoliageSafeArea } from '#components';
import config from '@@/flory.config';
import { ref, computed, provide } from 'vue';

const rightImage = ref<string | null>(null);
provide('rightImage', rightImage);

const windowSize = ref({
  width: import.meta.client ? window.innerWidth : 0,
  height: import.meta.client ? window.innerHeight : 0
});

if (import.meta.client) {
  const updateWindowSize = () => {
    windowSize.value = {
      width: window.innerWidth,
      height: window.innerHeight
    }
  }
  window.addEventListener('resize', updateWindowSize)
  onBeforeUnmount(() => {
    window.removeEventListener('resize', updateWindowSize)
  })
}

const squareSize = computed(() => {
  return Math.min(windowSize.value.width, windowSize.value.height)
})
</script>

<style lang="css" scoped>
.article-layout {
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
  position: relative;
  z-index: 1;
}

.right-image-pattern {
  position: fixed;
  right: 0;
  bottom: 0;
  z-index: 0;
  overflow: hidden;
}

.right-image-pattern img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center;
  user-select: none;
}
</style>