<script setup lang="ts">
import emitter, { BusEvent } from '~/utils/eventBus'

const onFileChange = (e: Event) => {
  const target = e.target as HTMLInputElement
  const file = target.files?.[0]
  if (!file) return
  const url = URL.createObjectURL(file)
  addElement(url)
}

function addElement(url: string) {
  emitter.emit(BusEvent.ElementAdd, {
    type: 'image',
    value: url
  })
}

const imgList = [
  'https://daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.jpg',
  'https://daisyui.com/images/stock/photo-1572635148818-ef6fd45eb394.jpg',
  'https://daisyui.com/images/stock/photo-1550258987-190a2d41a8ba.jpg',
  'https://daisyui.com/images/stock/photo-1494253109108-2e30c049369b.jpg',
  'https://daisyui.com/images/stock/photo-1559181567-c3190ca9959b.jpg',
  'https://daisyui.com/images/stock/photo-1601004890684-d8cbf643f5f2.jpg',
  'https://daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.jpg',
  'https://daisyui.com/images/stock/photo-1572635148818-ef6fd45eb394.jpg',
  'https://daisyui.com/images/stock/photo-1550258987-190a2d41a8ba.jpg',
  'https://daisyui.com/images/stock/photo-1494253109108-2e30c049369b.jpg',
  'https://daisyui.com/images/stock/photo-1559181567-c3190ca9959b.jpg',
  'https://daisyui.com/images/stock/photo-1601004890684-d8cbf643f5f2.jpg'
]
</script>
<template>
  <div class="image-list flex flex-col gap-4">
    <p class="">添加本地图片：（不会上传）</p>
    <input
      type="file"
      accept="image/*"
      class="file-input file-input-bordered file-input-md w-full max-w-xs"
      @change="onFileChange"
    />
    <p>图片素材：（开发中）</p>
    <div class="max-h-[calc(100vh-200px)] columns-2 gap-2 overflow-y-auto">
      <img
        :src="item"
        class="image-item relative mb-2 cursor-pointer rounded-md"
        alt=""
        v-for="(item, index) in imgList"
        :key="index"
        @click="addElement(item)"
      />
    </div>
  </div>
</template>
<style lang="scss" scoped>
.image-item {
  &:hover {
    // 添加按钮
    &::after {
      content: '+ 添加';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: #fff;
      font-size: 16px;
      font-weight: bold;
      pointer-events: none;
    }
  }
}
</style>
