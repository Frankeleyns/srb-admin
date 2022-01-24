<template>
  <div class="app-container">
    <!-- 输入表单 -->
    <el-form label-width="120px">
      <el-form-item label="借款额度">
        <el-input-number v-model="integralGrade.borrowAmount" :min="0" />
      </el-form-item>
      <el-form-item label="积分区间开始">
        <el-input-number v-model="integralGrade.integralStart" :min="0" />
      </el-form-item>
      <el-form-item label="积分区间结束">
        <el-input-number v-model="integralGrade.integralEnd" :min="0" />
      </el-form-item>
      <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate()" >
          保存
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import intergralGradeApi from "@/api/core/integral-grade";

export default {
    // 定义数据模型
    data() {
        return {
            integralGrade : {},
            saveBtnDisabled: false
        }
    },
    methods: {
        saveOrUpdate() {
            this.saveBtnDisabled = true
            if (this.integralGrade.id) {
                this.updateData()
            }else {
                this.saveData()
            }
        },

        // 新增数据
        saveData() {
            intergralGradeApi.save(this.integralGrade).then(res => {
                this.$message.success(res.message)
            })
            // 跳转到查询积分等级列表的路由
            this.$router.push('/core/integral-grade/list')
        },

        // 根据id查询记录
        fetchDataById(id) {
            intergralGradeApi.getById(id).then(res => {
                this.integralGrade = res.data.integralGrade
            })
        },

        // 更新数据
        updateData() {
            intergralGradeApi.updateById(this.integralGrade).then(res => {
            console.log(res);
            this.$message.success(res.message)
            this.$router.push('/core/integral-grade/list')
            })
        }
    },
    created() {
        let id = this.$route.params.id
        if(id) {
            this.fetchDataById(id)
        }
    }
}
</script>