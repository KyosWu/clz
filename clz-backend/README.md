# 后端界面层说明

## api使用情况
``` bash
#### views
>index.vue
/admin/login

####store
>store-modules/systemInfo
/system/system

####components
>admin-Comment
/comment/config/list
/comment/config
/comment/commentsList
/comment/delComment
/comment/config/list

>admin-Tag
/article/getAllTags

>admin-Version
/version/insert

>article-ModelSequelize
/article/insert${this.radio}
/articleimg/upload
/articleimg/getToken

>article-ArticleList
/articleList/frontList
/articleList/backList
/delArticle/delArticle

>article-Update
/update/update
/articleimg/upload
/article/deleteFile
/article/findOneArticle
/article/insert${this.collections.radio}
/articleimg/getToken
/articleimg/upload

>permission-adminAdd-index
/admin/add
>permission-adminList-Edit
/admin/update
>permission-adminList-index
/admin/list
```


## 环境依赖及要求

见package.json

## 技术栈

>Vue + Vue-Router + Vue-cli + Vuex
>Axios + Socket 
>Scss + Less + Iview + element

## 构建与运行
``` bash
# 安装依赖
$ npm install # Or yarn install

# server with hot reload at localhost:8082
$ npm run dev

# 构建与打包
$ npm run build
$ npm run start

```
