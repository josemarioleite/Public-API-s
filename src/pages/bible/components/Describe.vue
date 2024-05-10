<template>
<div class="describe">
  <span class="describe--title">{{ Title }}:</span>
  <span class="describe--content">{{ Content }}</span>
</div>
</template>

<script lang="ts" setup>
interface Props {
  Title: string
  Content: string
}

defineOptions({
  name: 'Describe'
})

withDefaults(defineProps<Props>(), {
  Content: ''
})
</script>

<style lang="scss" scoped>
.describe {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 5px;
  gap: 10px;

  &--title {
    font-weight: 450;
  }

  &--title, &--content {
    font-size: 1.1rem;
  }
}
</style>
