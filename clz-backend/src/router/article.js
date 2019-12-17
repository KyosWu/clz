const art = () => import('../components/article/Article')
const update = () => import('../components/article/Update.vue')
const list = () => import('../components/article/ArticleList.vue')

const article = {
  art,
  update,
  list
}

export default article
