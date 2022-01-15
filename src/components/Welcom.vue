<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-card class="height-320">
            <div class="avatar-box">
              <img :src="userInfo.avatar">
            </div>
            <span>{{ userInfo.nickname }}</span>
            <div>
              <span class="info-span">{{ userInfo.signature }}</span>
              权限：<span class="info-span" v-for="item in userInfo.roles" :key="item.id">{{ item.name }}</span>
              <span class="info-span">登录地点：</span>
            </div>
          <div>
            <time class="time">{{ userInfo.last_login | formatTime()}}</time>
          </div>
        </el-card>
      </el-col>
      <el-col :span="16">
        <el-row :gutter="20" class="info-card">
          <el-col :span="8">
            <el-card>
            </el-card>
          </el-col>
          <el-col :span="8">
            <el-card>
            </el-card>
          </el-col>
          <el-col :span="8">
            <el-card>
            </el-card>
          </el-col>
        </el-row>
        <el-row :gutter="20" class="info-card">
          <el-col :span="8">
            <el-card>
            </el-card>
          </el-col>
          <el-col :span="8">
            <el-card>
            </el-card>
          </el-col>
          <el-col :span="8">
            <el-card>
            </el-card>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-card class="height-320">
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="height-320">
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  created() {
    // 获取用户信息
    this.getUserInfo()
  },

  data() {
    return {
      userInfo: {}
    }
  },

  methods: {
    async getUserInfo() {
      const { data: res } = await this.$http.get('/auth')
      this.userInfo = res.data
    }
  }
}
</script>

<style lang="less" scoped>

  .avatar-box {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }

  .userinfo {
    font-size: 13px;
  }

  .time {
    font-size: 13px;
    color: #999;
    padding-left: 25px;
  }

  .image {
    display: block;
  }

  .info-span {
    display: block;
    padding-left: 25px;
  }

  .el-row {
    margin-bottom: 20px;
  }

.info-card {
  .el-card {
    height: 150px;
  }
}
</style>
