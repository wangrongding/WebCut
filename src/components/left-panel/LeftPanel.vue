<script setup lang="ts">
import VideoList from './VideoList.vue'
import ImageList from './ImageList.vue'
import { typeList, ActiveType } from './typeList'
import { ref } from 'vue'

const activeType = ref(ActiveType.Video)
const setActiveType = (id: ActiveType) => {
  activeType.value = id
}
</script>
<template>
  <div class="left-box flex max-h-[calc(100vh-50px)] w-[400px] overflow-y-hidden bg-[#272836]">
    <div class="flex w-[60px] flex-col items-center bg-[#1c1c26]">
      <div
        v-for="(item, index) in typeList"
        @click="setActiveType(item.id)"
        :key="index"
        class="flex h-[60px] w-[60px] cursor-pointer select-none flex-col items-center justify-center gap-1 text-sm text-[#ababc0] hover:bg-[#272836] hover:text-[white]"
        :class="{ 'bg-[#272836] text-[white]': activeType === item.id }"
      >
        <component :is="item.icon" />
        {{ item.name }}
      </div>
    </div>
    <div class="flex-1 p-4 text-white">
      <VideoList v-if="activeType === ActiveType.Video" />
      <ImageList v-if="activeType === ActiveType.Image" />
    </div>
  </div>
</template>
<style lang="scss" scoped></style>
