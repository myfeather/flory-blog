<template>
  <NuxtLayout>
    <NuxtPage />
    <ContextMenu :items="menuItems" />
  </NuxtLayout>
</template>

<script lang="ts" setup>
import ContextMenu from '@/components/floryUI/ContextMenu.vue'

const menuItems = ref([
  {
    id: 'refresh',
    label: '刷新',
    action: () => location.reload()
  },
  {
    id: 'back',
    label: '返回',
    action: () => window.history.back()
  },
  {
    id: 'copy',
    label: '复制',
    action: () => {
      if (window.getSelection) {
        const selection = window.getSelection()
        if (selection && selection.toString()) {
          navigator.clipboard.writeText(selection.toString())
        }
      }
    }
  }
])

// 提供方法让子组件可以添加菜单项
function addMenuItem(item: any) {
  menuItems.value.push(item)
}

provide('addContextMenuItem', addMenuItem)
</script>

<style lang="css" scoped>

</style>