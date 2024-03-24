<script setup lang="ts"></script>
<template>
  <div class="left-box min-w-[400px] flex bg-[#272836]">
    <div class="w-[60px] bg-[#1c1c26] flex flex-col gap-2 items-center">
      <div
        v-for="item in 7"
        :key="item"
        class="w-[50px] h-[50px] rounded-lg bg-[#17171e] text-[#ababc0] hover:text-[white] select-none flex flex-col items-center leading-[50px]"
      >
        type {{ item }}
      </div>
    </div>
    <div class="text-white p-8">
      left-panel
      <span>( 开发中... )</span>
    </div>
  </div>
</template>
<style lang="scss" scoped></style>
