<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
</script>

<template>
  <div class="main">
    <header>
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/frame">Frame</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </header>
    <RouterView />
  </div>
</template>

<style lang="scss">
.main {
  display: flex;
  flex-direction: column;
  height: 100%;
}
</style>
