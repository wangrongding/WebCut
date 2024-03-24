<script setup lang="ts"></script>
<template>
  <div class="right-panel w-[400px] bg-[#272836] flex justify-between">
    <div class="p-8">
      <div role="tablist" class="tabs tabs-boxed mb-4">
        <a role="tab" class="tab">Tab 1</a>
        <a role="tab" class="tab tab-active overflow-hidden">Tab 2</a>
        <a role="tab" class="tab">Tab 3</a>
        <a role="tab" class="tab">Tab 4</a>
      </div>
      <div class="tooltip mb-4" data-tip="开发中...">
        <button class="btn">
          <span class="loading loading-spinner"></span>
          loading
        </button>
      </div>

      <div>
        <input type="checkbox" class="toggle toggle-success" checked />
        <input type="checkbox" class="toggle toggle-warning" checked />
        <input type="checkbox" class="toggle toggle-info" checked />
        <input type="checkbox" class="toggle toggle-error" checked />
      </div>

      <!-- Open the modal using ID.showModal() method -->
      <button class="btn btn-sm" onclick="my_modal_1.showModal()">open modal</button>
      <dialog id="my_modal_1" class="modal">
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
    </div>
    <div class="w-[60px] bg-[#1c1c26] p-8"></div>
  </div>
</template>
<style lang="scss" scoped></style>
