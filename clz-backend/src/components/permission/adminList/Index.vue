<template>
  <article>
    <div class="search">
        <el-input placeholder="请输入内容"
                  prefix-icon="el-icon-search"
                  v-model="keyword"
                  clearable
                  @keydown.enter.native="searchUser"
                  @blur="searchUser">
        </el-input>
        <el-button type="primary" icon="el-icon-search" :loading="loading" @click="searchUser">搜索</el-button>
    </div>

    <el-table ref="multipleTable" :data="userList" tooltip-effect="dark" stripe border>
        <el-table-column
                type="index"
                width="55"
                align="center"
                header-align="center"
                :index="increment">
        </el-table-column>

        <el-table-column
                show-overflow-tooltip v-if="!item.hidden"
                v-for="(item, index) in headerOptions"
                :key="index"
                :label="item.label"
                :prop="item.prop"
                :header-align="item.headerAlign"
                :align="item.align"
                :min-width="item.minWidth || 150">
          <template slot-scope="scope">
                <div v-if="scope.column.property === 'roles'">
                    <el-tag
                          class="tag"
                          type="primary"
                          close-transition
                          v-for="(tagArticle, index) in scope.row.roles"
                          :key="index">{{tagArticle}}
                    </el-tag>
                </div>
                <div v-else-if="scope.column.property === 'avatar'">
                  <img :src="scope.row[scope.column.property]" alt="" style="height: 40px;">
                </div>
                <div v-else>{{scope.row[scope.column.property] || '无'}}</div>
            </template>
        </el-table-column>

        <el-table-column label="操作" header-align="center" align="center" width="250">
            <template slot-scope="scope">
              <el-button size="mini" @click="edit(scope)">编辑</el-button>
              <el-button size="mini" type="danger" @click="del(scope, scope.$index, scope.row._id)">删除</el-button>
            </template>
        </el-table-column>
    </el-table>
    <el-pagination
          class="pagination"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageindex"
          :page-sizes="size_scoped"
          :page-size="pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="userTotal">
    </el-pagination>
    <EditComponent v-if="editShow" :info="userInfo" @close="close"></EditComponent>

</article>
</template>
<script>
// import { mapGetters } from 'vuex'
import EditComponent from './Edit'
export default {
  components: {
    EditComponent
  },
  data () {
    return {
      keyword: '',
      editShow: false,
      userInfo: {},
      loading: false,
      pageindex: 1,
      pagesize: 10,
      size_scoped: [10, 20, 30, 40],
      headerOptions: [
        {
          label: 'id',
          prop: '_id',
          hidden: true,
          headerAlign: 'center',
          align: 'center',
          width: ''
        },
        {
          label: '用户名',
          prop: 'username',
          hidden: false,
          headerAlign: 'center',
          align: 'center',
          width: ''
        },
        {
          label: '姓名',
          prop: 'name',
          hidden: false,
          headerAlign: 'center',
          align: 'center',
          width: '',
          sort: true
        },
        {
          label: '权限',
          prop: 'roles',
          hidden: false,
          headerAlign: 'center',
          align: 'center',
          width: '',
          sort: true
        }
      ],
      multipleSelection: [],
      userList: [],
      userTotal: 0
    }
  },
  mounted () {
    this.getUserList()
  },
  methods: {
    increment (index) {
      return index + 1 + ((this.pageindex - 1) * this.pagesize)
    },
    close () {
      this.editShow = false
      this.getUserList()
    },
    handleSizeChange (val) {
      // console.logs(`每页 ${val} 条`);
      this.pagesize = val
      this.getUserList()
    },
    handleCurrentChange (val) {
      // console.logs(`当前页: ${val}`);
      this.pageindex = val
      this.getUserList()
    },
    // 搜索用户
    async searchUser (keyword) {
      this.loading = true
      await this.getUserList().then(
        this.loading = false
      )
    },
    async getUserList () {
      this.loading = true
      const data = {
        keyword: this.keyword,
        pageindex: this.pageindex,
        pagesize: this.pagesize
      }
      await this.$axios.post('/admin/list', {params: data}).then((res) => {
        // 用户数据
        this.userList = res.data.data
        console.log(this.userList)
        // 用户数目统计
        this.userTotal = res.data.total
      })
    },
    del (scope, index, id) {
      this.$axios.post('/admin/del', {params: {id: id}}).then((res) => {
        this.userList.splice(index, 1)
      })
    },
    edit (scope) {
      this.editShow = true
      scope.row.releaseTime = new Date(scope.row.releaseTime)
      this.userInfo = scope.row
    },
    filterTag (value, row) {
      return row.type.some(v => v === value)
    }
  }
}
</script>

<style lang="less" scoped>
    article {
        padding: 20px;
        .search {
            padding-bottom: 20px;
            .el-input {
                width: 300px;
            }
        }
        .pagination {
            text-align: right;
            padding: 20px 0;
        }
        .tag {
            margin: 0 10px;
        }
    }
</style>
