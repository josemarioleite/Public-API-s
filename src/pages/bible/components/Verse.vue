<template>
<div :class="['verse', { 'highlighted': isHighlighted }]" @click="toggleHighlight">
  <span class="text-bold">{{ numberVerse }}</span>
  <span>{{ Verse }}</span>
</div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

interface Props {
  Number: number
  Verse: string
}

const props = defineProps<Props>()

const numberVerse = ref(props.Number.toString())
const isHighlighted = ref(false)
const toggleHighlight = () => {
  isHighlighted.value = !isHighlighted.value
}
</script>

<style lang="scss" scoped>
.verse {
  cursor: pointer;
  display: flex;
  flex-direction: row;
  gap: 10px;
  text-align: justify;
  width: 100%;
  font-size: 1.3rem;
  border-bottom: 1px solid #ccc;
}


.highlighted {
  width: 100%;
  padding: 10px;
  margin: 5px;
  color: #fff;
  border-radius: 10px;
  background-color: rgb(78, 78, 77);
}

@media only screen and (max-width: 499px) {
  .verse {
    font-size: 1rem;
  }
}
</style>
