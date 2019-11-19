<template>
  <div>
    <div v-for="(branch, key) in filtererdBranches" :key="key" class="box-card">
      <el-row :gutter="20">
        <el-col :span="10">
          <branch-visits
            :methodist="branch"
            :branch="branch"
            :visits="filterVisits(branch.visits)"
            :filters="filters[key]"
          ></branch-visits>
        </el-col>
        <el-col :span="14">
          <el-card class="card">
            <div slot="header">
              <span>Настройки</span>
              <el-button style="float: right; padding: 3px 0" type="text">Operation button</el-button>
            </div>
            <el-row>
              <el-col :span="12">
                <h4>Преподаватели</h4>
                <teachers-list
                  :teachers="listTeachers(branch.visits)"
                  @visitTeacher="visitTeacher($event, key)"
                />
              </el-col>
              <el-col :span="12">
                <h4>Методисты</h4>
                <methodists-list :methodists="branch.methodists"/>
              </el-col>
            </el-row>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import TeachersList from '@/components/TeachersList.vue';
import MethodistsList from '@/components/MethodistsList.vue';
import BranchVisits from '@/components/BranchVisits.vue';

export default {
  name: 'DaySchedule',
  components: { TeachersList, MethodistsList, BranchVisits },
  props: {
    branchVisits: {
      type: Array,
      default() {
        return [];
      },
    },
  },

  data() {
    return {
      activeVisits: {},
      filteredBranchVisits: {},
      filters: [{}],
    };
  },

  computed: {
    branchVisit() {
      let bv = {};
      this.branchVisits.forEach((branch) => {
        bv[branch.name] = this.getBranchVisit(
          branch,
          this.activeVisits[branch.name]
        );
      });
      return bv;
    },
    filtererdBranches() {
      let branches = this.branchVisits.concat();
      return branches.sort((a, b) => b.maxPriority - a.maxPriority);
    },
  },

  methods: {
    getBranchVisit(branch) {
      let id = this.activeVisits[branch.name]
        ? this.activeVisits[branch.name]
        : 0;
      console.log(id);
      return this.filterVisits(branch.visits)[id];
    },
    filterVisits(visits) {
      let fVisits = visits.concat();
      fVisits.sort((a, b) => b.priority - a.priority);
      return fVisits;
    },
    listTeachers(visits) {
      let t = [];
      visits.forEach((visit) => {
        visit.lessons.forEach((lesson) => {
          t.includes(lesson.teacher) ? t : t.push(lesson.teacher);
        });
      });
      return t;
    },
    handleTabWeekDayClick() {},
    handleVisitsBackClick(branch) {
      if (!this.activeVisits[branch.name]) this.activeVisits[branch.name] = 0;
      this.$set(
        this.activeVisits,
        branch.name,
        this.activeVisits[branch.name] - 1
      );
      if (this.activeVisits[branch.name] < 0)
        this.activeVisits[branch.name] = 0;
    },

    handleVisitsForwardClick(branch) {
      if (!this.activeVisits[branch.name]) this.activeVisits[branch.name] = 0;
      this.$set(
        this.activeVisits,
        branch.name,
        this.activeVisits[branch.name] + 1
      );
      let max = this.filterVisits(branch.visits).length;
      if (
        this.activeVisits[branch.name] > this.filterVisits(branch.visits).length
      )
        this.activeVisits[branch.name] = max;
    },

    visitTeacher(_id, key) {
      if (!this.filters[key]) this.$set(this.filters, key, {});
      if (!this.filters[key]['includedTeachers'])
        this.$set(this.filters[key], 'includedTeachers', [_id]);
      if (!this.filters[key]['includedTeachers'].includes(_id))
        this.filters[key]['includedTeachers'].push(_id);
    },
  },
};
</script>

<style>
.box-card {
  margin-bottom: 20px;
}
</style>
