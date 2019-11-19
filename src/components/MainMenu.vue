<template>
  <el-menu :default-active="activeIndex" mode="horizontal" @select="handleSelect">
    <el-menu-item index="/">Генератор</el-menu-item>
    <el-menu-item index="/methodists">Методисты</el-menu-item>
    <el-menu-item index="/preferences">Настройки</el-menu-item>
    <el-menu-item index="/visits">Посещения</el-menu-item>
  </el-menu>
</template>

<script>
export default {
  name: 'MainMenu',
  data() {
    return {
      activeIndex: '/',
    };
  },

  mounted() {
    this.activeIndex = this.$router.currentRoute.fullPath;
  },

  methods: {
    handleSelect(e) {
      this.$router.push(e);
    },
  },
};
</script>
