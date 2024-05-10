import { defineStore } from 'pinia'
import { BibleClient } from '../http/bible.http'
import { Book } from 'src/pages/bible/models.inteface'

const bibleClient = new BibleClient()

export const useBibleStore = defineStore('biblestore', {
  state: () => ({
    isLoading: false,
    isLoadingVerses: false,
    verses: [],
    book: {},
    versionDefault: 'acf',
    versionsBible: [],
    booksGroups: [],
    booksStore: []
  }),
  actions: {
    async loadBooks () {
      this.changeLoading(true)

      const data = await bibleClient._get()
      this.booksGroups = Array.from(new Set(data.map((book: Book) => book.group)))
      this.booksStore = data

      this.changeLoading(false)
    },
    async loadBookByAbbrev (abbrev: string) {
      this.changeLoading(true)

      this.verses = []
      const data = await bibleClient._getByAbbrev(abbrev)
      this.book = data

      this.changeLoading(false)
    },
    async loadVersesByAbbrev (abbrev: string, chapter: number) {
      this.isLoadingVerses = true

      this.verses = []
      const data = await bibleClient._getByVerseByAbbrev(this.versionDefault, abbrev, chapter)
      this.verses = data.verses.map(v => {
        return {
          number: v.number,
          text: v.text
        }
      })

      this.isLoadingVerses = false
    },
    async loadVersionsBible () {
      this.changeLoading(true)

      const data = await bibleClient._getVersionsBible()
      this.versionsBible = data

      this.changeLoading(false)
    },
    async setGroup (group: string) {
      this.changeLoading(true)
      if (group.length > 0) {
        this.booksStore = []
        const data = await bibleClient._get()
        this.booksStore = data.filter((book: Book) => book.group === group)
        return this.changeLoading(false)
      }

      this.changeLoading(false)
      return await this.loadBooks()
    },
    async setTestament ({ value }) {
      this.changeLoading(true)
      if (value && value.length > 0) {
        this.booksStore = []
        const data = await bibleClient._get()
        this.booksStore = data.filter((book: Book) => book.testament === value)
        return this.changeLoading(false)
      }

      this.changeLoading(false)
      return await this.loadBooks()
    },
    setVersionDefault (version: string) {
      this.verses = []
      this.versionDefault = version
    },
    changeLoading (state: boolean) {
      this.isLoading = state
    }
  }
})
