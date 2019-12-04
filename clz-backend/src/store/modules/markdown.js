const markdown = {
    state: {

    },
    mutations: {

    },
    actions: {
        markdown_upload_img ({commit}, formData) {
            return new Promise( (resolve, reject) => {
                this.$http.post('markdown_upload_img', formData)
                    .then( res => {
                        resolve(res)
                    }).catch( err => {
                        reject(err)
                    })
            })
        }
    }
};
export default markdown
