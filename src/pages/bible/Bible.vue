<template>
<div class="bible">
  <header class="bible__header">
    <span class="bible__header--total">Total: {{ totalBooks }}</span>
    <div class="bible__header__options">
      <q-select
        v-model="groupBibleSelected"
        outlined
        class="bible__header__options--group"
        :label="$t('pages.bible.header.selectGroup.title')"
        :options="booksGroups"
        @update:model-value="updateGroup"
      >
        <template v-if="groupBibleSelected" v-slot:append>
          <q-icon name="cancel" @click.stop.prevent="updateGroup('')" class="cursor-pointer" />
        </template>
      </q-select>

      <q-select
        v-model="testamentBibleSelected"
        outlined
        class="bible__header__options--testament"
        option-label="name"
        option-value="value"
        :label="$t('pages.bible.header.selectTestament.title')"
        :options="optionsTestament"
        @update:model-value="updateTestament"
      >
        <template v-if="testamentBibleSelected" v-slot:append>
          <q-icon @click.stop.prevent="updateTestament('')" name="cancel" class="cursor-pointer" />
        </template>
      </q-select>
    </div>
  </header>

  <aside class="bible__aside">
    <q-intersection
      v-for="(item, index) in booksBible"
      :key="index"
      transition="scale"
      class="bible__aside--intersection"
    >
      <q-skeleton v-if="isLoadingData" height="250px" width="380px" />
      <CustomCard v-else :Book="item" />
    </q-intersection>
  </aside>
</div>
</template>

<script lang="ts" setup>
import { onMounted, computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useAppStore, useBibleStore } from '../../stores/exports'
import CustomCard from './components/CustomCard.vue'

defineOptions({
  name: 'Bible',
  components: { CustomCard }
})

const $t = useI18n().t

const appStore = useAppStore()
const bibleStore = useBibleStore()

const groupBibleSelected = ref('')
let testamentBibleSelected: object | null = null
const isLoadingData = computed(() => bibleStore.isLoading)
const booksGroups = computed(() => bibleStore.booksGroups)
const booksBible = computed(() => bibleStore.booksStore)
const totalBooks = computed(() => booksBible.value.length)
const titlePage = computed(() => $t('pages.title.bible'))
const optionsTestament = computed(() => {
  return [
    { name: $t('pages.bible.header.selectTestament.oldTestament'), value: 'VT' },
    { name: $t('pages.bible.header.selectTestament.newTestament'), value: 'NT' }
  ]
})

const updateGroup = (group: string = '') => {
  testamentBibleSelected = null
  groupBibleSelected.value = group
  return bibleStore.setGroup(group)
}

const updateTestament = (testament: any = '') => {
  groupBibleSelected.value = ''
  testamentBibleSelected = testament
  return bibleStore.setTestament(testament)
}

onMounted(async () => {
  appStore.setPage(titlePage.value)
  await bibleStore.loadBooks()
})
</script>

<style lang="scss" scoped>
.bible {
  padding: 5px;

  &__header {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 100%;
    padding: 20px 15px 20px 15px;

    &__options {
      display: flex;
      flex-direction: row;
      gap: 15px;

      &--total {
        font-size: 1.2rem;
        align-self: flex-end;
      }

      &--search {
        width: 20vw;
      }

      &--group {
        width: 20vw;
      }

      &--testament {
        width: 15vw;
      }
    }
  }

  &__aside {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: flex-start;
    height: 100%;
    width: 100%;

    &--intersection {
      height: 230px;
      width: 290px;
    }
  }
}

@media only screen and (max-width: 499px) {
.bible {
  display: flex;
  flex-direction: column;

  &__header {
    padding: 20px 10px 20px 10px;

    &--total {
      font-size: 1rem;
      text-align: center;
      width: 100%;
      margin-bottom: 10px;
    }

    &__options {
      flex-direction: column;
      width: 100%;

      &--search, &--group, &--total, &--testament {
        width: 100%;
      }
    }
  }

  &__aside {
    padding: 0 10px 0 10px;

    &--intersection {
      height: 170px;
      width: 100%;
    }
  }
}
}
</style>
