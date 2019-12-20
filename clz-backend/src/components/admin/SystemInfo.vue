<template>
  <div>
      <Row type="flex" justify="space-around">
            <Col span="9">
                <Card>
                    <p slot="title">服务器状态</p>
                    <div class="server_status">
                      <span>运行状态：</span>
                      <Tag type="dot" :color="Object.is(constants, '0') ? 'success' : 'error'">{{Object.is(constants, '0') ? '服务器运行中' : '服务器出现错误'}}</Tag>
                    </div>
                    <div class="server_status">
                        <span>服务器发行版本：</span>
                        <Tag checkable color="blue">{{release}}</Tag>
                    </div>
                    <div class="server_status">
                        <span>Node.js编译运行系统平台：</span>
                        <Tag color="#495060">{{platform}}</Tag>
                    </div>
                </Card>
            </Col>
            <Col span="11">
                <Card>
                    <p slot="title">服务器信息</p>
                    <a href="#" slot="extra" @click.prevent="changeInit">
                        <Icon type="ios-loop-strong"></Icon>
                        刷新
                    </a>
                    <Row type="flex" justify="space-between">
                        <Col span="12">
                            <div class="server_status">
                                <span>服务器主机名：</span>
                                <Tag color="#495060">{{hostname}}</Tag>
                            </div>
                            <div class="server_status">
                                <span>操作系统：</span>
                                <Tag color="#ff9900">{{type}}</Tag>
                            </div>
                            <div class="server_status">
                                <span>服务器总内存数：</span>
                                <Tag color="#19be6b">{{totalmem}}</Tag>
                            </div>
                            <div class="server_status">
                                <span>服务器可用内存数：</span>
                                <Tag color="#19be6b">{{freemem}}</Tag>
                            </div>
                        </Col>
                        <Col span="11">
                            <div>
                                <i-circle :percent="percentage" :size="200" :trail-width="4" :stroke-width="5" stroke-linecap="square" stroke-color="#43a3fb">
                                    <div class="demo-Circle-custom">
                                        <h1>内存使用率</h1>
                                        <p>综合服务器内存占比</p>
                                        <span>
                                            占用百分比
                                            <i>{{percentage}}%</i>
                                        </span>
                                    </div>
                                </i-circle>
                            </div>
                        </Col>
                    </Row>
                </Card>
            </Col>
      </Row>
      <Row type="flex" justify="space-around" style="margin-top:4rem;">
          <Col :span="22">
            <Card>
              <p slot="title">CPU信息</p>
              <div class="cpu_status">
                  <span>逻辑CPU内核信息：</span>
              </div>
              <Table border :columns="cpuInfoType" stripe :data="cpu"></Table>
            </Card>
          </Col>
      </Row>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters([
      // 获取cpu提示信息类型
      'constants',
      'release',
      'platform',
      'hostname',
      'type',
      'freemem',
      'totalmem',
      'percentage',
      'cpu',
      'cpuInfoType'
    ])
  },
  created () {
    this.init()
  },
  methods: {
    ...mapActions([
      'getSystemInfo'
    ]),
    init () {
      this.getSystemInfo()
    },
    changeInit () {
      this.init()
    }
  }
}
</script>

<style lang="less">
 @import '../../assets/css/admin/systemInfo.less';
</style>
