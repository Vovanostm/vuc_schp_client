<template>
  <div>
    <methodists-list :methodists="methodists"></methodists-list>
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="ФИО">
        <el-input v-model="form.displayedName"></el-input>
      </el-form-item>
      <el-form-item label="Дни недели для посещения">
        <el-checkbox-group v-model="form.weekDays">
          <el-checkbox label="Пн" name="weekDays"></el-checkbox>
          <el-checkbox label="Вт" name="weekDays"></el-checkbox>
          <el-checkbox label="Ср" name="weekDays"></el-checkbox>
          <el-checkbox label="Чт" name="weekDays"></el-checkbox>
          <el-checkbox label="Пт" name="weekDays"></el-checkbox>
          <el-checkbox label="Сб" name="weekDays"></el-checkbox>
          <el-checkbox label="Вс" name="weekDays"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-button type="primary" @click="onSubmit">Добавить</el-button>
    </el-form>
  </div>
</template>

<script>
import MethodistsList from '@/components/MethodistsList.vue';
import { mapGetters, mapActions } from 'vuex';
export default {
  name: 'Methodists',
  components: { MethodistsList },
  data() {
    return {
      form: {
        displayedName: '',
        weekDays: [],
      },
    };
  },
  computed: {
    ...mapGetters(['methodists']),
  },
  methods: {
    ...mapActions(['setMethodists']),

    onSubmit() {
      this.setMethodists({
        methodists: [
          {
            ...this.form,
          },
        ],
      });
    },
  },
};
</script>

<style>
</style>
