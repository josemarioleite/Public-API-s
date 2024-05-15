import { RouteRecordRaw } from 'vue-router'
import { Home, Bible, DetailBook, Holiday, Colors } from 'src/pages/index'

const routes: RouteRecordRaw[] = [
  {
    path: '/home',
    name: 'home',
    component: Home
  },
  {
    path: '/',
    name: 'holy-bible',
    component: Bible
  },
  {
    path: '/holy-bible/detail/:abbrev',
    name: 'detail-book',
    component: DetailBook
  },
  {
    path: '/holiday',
    name: 'holiday',
    component: Holiday
  },
  {
    path: '/colors',
    name: 'colors',
    component: Colors
  }
]

export default routes
