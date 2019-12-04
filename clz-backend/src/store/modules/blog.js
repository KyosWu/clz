import { blogTypes } from './classify'

const music = {
	state: {
		blogTypes,
		list: [],
		total: 0
	},
	mutations: {
		BLOGLIST (state, data) {
			state.list = data.data;
			state.total = data.data.length;
		}
	},
	actions: {
		addBlog ({commit}, info) {
			return new Promise( (resolve, reject) => {
				this.$http.post('/admin/blog/add', info)
					.then( res => {
						resolve(res)
					}).catch( err => {
						reject(err)
					})
			})
		},
    // 请求博客文章列表
		getBlogList ({commit}, params) {
      return new Promise( (resolve, reject) => {
        this.$http.get('/admin/blog/list', params)
          .then( res => {
            commit('BLOGLIST', res.data)
            resolve(res)
          }).catch( err => {
          reject(err)
        })
      })
    },
		delBlog ({commit}, id) {
			return new Promise( (resolve, reject) => {
        this.$http.get('/admin/blog/del', {id: id})
					.then( res => {
						resolve(res)
					}).catch( err => {
						reject(err)
					})
			})
		},
		updateBlog ({commit}, info) {
			return new Promise( (resolve, reject) => {
        this.$http.post('/admin/blog/update', info)
					.then( res => {
						resolve(res)
					}).catch( err => {
						reject(err)
					})
			})
		}
	}
}
export default music
