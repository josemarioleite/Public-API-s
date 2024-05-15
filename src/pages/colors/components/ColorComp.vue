<template>
<div class="color">
  <q-color
    :model-value="VCustom"
    class="color--picker"
    no-footer
    readonly
  />
  <div class="color__copy">
    <p class="color__copy--content">{{ VCustom }}</p>
    <!-- <q-icon name="content_copy" /> -->
  </div>
</div>
</template>

<script lang="ts" setup>
interface Props {
  VCustom: string
}

defineProps<Props>()
</script>

<style lang="scss" scoped>
.color {
  &--picker {
    width: 200px;
    height: 200px;
  }

  &__copy {
    height: 30px;
    background: #686666;
    color: #fff;

    &--content {
      text-align: center;
      padding-top: 5px;
      margin-top: 10px;
    }

    &--content:hover {
      display: none;
    }
  }

  &__copy:hover {
    cursor: pointer;
    background-color: #144e7e;
  }
}

@media only screen and (max-width: 499px) {
  .color {
  }
}
</style>
