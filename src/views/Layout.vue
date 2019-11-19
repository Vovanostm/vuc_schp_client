<template>
  <div>
    <main-menu></main-menu>
    <el-main class="main">
      <router-view></router-view>
    </el-main>
  </div>
</template>

<script>
import MainMenu from '@/components/MainMenu';
import { mapActions } from 'vuex';
export default {
  name: 'Layout',
  components: { MainMenu },
  created() {
    this.getTeachers();
    this.getLessons();
    this.getMethodists();
  },
  methods: {
    ...mapActions(['getTeachers', 'getLessons', 'getMethodists']),
  },
};
</script>

<style scoped>
.main {
  padding: 0;
}
@media (min-width: 1000px) {
  .main {
    padding: 20px;
    min-width: 1000px;
  }
}
</style>
