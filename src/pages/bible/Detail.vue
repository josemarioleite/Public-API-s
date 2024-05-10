<template>
<div class="detail">
  <div class="detail__header">
    <q-icon @click="backPage" name="arrow_back" class="detail__header--icon" />
    <q-select
      v-model="versionSelected"
      outlined
      class="detail__header--version"
      option-label="name"
      option-value="abbrev"
      :label="$t('pages.bible.card.version')"
      :options="versions"
      @update:model-value="setVersionDefault"
    />
  </div>

  <template v-if="isLoading">
    <q-skeleton height="100px" width="100%" style="border-radius: 15px;" />
  </template>

  <template v-else>
    <header class="detail__header row justify-between" style="gap: 30px">
      <Describe :Title="$t('pages.bible.card.author')" :Content="author" />
      <Describe :Title="$t('pages.bible.header.selectTestament.title')" :Content="testament" />
    <Describe :Title="$t('pages.bible.card.group')" :Content="group" />

    <q-btn
      v-if="comment"
      color="primary"
      icon="question_mark"
      class="detail__header--btn"
      :label="$t('pages.bible.card.comment')"
      :loading="isLoading"
      @click="seeDetail"
      />
    </header>

    <aside class="detail__aside">
      <q-intersection
        v-for="number in chapters"
        :key="number"
        transition="scale"
        class="detail__aside--intersection"
      >
        <Chapter :Chapter="number" @click="focusVerse" />
      </q-intersection>
    </aside>
  </template>

  <div v-show="!isLoading">
    <template v-if="isLoadingVerses">
      <q-skeleton height="100px" width="100%" style="border-radius: 15px; margin-top: 50px;" />
    </template>
    <template v-else>
      <div style="margin-top: 50px;" ref="verseRef">
        <template v-for="verse in versesChapter" :key="verse">
          <Verse class="q-pa-xs" :Number="verse.number" :Verse="verse.text" />
        </template>
      </div>
    </template>
  </div>
</div>
</template>

<script>
import { defineComponent } from 'vue'
import { useAppStore } from '../../stores/app.store'
import { useBibleStore } from '../../stores/bible.store'
import Describe from './components/Describe.vue'
import Chapter from './components/Chapter.vue'
import Verse from './components/Verse.vue'

export default defineComponent({
  name: 'Detail-Book',
  components: {Describe, Chapter, Verse},
  data: () => ({
    versionSelected: null
  }),
  setup () {
    const bibleStore = useBibleStore()

    return { bibleStore }
  },
  computed: {
    versions () {
      const data = this.bibleStore.versionsBible.map(v => {
        return {
          abbrev: v.abbrev,
          name: v.abbrev + (' - ') + v.name
        }
      })

      return data
    },
    versesChapter () {
      return this.bibleStore.verses
    },
    bookStore () {
      return this.bibleStore.book
    },
    author () {
      return this.bookStore.author
    },
    testament () {
      return this.defineTestament()
    },
    group () {
      return this.bookStore.group
    },
    comment () {
      const hasComment = this.bookStore.comment

      if (hasComment && hasComment.length > 0) {
        return hasComment
      }

      return null
    },
    chapters () {
      return this.bookStore.chapters
    },
    isLoading () {
      return this.bibleStore.isLoading
    },
    isLoadingVerses () {
      return this.bibleStore.isLoadingVerses
    }
  },
  methods: {
    async setVersionDefault (version) {
      this.bibleStore.setVersionDefault(version.abbrev)
      await this.bibleStore.loadVersionsBible()
    },
    backPage () {
      return this.$router.back()
    },
    seeDetail () {
      this.$q.dialog({
        message: this.comment
      })
    },
    defineTestament () {
      const testaments = {
        'NT': this.$t('pages.bible.header.selectTestament.newTestament'),
        'VT': this.$t('pages.bible.header.selectTestament.oldTestament')
      }

      return testaments[this.bookStore.testament]
    },
    focusVerse () {
      if (this.$refs.verseRef && !this.isLoading) {
        this.$refs.verseRef.scrollIntoView({ behavior: 'smooth' })
      }
    }
  },
  async mounted () {
    await this.bibleStore.loadVersionsBible()
    await this.bibleStore.loadBookByAbbrev(this.$route.params.abbrev)
    this.versionSelected = this.versions.find(v => v.abbrev === 'acf')

    const appStore = useAppStore()
    appStore.setPage(this.bookStore.name)
  }
})
</script>

<style lang="scss" scoped>
.detail {
  padding: 10px 20px 10px 20px;

  &__header {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;

    &--icon {
      background: $dark;
      border-radius: 50%;
      color: #fff;
      font-size: 2rem;
      margin-bottom: 20px;
      margin-top: 20px;
    }

    &--icon:hover {
      cursor: pointer;
      background: #000;
    }
  }

  &__aside {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    gap: 15px;
    margin-top: 50px;
    width: 100%;

    &--intersection {
      height: 80px;
      width: 65px;
    }
  }
}

@media only screen and (max-width: 499px) {
  .detail {
    &--icon {
      margin-top: 0;
      position: absolute;
      right: 30px;
    }

    &__aside {
      &--intersection {
        height: 50px;
        width: 50px;
      }
    }

    &__header {
      &--btn {
        width: 100%;
      }
    }
  }
}
</style>
