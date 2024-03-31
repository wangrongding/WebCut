<script setup lang="ts">
import emitter from '~/utils/bus'

function copy() {
  emitter.emit('element:copy')
}
function paste() {
  emitter.emit('element:paste')
}
</script>
<template>
  <div class="right-panel w-[400px] bg-[#272836] flex justify-between">
    <div class="p-8">
      <!-- Open the modal using ID.showModal() method -->
      <button class="btn btn-sm" onclick="testModal.showModal()">open modal</button>
      <dialog id="testModal" class="modal">
        <div class="modal-box">
          <h3 class="font-bold text-lg">Hello!</h3>
          <p class="py-4">Press ESC key or click the button below to close</p>
          <div class="modal-action">
            <form method="dialog">
              <!-- if there is a button in form, it will close the modal -->
              <button class="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
      <div class="my-4 flex flex-col gap-4">
        <button class="btn btn-sm" @click="copy">Copy Selected Objects</button>
        <button class="btn btn-sm" @click="paste">Paste Selected Objects</button>
      </div>
    </div>
    <div class="w-[60px] bg-[#1c1c26] p-8"></div>
  </div>
</template>
<style lang="scss" scoped></style>
