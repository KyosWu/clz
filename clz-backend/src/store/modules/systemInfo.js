/* 系统概览 */

// 注main中axios vuex无效,暂时这么处理
import axios from 'axios'
const prefix = '/api'

const systemInfo = {
  state: {
    constants: null,
    release: null,
    platform: null,
    hostname: null,
    type: null,
    freemem: null,
    totalmem: null,
    percentage: null,
    cpu: [],
    // cpu提示信息类型
    cpuInfoType: [
      {
        title: 'CPU内核模型',
        key: 'model'
      },
      {
        title: 'CPU频率(GHz)',
        key: 'speed'
      },
      {
        title: 'CPU执行模式[毫秒]( user:用户 | nice:良好 | sys:系统 | idle:空闲 | irq:中断 )',
        key: 'times'
      }
    ]
  },
  getters: {
    constants: state => state.constants,
    release: state => state.release,
    platform: state => state.platform,
    hostname: state => state.hostname,
    type: state => state.type,
    freemem: state => state.freemem,
    totalmem: state => state.totalmem,
    percentage: state => state.percentage,
    cpu: state => state.cpu,
    // cpu提示信息类型
    cpuInfoType: state => state.cpuInfoType
  },
  mutations: {
    GET_SYSTEMINFO (state, res) {
      state.constants = res.constants
      state.release = res.release
      state.platform = res.platform
      state.hostname = res.hostname
      state.type = res.type
      state.freemem = res.freemem
      state.totalmem = res.totalmem
      state.percentage = res.percentage
      state.cpu = res.cpu
    }
  },
  actions: {
    async getSystemInfo ({commit}) {
      const res = await axios.post(`${prefix}/system/system`)
      try {
        if (res) {
          commit('GET_SYSTEMINFO', res.data)
        } else {
          throw new Error(res.type)
        }
      } catch (err) {
        console.log(err)
      }
    }
  }
}

export default systemInfo
