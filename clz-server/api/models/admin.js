const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')

// 盐
const SALT_WORK_FACTOR = 10
// 最大登录次数
const MAX_LOGIN_ATTEMPTS = 5
// 锁定登录时间
const LOCK_TIME = 2 * 60 * 60 * 1000

const { Schema, model } = mongoose;

const admin = new Schema({
    // admin admin superAdmin
    roles: [
        { user: 'user',type: String },
        { admin: 'admin',type: String }
    ],
    avatar: { type: String },
    username: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true, select: false ,unique: true},
    password: { type: String, required: true, select: false },
    pwd: { type: String, select: false },
    hashed_password: { type: String, select: false },
    // 登录尝试
    loginAttempts: {type: Number, required: true, default: 0, select: false },
    lockUntil: { type: Number, select: false },
    // 用户状态
    status: { type: Number, default: 1, select: false }
},{timestamps: {createdAt: 'created', updatedAt: 'updated'}});

// 虚拟字段，不会被保存到数据库当中
admin.virtual('isLocked').get(function () {
    return !!(this.lockUntil && this.lockUntil > Date.now())
})


// 加盐加密
admin.pre('save', function (next) {
    if (this.isNew) {
        this.meta.createdAt = this.meta.updatedAt = Date.now()
    } else {
        this.meta.updatedAt = Date.now()
    }
    next()
})

admin.pre('save', function (next) {
    let user = this

    if (!user.isModified('password')) return next()

    bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
        if (err) return next(err)

        bcrypt.hash(user.password, salt, (error, hash) => {
            if (error) return next(error)

            user.password = hash
            next()
        })
    })
})

admin.methods = {
    // 比较密码
    comparePassword: function (_password, password) {
        return new Promise((resolve, reject) => {
            bcrypt.compare(_password, password, function (err, isMatch) {
                if (!err) resolve(isMatch)
                else reject(err)
            })
        })
    },

    // 判断请求次数 是否锁账号
    incLoginAttempts: function (user) {
        const that = this

        return new Promise((resolve, reject) => {
            if (that.lockUntil && that.lockUntil < Date.now()) {
                that.update({
                    $set: {
                        loginAttempts: 1
                    },
                    $unset: {
                        lockUntil: 1
                    }
                }, function (err) {
                    if (!err) resolve(true)
                    else reject(err)
                })
            } else {
                let updates = {
                    $inc: {
                        loginAttempts: 1
                    }
                }

                if (that.loginAttempts + 1 >= MAX_LOGIN_ATTEMPTS && !that.isLocked) {
                    updates.$set = {
                        lockUntil: Date.now() + LOCK_TIME
                    }
                }

                that.update(updates, err => {
                    if (!err) resolve(true)
                    else reject(err)
                })
            }
        })
    }
}

module.exports = model('user', admin)
