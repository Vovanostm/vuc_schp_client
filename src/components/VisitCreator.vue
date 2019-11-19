<template>
  <div>
    <h4>Посещение</h4>
    <el-form :model="visit" :label-width="formLabelWidth">
      <el-form-item label="Дата">
        <el-input v-model="visit.date" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="Филиал">
        <el-input v-model="visit.branch.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="Методист">
        <el-autocomplete
          class="inline-input"
          v-model="visit.methodist.displayedName"
          :fetch-suggestions="avaliableMethodists"
          placeholder="ФИО"
          @select="handleSelect"
        ></el-autocomplete>
      </el-form-item>
    </el-form>
    <el-table :data="lessons" style="width: 100%; margin-bottom: 20px" :border="true">
      <!-- <el-table-column prop="branch" label="Филиал" width="120"></el-table-column> -->
      <el-table-column prop="timeStart" label="Время" width="120">
        <template slot-scope="scope">
          <span>{{scope.row.timeStart | moment('HH:mm')}} - {{scope.row.timeEnd | moment('HH:mm')}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="title" label="Предмет" width="160"></el-table-column>
      <el-table-column prop="teacher.displayedName" label="Преподаватель"></el-table-column>
      <el-table-column prop="teacher.autoPriority" label="Важность"></el-table-column>
    </el-table>
    <el-button @click="createHandler" type="primary">Сохранить</el-button>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
  name: 'Visit',
  props: {
    branch: {
      type: Object,
      default() {
        return {};
      },
    },
    date: {
      type: Date,
      default() {
        return new Date();
      },
    },
    methodist: {
      type: Object,
      default() {
        return {};
      },
    },
    lessons: {
      type: Array,
      default() {
        return [];
      },
    },
    formLabelWidth: {
      type: String,
      default: '100px',
    },
  },
  data() {
    return {
      visit: {
        branch: this.branch,
        lessons: this.lessons,
        methodist: this.methodist,
        date: this.$moment(this.date).format('DD.MM.YYYY'),
      },
    };
  },
  computed: {
    ...mapGetters(['methodists', 'weekDays']),
  },
  watch: {
    branch(val) {
      this.visit.branch = val;
    },
  },
  methods: {
    ...mapActions(['setVisits']),

    avaliableMethodists(qs, cb) {
      let weekDay = this.$moment(this.visit.date, 'DD.MM.YYYY').format('dd');
      weekDay = weekDay[0].toUpperCase() + weekDay[1];
      let filtered = this.methodists.filter((m) => {
        return m.weekDays.includes(weekDay) && m.displayedName.includes(qs);
      });
      cb(
        filtered.map((m) => ({
          value:
            m.displayedName + ' ' + m.remainingVisits + '/' + m.visitsInMonth,
          ...m,
        }))
      );
    },

    createHandler() {
      this.setVisits([this.visit]);
      this.$emit('save', this.visit);
    },

    handleSelect(item) {
      this.visit.methodist = item;
    },
  },
};
</script>

<style>
</style>
