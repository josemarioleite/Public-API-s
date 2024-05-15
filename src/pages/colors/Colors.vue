<template>
<div class="colors">
  <template v-if="isLoading">
    <q-skeleton animation="wave" class="colors__skeleton">
      <q-inner-loading
        :label="$t('pages.holiday.loading')"
        label-class="text-blue"
        label-style="font-size: 1.5rem"
      />
    </q-skeleton>
  </template>
  <template v-else>
    <div class="colors__input">
      <q-color @update:model-value="onChangeValue" v-model="rbgColor" inline style="width: 275px;" />
    </div>
    <div class="colors__generated">
      <ColorComp :VCustom="colorGenerated1" />
      <ColorComp :VCustom="colorGenerated2" />
      <ColorComp :VCustom="colorGenerated3" />
      <ColorComp :VCustom="colorGenerated4" />
      <ColorComp :VCustom="colorGenerated5" />
    </div>
  </template>
</div>
</template>

<script lang="ts" setup>
import { useAppStore } from '../../stores/app.store'
import { useColorStore } from '../../stores/color.store'
import { onMounted, computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { extractValuesRGB } from '../../services/utils'
import ColorComp from './components/ColorComp.vue'

const appStore = useAppStore()
const colorStore = useColorStore()
const $t = useI18n().t

const rbgColor = ref<any>()
const isLoading = computed(() => colorStore.isLoading)
const defaultColorStore = computed(() => colorStore.defaultColor)
const colorGenerated1 = computed(() => colorStore.colorGenerated1)
const colorGenerated2 = computed(() => colorStore.colorGenerated2)
const colorGenerated3 = computed(() => colorStore.colorGenerated3)
const colorGenerated4 = computed(() => colorStore.colorGenerated4)
const colorGenerated5 = computed(() => colorStore.colorGenerated5)

const onChangeValue = async () => {
  setTimeout(async () => {
    await colorStore.setColor(true, extractValuesRGB(rbgColor.value))
  }, 500);
}


defineOptions({
  name: 'Colors',
  components: {ColorComp}
})

onMounted(async ()=> {
  appStore.setPage($t('pages.title.colors_generator'))

  await colorStore.setColor(false, null)

  rbgColor.value = defaultColorStore.value.rgb
})
</script>

<style lang="scss" scoped>
.colors {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 10px;

  &__skeleton {
    height: 90vh;
    width: 100%;
  }

  &__input {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-right: 10px;
    height: 100%;
    width: 100%;
    margin-bottom: 30px;
  }

  &__generated {
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-right: 20px;
    margin-bottom: 50px;
    padding: 10px;
    gap: 30px;
  }
}

@media only screen and (max-width: 499px) {
  .colors {
    height: 100%;
  }
}
</style>
