<template>
  <div>
    <el-tag
      v-for="(tagArticle, index) in dynamicTags"
      :key="index"
      closable
      :disable-transitions="false"
      @close="handleClose(tag)">
      {{tagArticle}}
    </el-tag>
    <el-input
      class="input-new-tag"
      v-if="inputVisible"
      v-model="inputValue"
      ref="saveTagInput"
      size="small"
      @keyup.enter.native="handleInputConfirm"
      @blur="handleInputConfirm"
    >
    </el-input>
    <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
  </div>
</template>

<style>
  .el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
</style>

<script>
export default {
  data () {
    return {
      dynamicTags: [],
      inputVisible: false,
      inputValue: ''
    }
  },
  methods: {
    handleClose (tagArticle) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(), 1)
    },

    showInput () {
      this.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },

    handleInputConfirm () {
      let inputValue = this.inputValue
      if (inputValue) {
        this.dynamicTags.push(inputValue)
        this.$emit('tagArray', this.dynamicTags)
      }
      this.inputVisible = false
      this.inputValue = ''
    }
  }
}
</script>
