<template>
  <el-container class="home-container">
    <el-header>
      <div>
        <i :class="isCollapse?'el-icon-s-fold':'el-icon-s-unfold'" class="toggle-collapse" @click="toggleCollapse"></i>
        <span class="header-span">SPYBLog</span>
      </div>
      <div class="avatar_box">
        <el-dropdown trigger="click">
          <img class="avatar_img" :src="avatar">
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>修改信息</el-dropdown-item>
            <el-dropdown-item @click.native="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-header>
    <!-- 页面主题区域 -->
    <el-container>
      <!-- 侧边栏区域 -->
      <el-aside :width="isCollapse?'70px':'200px'">
        <el-menu text-color="#fff" active-text-color="#ffd04b" background-color="#6E6E6E" unique-opened
                 :collapse="isCollapse" :collapse-transition="false" router :default-active='activePath'>
          <!-- 一级菜单 -->
          <el-submenu :index="item.id + ''" v-for="item in menuList" :key="item.id">
            <template slot="title">
              <i :class="item.icon" class="item-icon"></i>
              <span class="marg-left-10">{{ item.auth_name }}</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item :index="'/' + subItem.path" v-for="subItem in item.children" :key="subItem.id"
              @click="showNavState('/' + subItem.path)">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>{{ subItem.auth_name }}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 组件占位 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  created() {
    // 头像
    this.avatar = window.localStorage.getItem('avatar')
    // 菜单栏
    this.getMenuList()
    // 获取已激活的菜单栏
    this.activePath = window.localStorage.getItem('activePath')
  },

  data() {
    return {
      // 菜单列表
      menuList: [],
      // 折叠菜单栏
      isCollapse: false,
      // 头像
      avatar: '',
      // 已激活的菜单栏
      activePath: ''
    }
  },

  methods: {
    // 退出按钮
    logout () {
      // 清空token
      window.sessionStorage.clear()
      // 跳转登录页面
      this.$router.push('/login')
    },

    // 菜单获取
    async getMenuList() {
      const { data: res } = await this.$http.get('/menu')

      // 数据获取失败
      if (res.code !== 0) {
        return this.$message.error(res.msg)
      }

      // 数据获取成功
      this.menuList = res.data
    },

    // 菜单栏折叠与展开
    toggleCollapse() {
      this.isCollapse = !this.isCollapse
    },

    // 获取激活状态的链接
    showNavState(activePath) {
      window.localStorage.setItem('activePath', activePath)
      this.activePath = activePath
    }
  }
}
</script>

<style lang="less" scoped>

.home-container {
  height: 100%;
}

.el-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #585858;
}

.avatar_box {
  display: flex;
  align-items: center;
}

.avatar_img{
  height: 50px;
  width: 50px;
  border-radius: 50%;
  margin-right: 20px;
  cursor: pointer;
}

.header-span {
  color: #F2F2F2;
  font-size: 25px;
  font-weight: bold;
}

.el-aside {
  background-color: #6E6E6E;
  .el-menu {
    border-right: none;
  }
}

.el-main {
  background-color: #424242;
  color: #fff;
}

.toggle-collapse {
  letter-spacing: 0.5em;
  font-size: 25px;
  cursor: pointer;
  color: #fff;
}

.item-icon {
  color: #fff;
}

.el-dropdown-link {
  cursor: pointer;
  color: #409EFF;
}
</style>
