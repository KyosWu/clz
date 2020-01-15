const qiniu = require('qiniu');
// const axios = require('axios')
const fs = require('fs')
// const formidable = require('formidable')



// 测试用例 一个封装的七牛云类
// class QiniuManager {
//     constructor(accessKey, secretKey, bucket) {
//         // generic mac
//         this.mac = new qiniu.auth.digest.Mac(accessKey, secretKey)
//         this.bucket = bucket
//
//         // init config class
//         this.config = new qiniu.connf.Config()
//         // 空间对应的数据
//         this.config.zone = qiniu.zone.Zonne_z0
//
//         this.bucketManager = new qiniu.rs.BucketManager(this.mac, this.config)
//     }
//
//      // 文件上传
//     uploadFile (key, localFilePath) {
//         // generate uploadToken
//         let options = {
//             scope: this.bucket + ":" + key,  // 对应七牛云存储空间名称
//         };
//         let putPolicy = new qiniu.rs.PutPolicy(options)
//         let uploadToken = putPolicy.uploadToken(this.mac)
//         let formUploader = new qiniu.form_up.FormUploader(this.config)
//         let putExtra = new qiniu.form_up.PutExtra()
//
//         return new Promise((resolve, reject) => {
//             formUploader.putFile(uploadToken, key, localFile, putExtra, this._handleCallback(resolve, reject))
//         })
//
//     }
//
//     // 文件删除
//     deleteFile (key) {
//         return new Promise((resolve, reject) => {
//             this.bucketManager.delete(this.bucket, key, this._handleCallback(resolve, reject))
//         })
//     }
//     // 返回七牛云申请的bucket domain
//     getBucketDomain () {
//         const reqURL = `http://api.qiniu.com/v0/domain/list?tbl=${this.bucket}`
//         const digest = qiniu.util.generateAccessToken(this.mac, reqURL)
//         return new Promise((resolve, reject) => {
//             qiniu.rpc.postWithForm(reqURL, digest, this._handleCallback(resolve, reject))
//         })
//     }
//     // 生成下载拦截
//     generateDownloadLink (key) {
//         const domainPromise = this.publicBucketDomain ?
//             Promise.resolve(this.publicBucketDomain) : this.getBucketDomain()
//         return domainPromise.then(data => {
//             if (Array.isArray(data) && data.length > 0){
//                 const pattern = /^https?/
//                 this.publicBucketDomain = pattern.test(data[0]) ? data[0] : `http://${data[0]}`
//                 return this.bucketManager.publicDownloadUrl(this.publicBucketDomain, key)
//             } else {
//                 throw Error('域名未找到，查看存储空间是否已经过期')
//             }
//         })
//     }
//
//     downloadFile(key, downloadPath) {
//         return this.generateDownloadLink(key).then(link => {
//             const timeStamp = new Date().getTime()
//             const url = `${link}?timestamp=${timeStamp}`
//             return axios({
//                 url,
//                 method: 'GET',
//                 responseType: 'stream',
//                 headers: {'Cache-Control': 'no-cache'}
//             })
//         }).then(response => {
//             const writer = fs.createWriteStream(downloadPath)
//             response.data.pipe(writer)
//             return new Promise((resolve, reject) => {
//                 writer.on('finish', resolve)
//                 writer.on('error', reject)
//             })
//         }).catch(err => {
//             return Promise.reject({err: err.response})
//         })
//     }
//
//     _handleCallback (resolve, reject) {
//         return (respErr, respBody, respInfo) => {
//             if (respErr) {
//                 throw respErr
//             }
//             if (respInfo.statusCode === 200) {
//                 resolve(respBody)
//             } else {
//                 reject({
//                     statusCode: respInfo.statusCode,
//                     body: respBody
//                 })
//             }
//         }
//
//     }
// }


/**
 * private API
 * @method token
 * @param {object} 获取七牛云上传图片token
 * @return {token|null}  token
 */
class ArticleImg {
    // 获得七牛云p配置token
    async getToken (ctx) {
        // 七牛云的鉴权对象
        // 源码删除:七牛云获取 ak,必须配置
        let accessKey = 'lnba53EkzuAaEbtRHhO_aSF8Gwqe3H1yPm5u05mh'
        // 源码删除:七牛云获取 sk, 必须配置
        let secretKey = 'phi6LaT9CgfwJvqLlVse5PVN953ThfMdAMjA7GTW'
        let mac = new qiniu.auth.digest.Mac(accessKey, secretKey)

        // 通用上传token
        let options = {
            scope: 'blog',  // 对应七牛云存储空间名称
        };
        let putPolicy = new qiniu.rs.PutPolicy(options);
        let uploadToken = putPolicy.uploadToken(mac);

        // init config class
        // let config = new qiniu.conf.Config();
        // 空间对应的机房
        // config.zone = qiniu.zone.Zone_z0

        ctx.body = uploadToken
    }

    /**
     * private API
     * @method upload Images
     * @param {object} 七牛云上传图片
     * @return {object|null}  img hash filename
     */


    // 文章图片上传功能
    async articleImgUpload (ctx) {
        let form = formidable.IncomingForm();
        let {respErr, respBody, respInfo, filename} = await new Promise((resolve) => {
            form.parse(ctx.req, function (err, fields, file) {
                let localFile = file.file.path
                let config = new qiniu.conf.Config();
                let formUploader = new qiniu.form_up.FormUploader(config);
                let putExtra = new qiniu.form_up.PutExtra();
                let key= file.file.name;
                formUploader.putFile(fields.token, key, localFile, putExtra, function(respErr, respBody, respInfo) {
                    resolve({
                        respErr,
                        respBody,
                        respInfo,
                        filename: key
                    })
                })
            })
        })
        ctx.status = respInfo.statusCode
        ctx.body = {
            respErr,
            img: `http://cdn.kyosumwu.cn/${respBody.key}`,
            hash: respBody.hash,
            status: respInfo.statusCode,
            filename
        }
    }

    /**
     * private API
     * @method delete Images
     * @param {object} filename 接受文件名称
     * @return {object|null}  status result
     */

     // 删除文章图片
    async delArticleImg (ctx) {
        try {
            let bucket = "blog";    // 对应储存空间名称
            let request = ctx.request.body
            let accessKey = ''   // 源码删除:七牛云获取 ak,必须配置
            let secretKey = ''  // 源码删除:七牛云获取 sk,必须配置
            let mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
            let config = new qiniu.conf.Config();
            let bucketManager = new qiniu.rs.BucketManager(mac, config);
            let {error, respInfo} = await new Promise((resolve) => {
                bucketManager.delete(bucket, request.filename, function(err, respBody, respInfo) {
                    resolve({error: err,respBody, respInfo})
                });
            })
            ctx.body = {
                error,
                status: respInfo.statusCode,
                result: respInfo.data
            }
        } catch (error) {
            ctx.body = error
        }
    }
}

module.exports  = new ArticleImg();
