<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">
        <span class="home-page">首页</span>
      </el-breadcrumb-item>
      <el-breadcrumb-item>
        <span class="bread-item">用户管理</span>
      </el-breadcrumb-item>
      <el-breadcrumb-item>
        <span class="bread-item">用户列表</span>
      </el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <!-- 搜索与添加区域 -->
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input placeholder="请输入内容" v-model="queryInfo.q" clearable @clear="getUserList">
            <el-button slot="append" icon="el-icon-search" @click="getUserList"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="dialogVisibleAdd=true">添加用户</el-button>
        </el-col>
      </el-row>

      <!-- 用户列表区域 -->
      <el-table :data="userList" stripe border @sort-change="doSort">
        <el-table-column label="用户名" prop="nickname" sortable="custom"></el-table-column>
        <el-table-column label="邮箱" prop="email"></el-table-column>
        <el-table-column label="登录IP" prop="login_ip"></el-table-column>
        <el-table-column label="登录地" prop="login_addr"></el-table-column>
        <el-table-column label="角色">
          <template slot-scope="scope">
            <span v-for="(item, index) in scope.row.roles" :key="item.id">
              {{ index ==  scope.row.roles.length - 1 ? item.name : item.name + ','}}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="创建时间" sortable="custom" prop="create_time">
          <template slot-scope="scope">
            <span>{{ scope.row.create_time | formatTime() }}</span>
          </template>
        </el-table-column>
        <el-table-column label="最近登录" sortable="custom"  prop="last_login">
          <template slot-scope="scope">
            <span>{{ scope.row.last_login | formatTime() }}</span>
          </template>
        </el-table-column>
        <el-table-column>
          <template slot-scope="">
            <el-button type="primary" icon="el-icon-edit">编辑</el-button>
            <el-button type="danger" icon="el-icon-delete">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination  background layout="total, prev, pager, next" :page-size="queryInfo.size" :total="total"
        @current-change="pageChange" @prev-click="pageChange" @next-click="pageChange">
      </el-pagination>
    </el-card>

    <!-- 添加用户对话框区域 -->
    <el-dialog title="添加用户" :visible.sync="dialogVisibleAdd" width="40%" @close="addDialogClosed">
      <el-form :model="addUserForm" ref="addUserFormRef" :rules="addUserFormRules" label-width="70px" >
        <!-- 用户名(email) -->
        <el-form-item label="用户名" prop="username" required>
            <el-input v-model="addUserForm.username" placeholder="email"></el-input>
        </el-form-item>
        <!-- 昵称 -->
        <el-form-item label="昵称" prop="nickname" required>
            <el-input v-model="addUserForm.nickname" placeholder="nickname"></el-input>
        </el-form-item>
        <!-- 角色 -->
        <el-form-item label="角色" prop="role">
          <span v-if="rolesTagFlag">
            <el-tag :key="tag" v-for="tag in dynamicTags" closable @close="rolesTagClose(tag)" >
              {{tag}}
            </el-tag>
          </span>
          <el-select :class="rolesTagFlag ? 'marg-left-10' : 'marg-left-0'" v-model="addUserForm.role"  placeholder="请选择用户角色" @change="doRoleChange">
            <el-option v-for="item in rolesArray" :key="item.id" :label="item.name" :value="{value: item.id, label: item.name}">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleAdd=false">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    /** 自定义校验规则 */
    // 自定义邮箱校验规则
    var checkEmail = (rule, value, callback) => {
      // 邮箱校验正则表达式
      const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/

      if (regEmail.test(value)) {
        // 邮箱格式合法
        return callback()
      }
      callback(new Error('请输入正确的邮箱格式'))
    }

    // 自定义角色下拉框校验规则

    return {
      userList: [],
      queryInfo: {
        offset: 0,
        size: 2,
        q: '',
        order_by: ''
      },
      total: 0,
      dialogVisibleAdd: false,
      rolesArray: [],

      // 添加用户的表单数据
      addUserForm: {
        username: '',
        nickname: '',
        role: ''
      },

      // 添加用户表单的用户规则对象
      addUserFormRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          // { type: 'email', message: '请输入正确的邮箱格式', trigger: 'blur' },
          // { max: 50, message: '请输入50以内的字符', trigger: 'blur' },
          { validator: checkEmail, trigger: 'blur' }
        ],
        nickname: [
          { required: true, message: '请输入昵称', trigger: 'blur' },
          { max: 8, message: '请输入16以内的字符', trigger: 'blur' },
          { min: 2, message: '请输入不超过2的字符', trigger: 'blur' }
        ],
        role: [
          { required: true, message: '请选择用户角色', trigger: 'change' }
        ]
      },

      /** 添加用户表单的角色属性 */
      // 角色标签数组
      dynamicTags: [],
      // 角色标签显示判断用flag
      rolesTagFlag: false
    }
  },

  created() {
    // 获取用户信息
    this.getUserList()

    // 获取角色数组
    this.getRolesArray()
  },

  methods: {
    // 获取用户信息
    async getUserList() {
      this.getUserInfo()
    },

    // 排序
    async doSort(column) {
      // 获取排序字段
      if (column.order === 'ascending') {
        this.queryInfo.order_by = column.prop
      } else {
        this.queryInfo.order_by = '-' + column.prop
      }
      this.getUserInfo()
    },

    // 翻页处理
    async pageChange(val) {
      // 获取翻页数据
      this.queryInfo.offset = (val - 1) * this.queryInfo.size
      this.getUserInfo()
    },

    // 获取用户信息
    async getUserInfo() {
      const { data: res } = await this.$http.get('/user', {
        params: this.queryInfo
      })

      if (res.code === 0) {
        this.userList = res.data.items
        this.total = res.data.total
      }
    },

    // 获取角色数组
    async getRolesArray() {
      const { data: res } = await this.$http.get('/role')
      if (res.code === 0) {
        this.rolesArray = res.data.items
      }
    },

    // 角色框值发生改变
    doRoleChange() {
      const selectLabel = this.addUserForm.role.label
      for (var item of this.dynamicTags) {
        if (item === selectLabel) {
          this.$message.error('该角色已被分配，不可重复分配')
          return
        }
      }
      this.dynamicTags.push(selectLabel)
      this.rolesTagFlag = true
      // this.addUserForm.role = ''
    },

    // 角色tag删除
    rolesTagClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1)
      if (this.dynamicTags.length === 0) {
        this.rolesTagFlag = false
      }
    },

    // 关闭添加用户对话框
    addDialogClosed() {
      // 重置表单信息
      this.$refs.addUserFormRef.resetFields()
    },

    // 点击添加用户对话框的确定按钮
    addUser() {
      this.$refs.addUserFormRef.validate(valid => {
        // 预校验失败
        console.log(valid)
        if (!valid) {
          return
        }

        // 预校验成功，添加用户信息
        alert('发起添加用户请求')
        // this.$http.post()
        this.$message.success('添加用户信息成功')
        // 隐藏添加用户对话框
        this.dialogVisibleAdd = false
        // 重新获取用户列表
        this.getUserList()
      })
    }
  }
}
</script>
<style lang="less" scoped>

.el-breadcrumb {
  .home-page {
    color: #fff;
  }
  .bread-item {
    color: #D8D8D8;
  }
}
</style>
