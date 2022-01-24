<template>
  <div class="app-container">
    <!-- 表格 -->
    <el-table :data="list" border stripe>
      <el-table-column type="index" width="50" />
      <el-table-column prop="borrowAmount" label="借款额度" />
      <el-table-column prop="integralStart" label="积分区间开始" />
      <el-table-column prop="integralEnd" label="积分区间结束" />
      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
          <el-button
            type="danger"
            size="mini"
            icon="el-icon-delete"
            @click="removeById(scope.row.id)"
          >
            删除
          </el-button>
          <router-link :to="'/core/integral-grade/edit/' + scope.row.id" style="margin-right: 5px">
            <el-button type="primary" size="mini" icon="el-icon-edit">
              修改
            </el-button>
          </router-link>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import intergralGradeApi from "@/api/core/integral-grade";

export default {
  // 定义数据模型
  data() {
    return {
      list: [], // 数据列表
    };
  },

  methods: {
    fetchData() {
      intergralGradeApi.list().then((res) => {
        console.log(res);
        this.list = res.data.integralGradeList;
      });
    },
    removeById(id) {
      this.$confirm("此操作将永久删除该记录, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // 确认删除
          intergralGradeApi.removeById(id).then((res) => {
            this.$message.success(res.message);
            this.fetchData();
          });
        })
        .catch((error) => {
          this.$message.info("取消删除");
        });
    },
  },

  created() {
    this.fetchData();
  },
};
</script>
