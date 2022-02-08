<template>
  <div class="app-container">
    <div style="margin-bottom: 10px">
      <el-button
        @click="dialogVisible = true"
        type="primary"
        size="mini"
        icon="el-icon-download"
      >
        导入Excel
      </el-button>

      <el-button
        @click="exportData"
        type="primary"
        size="mini"
        icon="el-icon-upload2"
        >导出Excel</el-button
      >
    </div>

    <el-dialog title="数据字典导入" :visible.sync="dialogVisible" width="30%">
      <el-form>
        <el-form-item label="请选择Excel文件">
          <el-upload
            :before-upload="beforeFileUpload"
            :auto-upload="true"
            :multiple="false"
            :limit="1"
            :on-exceed="fileUploadExceed"
            :on-success="fileUploadSuccess"
            :on-error="fileUploadError"
            :action="BASE_API + '/admin/core/dict/import'"
            name="file"
            accept="application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          >
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false"> 取消 </el-button>
      </div>
    </el-dialog>

    <el-table :data="list" border row-key="id" lazy :load="load">
      <el-table-column label="名称" align="left" prop="name" />
      <el-table-column label="编码" prop="dictCode" />
      <el-table-column label="值" align="left" prop="value" />
    </el-table>
  </div>
</template>

<script>
import dictApi from '@/api/core/dict'

export default {
  // 定义数据模型
  data() {
    return {
      dialogVisible: false, // 上传文件对话框是否开启
      BASE_API: process.env.VUE_APP_BASE_API, // 获取后端接口地址
      list: [] // 数据字典集合
    };
  },
  
  created() {
    this.fatchData()
  },
  methods: {
    // 获取第一级数据字典列表
    fatchData() {
      dictApi.listByParentId(1).then(res => {
        this.list = res.data.list
      })
    },
    // 查询子节点
    load(row, treeNode, resolve) {
      dictApi.listByParentId(row.id).then(res => 
        resolve(res.data.list)
      )
    },
    // 上传之前，判断文件类型，只能上传 Excel
    beforeFileUpload(file) {
      const fileType =
        file.type ===
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
        file.type === "application/vnd.ms-excel";
      if (!fileType) {
        this.$message.error("请上传 Excel 文件");
      }
      return fileType;
    },

    // 文件上传超出
    fileUploadExceed() {
      this.$message.warning("只能上传一个文件");
    },

    // 文件上传成功
    fileUploadSuccess(res) {
      if (res.code == 0) {
        this.$message.success("数据导入成功");
        this.dialogVisible = false;
        this.fatchData();
      } else {
        this.$meesage.error(res.message);
      }
    },

    // 文件上传失败
    fileUploadError(error) {
      this.$message.error("数据导入失败");
    },

    //Excel数据导出
    exportData() {
      window.location.href = this.BASE_API + "/admin/core/dict/export";
    },
  },
};
</script>
