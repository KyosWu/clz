<template>
<div>
  <div style="margin-top: 20px">
    <el-button @click="toggleSelection(tableData)">全选</el-button>
    <el-button @click="toggleSelection()">取消选择</el-button>
    <el-button type="danger" plain @click="deleteTableData" size="small " icon="el-icon-delete">删除</el-button>
    <el-button type="primary" plain @click="addow" size="small " icon="el-icon-circle-plus-outline"
               style="margin: 10px 0 10px;">添加一行
    </el-button>
    <el-button type="success" plain @click="saveData(tableData)" size="small " icon="el-icon-document-checked">保存
    </el-button>
  </div>
  <el-table
    ref="multipleTable"
    :data="tableData"
    tooltip-effect="dark"
    style="width: 100%"
    stripe
    fit
    highlight-current-row
    :indent="2"
    :lazy="true"
    :default-sort="{prop:'total',order:'descending'}"
    @selection-change="handleSelectionChange">

    <el-table-column
      type="selection"
      width="55">
    </el-table-column>

    <el-table-column
      prop="date"
      sortable
      align="left"
      label="创建时间"
      width="120">
      <template slot-scope="scope">
        {{scope.row.date}}
      </template>
    </el-table-column>
    <el-table-column
      prop="tag"
      label="标签"
      align="center"
      width="150">
      <template slot-scope="scope">
        <el-input v-show="doubleclick=== scope.$index" v-model="scope.row.tag"
                        align="center" type="text" size="mini" style="width: 60%;">
        </el-input>
        <span v-show="doubleclick !== scope.$index">{{ scope.row.tag }}</span>
      </template>
    </el-table-column>
    <el-table-column
      sortable
      align="center"
      prop="total"
      label="关联文章总计"
      width="150">
      <!--<template slot-scope="scope">{{ scope.row.total }}</template>-->
    </el-table-column>

    <el-table-column label="操作" align="center">
      <template slot-scope="scope">
        <!--保存-->
        <el-button
          v-show="doubleclick === scope.$index"
          size="mini"
          @click="editSave(scope.$index, scope.row)">保存</el-button>
        <!--编辑-->
        <el-button
          v-show="doubleclick !== scope.$index"
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <!--取消-->
        <el-button
          v-show="doubleclick === scope.$index"
          size="mini"
          @click="editCancel(scope.$index, scope.row)">取消</el-button>
        <!--删除-->
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</div>
</template>

<script>
import {Message} from 'element-ui'
export default {
  data () {
    return {
      doubleclick: null, // 记录当前编辑行序号
      deleteTable: [], // 记录所有标记删除的数据
      deleteList: [], // 记录本次批量删除的数据
      tableData: [{
        date: '2016-05-03',
        tag: '王小虎',
        total: '10'
      }, {
        date: '2016-05-02',
        tag: '李四',
        total: '13'
      }],
      multipleSelection: []
    }
  },
  methods: {
    // 选中table行的数据,触发赋值
    handleSelectionChange (val) {
      this.multipleSelection = val
      this.deleteList = val
    },
    // 取消全选
    toggleSelection (rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    // 表格内-保存
    editSave (index, row) {
      if (row.tag.length < 1) {
        Message.warning('喂喂喂！没数据呢！！！')
      }
      if (row.tag) {
        console.log(row.tag)
        // this.$axios.post('').then(
        //   this.doubleclick = null
        // )
      }
    },
    // 表格内-编辑
    handleEdit (index, row) {
      this.doubleclick = index
    },
    // 表格内-编辑取消
    editCancel () {
      this.doubleclick = null
      // 取消会写入tag 处理方法 重新向后端调用数据
      // 调用请求数据接口
    },
    // 表格内-删除
    handleDelete (index, row) {
      this.tableData.splice(index, 1)
      this.lineFun()
    },

    // 删除完成后需要重新计算行的索引字段line
    lineFun: function () {
      for (var i = 0; i < this.tableData.length; i++) {
        this.tableData[i].line = i + 1
      }
    },
    // 表格外的删除按钮[删除多条数据]
    deleteTableData: function () {
      if (this.deleteList.length === 0) {
        Message.warning({
          message: '请选择要删除的行',
          showClose: true
        })
      } else {
        let deleteList = this.deleteList
        let tableData = this.tableData
        let deleteTable = this.deleteTable
        this.$confirm('确定要删除选中行数据吗?', '批量删除', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(
          function () {
            for (let i in deleteList) {
              for (let j in tableData) {
                if (deleteList[i].line === tableData[j].line) {
                  // 需要向后端发送axios请求
                  deleteTable.push(tableData[j])
                  tableData.splice(j, 1)
                }
              }
            }
            this.lineFun() // 重新计算行索引
          }
        ).catch(function (e) { console.log(e.message) })
        if (tableData) {
          this.tableData = tableData
          this.deleteTable = deleteTable
        }
      }
    },
    // 表格外-全部保存数据
    saveData (tableData) {
      if (this.multipleSelection.length < 1) {
        Message.warning('没料哦！')
      }
      if (this.multipleSelection) {
        // this.$axios.post().then()
      }
    },
    // 表格外-添加一行
    addow: function () {
      let data = {
        line: this.tableData.length + 1,
        date: null,
        tag: null,
        total: null
      }
      this.tableData.push(data)
      this.doubleclick = this.tableData.length
    }
    // 当前日期格式化
    /*dateFormat (row, column, cellValue, index) {
      const daterc = row[column.property]
      if (daterc != null) {
        const dateMat = new Date()
        const year = dateMat.getFullYear()
        const month = dateMat.getMonth() + 1
        const day = dateMat.getDate()
        return year + '/' + month + '/' + day + ' '
      }
    },*/
  }
}
</script>
