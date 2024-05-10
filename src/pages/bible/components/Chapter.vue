<template>
<div @click="getVerses" class="chapter" :style="{ backgroundColor: colors }">
  <span>{{ Chapter }}</span>
</div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { generateColdColor, generateLightColor } from '../../../services/utils'
import { useBibleStore } from '../../../stores/bible.store'
import { useRoute } from 'vue-router'

interface Props {
  Chapter: number
}

defineOptions({
  name: 'Chapter'
})

const $route = useRoute()
const props = defineProps<Props>()
const bibleStore = useBibleStore()
const colors = ref<string[]>([])

const getVerses = async () => {
  const abbrev = $route.params.abbrev as string
  const chapter = props.Chapter

  await bibleStore.loadVersesByAbbrev(abbrev, chapter)
}

onMounted(() => {
  for (let i = 0; i < 3; i++) {
    colors.value.push(generateColdColor())
    colors.value.push(generateLightColor())
  }
})
</script>

<style lang="scss" scoped>
.chapter {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 75px;
  width: 75px;
  border-radius: 15px;
  font-size: 1.3rem;
  border: 1px solid #6621c0;
}

.chapter:hover {
  border: 3px solid #F57979;
  color: #E23A3A;
  cursor: pointer;
}

@media only screen and (max-width: 499px) {
  .chapter {
    height: 50px;
    width: 50px;
    font-size: 1.5rem;
  }
}
</style>
