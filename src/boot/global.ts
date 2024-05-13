import 'vue-cal/dist/vuecal.css'
import { boot } from 'quasar/wrappers'
import CustomDate from '../components/commons/CustomDate.vue'

export default boot(({ app }) => {
  app.component('c-date', CustomDate)
})
