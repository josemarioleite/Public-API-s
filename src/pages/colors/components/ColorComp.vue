<template>
<div class="color">
  <q-color
    :model-value="VCustom"
    class="color--picker"
    no-footer
    readonly
  />
  <div class="color__copy" @click="copyColor">
    <p class="color__copy--content">{{ VCustom }}</p>
  </div>
</div>
</template>

<script lang="ts" setup>
import { Notify, copyToClipboard } from 'quasar'
import { useI18n } from 'vue-i18n'

interface Props {
  VCustom: string
}

const $t = useI18n().t
const props = defineProps<Props>()

const copyColor = () => {
  console.log(props.VCustom)
  return copyToClipboard(props.VCustom)
    .then(() => {
      return Notify.create({ message: $t('pages.colors.copy'), color: 'green' })
    })
}
</script>

<style lang="scss" scoped>
.color {
  &--picker {
    width: 200px;
    height: 200px;
  }

  &__copy {
    height: 30px;
    border-radius: 8px;
    background: #686666;
    color: #fff;

    &--content {
      text-align: center;
      padding-top: 5px;
      margin-top: 10px;
    }
  }

  &__copy:hover {
    cursor: pointer;
    background: #054172;
  }
}

@media only screen and (max-width: 499px) {
  .color {
  }
}
</style>
