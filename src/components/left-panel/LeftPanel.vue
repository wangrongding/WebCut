<script setup lang="ts">
import VideoList from './VideoList.vue'
import { typeList } from './typeList'
import { ref } from 'vue'

const activeType = ref(1)
const setActiveType = (id: number) => {
  activeType.value = id
}
</script>
<template>
  <div class="left-box w-[400px] flex bg-[#272836]">
    <div class="w-[60px] bg-[#1c1c26] flex flex-col items-center">
      <div
        v-for="(item, index) in typeList"
        @click="setActiveType(item.id)"
        :key="index"
        class="h-[60px] text-sm w-[60px] hover:bg-[#272836] text-[#ababc0] hover:text-[white] select-none flex flex-col justify-center items-center cursor-pointer"
        :class="{ 'bg-[#272836] text-[white]': activeType === item.id }"
      >
        <component :is="item.icon" />
        {{ item.name }}
      </div>
    </div>
    <div class="text-white p-4 flex-1">
      <VideoList />
    </div>
  </div>
</template>
<style lang="scss" scoped></style>
