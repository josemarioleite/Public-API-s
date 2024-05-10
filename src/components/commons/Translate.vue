<template>
<q-select
  v-model="$i18n.locale"
  borderless
  dark
  color="white"
  bg-color="dark"
  option-label="name"
  option-value="value"
  @update:model-value="changeLocalLanguage"
  :item-aligned="false"
  :options="options"
>
  <template v-slot:prepend>
    <q-icon name="flag" color="white" />
  </template>
</q-select>
</template>

<script lang="ts">
import { useI18n } from 'vue-i18n'

interface Options {
  name: string
  value: string
}

export default {
  name: 'Translate',
  data: () => ({
    idiomaSelecionado: useI18n().locale.value
  }),
  computed: {
    options () {
      const languages: Array<Options> = [
        { name: 'português (Brasil)', value: 'pt-BR' },
        { name: 'inglês (USA)', value: 'en-US' }
      ]

      return languages
    }
  },
  methods: {
    changeLocalLanguage (language: Options) {
      window.location.reload()
      this.$i18n.locale = language.value
      this.verifyLanguageSelected(language)
    },
    verifyLanguageSelected (language: Options) {
      const nameStore = 'local-language'
      const valueStore = localStorage.getItem(nameStore) || null

      if (valueStore) {
        localStorage.removeItem(nameStore)
      }

      localStorage.setItem(nameStore, language.value)
    }
  }
}
</script>
