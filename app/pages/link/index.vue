<template>
  <div class="links-container">
    <div class="hero">
      <h1>友情链接</h1>
      <p>感谢所有支持我们的朋友</p>
    </div>

    <div v-for="category in links" :key="category.title" class="category-section">
      <h2>{{ category.title }}</h2>
      <p v-if="category.subTitle" class="subtitle">{{ category.subTitle }}</p>
      
      <div class="links-grid">
        <WebsiteCard
          v-for="link in category.links"
          :key="link.url"
          :title="link.name"
          :subtitle="link.siteName"
          :desc="link.desc"
          :to="link.url"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import links from '@@/configs/flory.links.config'
import WebsiteCard from '@/components/floryUI/WebsiteCard.vue'
</script>

<style scoped>
.links-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.hero {
  margin-bottom: 3rem;
}

.hero h1 {
  font-size: 2.5rem;
  font-weight: 600;
  color: var(--color-text);
  margin-bottom: 0.5rem;
}

.hero p {
  font-size: 1.1rem;
  color: var(--color-text-secondary);
}

.category-section {
  margin-bottom: 3rem;
}

.category-section h2 {
  font-size: 1.8rem;
  font-weight: 600;
  color: var(--color-text);
  margin-bottom: 0.5rem;
}

.category-section .subtitle {
  font-size: 1rem;
  color: var(--color-text-secondary);
  margin-bottom: 1.5rem;
}

.links-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
}
</style>
