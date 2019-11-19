<template>
  <el-row>
    <el-col :span="24">
      <el-main>
        <el-button @click="btnCreateHandler">Создать</el-button>
        <el-tabs type="card" v-model="weekDayTab" @tab-click="handleTabWeekDayClick">
          <el-tab-pane
            v-for="(day, key) in days"
            :key="key"
            :label="day.date | moment('dddd') +' ' + day.maxPriority"
          ></el-tab-pane>
        </el-tabs>
        <day-schedule v-if="days[weekDayTab]" :branchVisits="days[weekDayTab].branchVisits"/>
      </el-main>
    </el-col>
    <el-col :span="8">
      <h2>Настройки</h2>
    </el-col>
  </el-row>
</template>

<script>
import { mapGetters } from 'vuex';
// @ is an alias to /src
import DaySchedule from '@/components/DaySchedule.vue';

function graph(d, arr, levels, trees) {
  if (d === levels.length || trees.length > 1000) return trees.push(arr);
  levels[d].forEach((lesson) => {
    let l = lesson;
    if (arr.find(({ teacherId }) => teacherId === lesson.teacherId)) l = null;
    if (
      arr[arr.length - 1] &&
      arr[arr.length - 1].timeEnd.getTime() >= lesson.timeStart.getTime()
    ) {
      l = null;
    }
    // console.dir(JSON.parse(JSON.stringify(arr)), JSON.parse(JSON.stringify(l)));
    graph(d + 1, l ? arr.concat(l) : arr, levels, trees);
  });
}

function sumPrior(tree) {
  let sum = 0;
  tree.forEach((lesson) => {
    try {
      sum += lesson.teacher.autoPriority;
    } catch (e) {
      console.log('!!!', lesson);
    }
  });
  return sum;
}

export default {
  name: 'home',
  components: {
    DaySchedule,
  },

  data() {
    return {
      weekDayTab: 0,
      days: [],
      trees: [],
      layers: [],
      heaps: [],
    };
  },

  computed: {
    ...mapGetters(['teachers', 'lessons', 'branches', 'methodists']),
  },

  mounted() {
    console.log('ok');
  },

  methods: {
    btnCreateHandler() {
      this.days = [];
      let dates = [
        new Date('2018-11-05'),
        new Date('2018-11-06'),
        new Date('2018-11-07'),
        new Date('2018-11-08'),
        new Date('2018-11-09'),
        new Date('2018-11-10'),
        new Date('2018-11-11'),
      ];
      let branches = this.branches;
      let lessons = this.lessons.map((lesson) => {
        return {
          ...lesson,
          teacher: this.teachers.find(({ _id }) => _id === lesson.teacherId),
        };
      });
      dates.forEach((date) => {
        let dayLessons = lessons.filter((lesson) => {
          let timeStart = new Date(lesson.timeStart);
          return (
            timeStart.getDay() === date.getDay()
            // timeStart.getDate() === date.getDate() &&
            // timeStart.getMonth() === date.getMonth() &&
            // timeStart.getYear() === date.getYear()
          );
        });
        let branchVisits = [];
        branches.forEach((b) => {
          let branchLessons = dayLessons.filter(({ branch }) => branch === b);
          let heaps = [];

          let layers = [];
          let visits = [];

          branchLessons.forEach((lesson) => {
            let layer = layers.find((layer) => {
              return (
                lesson.timeStart.getTime() === layer[0].timeStart.getTime()
              );
            });
            if (layer) layer.push(lesson);
            else layers.push([lesson]);
          });
          this.heaps = heaps;

          let trees = [];

          layers.forEach((layer, i) => {
            graph(i, [], layers, trees);
          });
          let maxPriority = 0;
          trees.forEach((t) => {
            this.trees.push(t);
            if (maxPriority < sumPrior(t)) maxPriority = sumPrior(t);
            visits.push({
              priority: sumPrior(t),
              lessons: t,
            });
          });
          let weekDay = this.$moment(date)
            .format('dd')
            .toUpperCase();
          console.log(weekDay);
          let methodists = this.methodists.filter((methodist) => {
            return methodist.weekDays.find(
              (day) => day.toUpperCase() === weekDay
            );
          });
          branchVisits.push({
            methodists: methodists,
            name: b,
            visits,
            maxPriority,
          });
        });
        this.days.push({
          date,
          branchVisits,
          maxPriority: Math.max(...branchVisits.map((b) => b.maxPriority)),
        });
      });
    },

    handleTabWeekDayClick() {},
  },
};
</script>
