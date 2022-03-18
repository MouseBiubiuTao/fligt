<template>
  <el-container style="height: 100vh">
    <el-header class="header">
      <el-row>
        <el-col :span="12" class="logo">
          <i class="el-icon-s-promotion"></i>
          <span>飞机航班管理系统</span>
        </el-col>
        <el-col :span="12" style="text-align: right; fontsize: 20px">
          <i class="el-icon-s-custom" style="fontsize: 24px"></i>
          <span>{{ userInfo.username }} </span>
          <el-button type="plain" @click="logout" size="small">退出</el-button>
        </el-col>
      </el-row>
    </el-header>

    <el-container>
      <el-aside width="200px">
        <el-menu
          style="height: 100%"
          mode="vertical"
          background-color="#eeeeee"
          text-color="#929693"
          active-text-color="red"
          router
        >
          <template v-for="item in menu">
            <el-submenu
              :key="item.path"
              :index="baseUrl + item.path"
              v-if="item.submenu"
            >
              <template v-slot:title>
                <i :class="item.icon" style="color: #fff"></i>
                <span>{{ item.text }}</span>
              </template>
              <el-menu-item
                :key="sub.path"
                :index="baseUrl + item.path + sub.path"
                v-for="sub in item.submenu"
                >{{ sub.text }}</el-menu-item
              >
            </el-submenu>

            <el-menu-item :index="baseUrl + item.path" :key="item.path" v-else>
              <i :class="item.icon"></i>
              <span>{{ item.text }}</span>
            </el-menu-item>
          </template>
        </el-menu>
      </el-aside>

      <el-main>
        <el-button
          @click="goto()"
          type="info"
          icon="el-icon-arrow-left"
          size="small"
          >返回</el-button
        >
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
export default {
  name: "Manage",
  data() {
    return {
      baseUrl: "/manage",
      menu: [
        {
          text: "首页",
          path: "/home",
          icon: "el-icon-s-home",
        },
        {
          text: "航空公司管理",
          path: "/corporationlist",
          icon: "el-icon-discount",
        },
        {
          text: "城市管理",
          path: "/citylist",
          icon: "el-icon-house",
        },
        {
          text: "航班管理",
          path: "/flight",
          icon: "el-icon-s-order",
          submenu: [
            {
              text: "航班列表",
              path: "/list",
            },
            {
              text: "添加航班",
              path: "/add",
            },
          ],
        },
        {
          text: "用户管理",
          path: "/user",
          icon: "el-icon-user-solid",
          submenu: [
            {
              text: "用户列表",
              path: "/list",
            },
            {
              text: "添加用户",
              path: "/add",
            },
          ],
        },
        {
          text: "订单管理",
          path: "/orderlist",
          icon: "el-icon-s-order",
        },
      ],
      currentIndex: 0,
    };
  },
  computed: {
    ...mapState(["userInfo"]),
    ...mapGetters(["isLogin"]),
  },
  methods: {
    ...mapActions({
      logout(dispatch) {
        dispatch("logout");

        this.$router.push("/login");
      },
    }),
    goto() {
      this.$router.go(-1);
    },
  },
};
</script>
<style lang="scss" >
.header {
  line-height: 60px;
  color: #fff;
  background-color: #222222;
  .logo {
    font-size: 20px;
    color: #fff;
    i {
      font-size: 36px;
      vertical-align: middle;
      margin-right: 5px;
      color: #fff;
    }
  }
}
.aside-menu {
  z-index: 10;
  position: relative;
  width: 200px !important;
  overflow: hidden;
  .btnCollapse {
    z-index: 3000;
    position: absolute;
    right: -20px;
    top: 0;
    color: skyblue;
  }
  &.collapse {
    width: 65px !important;
    .btnCollapse {
      right: 20px;
      i {
        font-weight: bold;
      }
    }
  }
}
</style>