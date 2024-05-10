<template>
<q-card class="custom-card" flat bordered :style="{ backgroundColor: colors }">
  <header class="custom-card__header">
    <span>{{ $t('pages.bible.card.author') }}: {{ author }}</span>
  </header>

  <aside class="custom-card__aside">
    <span class="custom-card__aside--name ellipsis">{{ nameBook }}</span>
    <span>{{ $t('pages.bible.card.chapters') }}: {{ chaptersBook }}</span>
  </aside>

  <footer class="custom-card__footer">
    <span class="custom-card__footer--group ellipsis">{{ $t('pages.bible.card.group') }}: {{ group }}</span>
    <q-btn
      flat
      class="custom-card__footer--btn"
      :label="$t('pages.bible.card.button')"
      @click="moreDetail"
    />
  </footer>
</q-card>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { Book } from '../models.inteface'
import { useRouter } from 'vue-router'
import { generateColdColor, generateLightColor } from '../../../services/utils'

interface Props {
  Book: Book
}

defineOptions({
  name: 'CustomCard'
})

const $router = useRouter()

const props = defineProps<Props>()

const nameBook = props.Book.name
const chaptersBook = props.Book.chapters
const author = props.Book.author
const group = props.Book.group
const colors = ref<string[]>([])

const moreDetail = () => {
  const abbrev = props.Book.abbrev.en
  const goToPageDetail = $router.push({ name: 'detail-book', params: { abbrev } })

  return goToPageDetail
}

onMounted(() => {
  for (let i = 0; i < 3; i++) {
    colors.value.push(generateColdColor())
    colors.value.push(generateLightColor())
  }
})
</script>

<style lang="scss" scoped>
.custom-card {
  margin: 10px 5px 10px 5px;
  border: 1px solid #DDDBDB;
  border-radius: 12px;
  height: 220px;
  width: 275px;
  max-width: 275px;
  max-height: 220px;

  &__header {
    height: 20%;
    padding: 10px;
  }

  &__aside {
    height: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    line-height: 1.3;

    &--name {
      text-align: center;
      width: 85%;
      color: #181616;
      font-weight: 450;
      font-size: 1.6rem;
    }
  }

  &__footer {
    height: 30%;
    display: flex;
    flex-direction: row;
    padding: 0 5px 0 5px;
    justify-content: space-between;
    align-items: center;

    &--group {
      align-self: flex-end;
      margin-bottom: 12px;
      margin-left: 5px;
      font-weight: 450;
      width: 150px;
    }

    &--btn {
      border: 1px solid #929292;
      align-self: flex-end;
      margin-bottom: 8px;
      font-size: .8rem;
      border-radius: 20px;
      background: #fff;
    }
  }
}

.ellipsis {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

@media only screen and (max-width: 499px) {
  .custom-card {
    margin: 5px 0 5px 0;
    max-width: 100%;
    height: 160px;
    width: 100%;
  }
}
</style>
