<template>
    <div>
        <!-- Form -->
        <el-dialog title="Настройки занятия" :visible.sync="isWindowOpen">
            <el-form :model="myLesson" :label-width="formLabelWidth">
                <el-form-item label="Филиал">
                    <el-input v-model="myLesson.branch" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="День недели">
                    <el-input v-model="myLesson.weekDay" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="Преподаватель">
                    <el-select
                        v-model="teacherDisplayedName"
                        filterable
                        placeholder="Выберите преподавателя"
                    >
                        <el-option
                            v-for="teacher in avaliableTeachers"
                            :key="teacher.id"
                            :label="teacher.displayedName"
                            :value="teacher.displayedName"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="Предмет">
                    <el-input v-model="myLesson.title" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="Начало">
                    <el-input v-model="myLesson.timeStart" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="Конец">
                    <el-input v-model="myLesson.timeEnd" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="close">Отмена</el-button>
                <el-button type="primary" @click="save">Сохранить</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'LessonEditDialog',
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
    lesson: {
      type: Object,
      default() {
        return {};
      },
    },
    formLabelWidth: {
      type: String,
      default: '150px',
    },
  },

  data() {
    return {
      myLesson: {
        teacher: {},
      },
      teacherDisplayedName: '',
    };
  },

  computed: {
    ...mapGetters(['teachers']),

    avaliableTeachers() {
      return this.teachers;
    },

    isWindowOpen: {
      get() {
        return this.isOpen;
      },
      set(val) {
        if (val === false) {
          this.close();
        }
        return val;
      },
    },
  },

  watch: {
    lesson(val) {
      this.myLesson = Object.assign({}, val);
      this.myLesson.weekDay = this.$moment(this.myLesson.timeStart).format(
        'dd'
      );
      this.myLesson.timeStart = this.$moment(this.myLesson.timeStart).format(
        'HH:mm'
      );
      this.myLesson.timeEnd = this.$moment(this.myLesson.timeEnd).format(
        'HH:mm'
      );
      let t = this.teachers.find(({ _id }) => _id === this.myLesson.teacherId);
      if (t) this.teacherDisplayedName = t.displayedName;
    },
  },

  created() {},

  methods: {
    close() {
      this.$emit('update:isOpen', false);
    },
    handleSelect(val) {
      let t = this.teachers.find((teacher) => teacher.displayedName === val);
      this.myLesson.teacherId = t && t.id;
    },
    save() {
      this.$emit('update:isOpen', false);
      let t = this.teachers.find(
        (teacher) => teacher.displayedName === this.teacherDisplayedName
      );
      console.log(t);
      this.myLesson.teacherId = t && t._id;
      this.myLesson.timeStart = this.$moment(
        this.myLesson.weekDay + '' + this.myLesson.timeStart,
        'dd HH.mm'
      ).toDate();
      this.myLesson.timeEnd = this.$moment(
        this.myLesson.weekDay + '' + this.myLesson.timeEnd,
        'dd HH.mm'
      ).toDate();
      console.log(JSON.parse(JSON.stringify(this.myLesson)));
      this.$emit('save', this.myLesson);
    },
  },
};
</script>

<style>
</style>
