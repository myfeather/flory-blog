<template>
  <div 
    v-if="visible"
    class="context-menu"
    :style="{ top: `${position.y}px`, left: `${position.x}px` }"
    @click.stop
  >
    <div 
      v-for="item in items" 
      :key="item.id"
      class="context-menu-item"
      @click="handleItemClick(item)"
    >
      {{ item.label }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

interface MenuItem {
  id: string
  label: string
  action: () => void
}

const props = defineProps<{
  target?: HTMLElement | string
  items: MenuItem[]
}>()

const visible = ref(false)
const position = ref({ x: 0, y: 0 })

function handleContextMenu(event: MouseEvent) {
  event.preventDefault()
  position.value = { x: event.clientX, y: event.clientY }
  visible.value = true
}

function handleItemClick(item: MenuItem) {
  item.action()
  visible.value = false
}

function handleClickOutside() {
  visible.value = false
}

onMounted(() => {
  const targetElement = typeof props.target === 'string' 
    ? document.querySelector(props.target) 
    : props.target || document.documentElement

  targetElement?.addEventListener('contextmenu', handleContextMenu)
  document.addEventListener('click', handleClickOutside)

  onBeforeUnmount(() => {
    targetElement?.removeEventListener('contextmenu', handleContextMenu)
    document.removeEventListener('click', handleClickOutside)
  })
})
</script>

<style scoped>
.context-menu {
  position: fixed;
  background: var(--color-background) ;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  box-shadow: 0 4px 12px var(--color-shadow);
  z-index: 9999;
  min-width: 160px;
  padding: 8px 0;
}

.context-menu-item {
  padding: 8px 16px;
  cursor: pointer;
  color: var(--color-text);
  font-size: 14px;
  transition: background-color 0.2s ease;
}

.context-menu-item:hover {
  background-color: var(--color-card-hover-bg);
  color: var(--color-highlight);
}
</style>
