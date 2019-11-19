<template>
  <div>
    <!-- Form -->
    <el-dialog title="Настройки преподавателя" :visible.sync="isWindowOpen">
      <el-form :model="myTeacher">
        <el-form-item label="ФИО" :label-width="formLabelWidth">
          <el-input v-model="myTeacher.displayedName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Рейтинг" :label-width="formLabelWidth">
          <el-input v-model="myTeacher.rating" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Дата последнего посещения" :label-width="formLabelWidth">
          <el-input v-model="myTeacher.lastVisit" autocomplete="off"></el-input>
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
export default {
  name: 'TeacherEditDialog',
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
    teacher: {
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
      myTeacher: {},
    };
  },

  computed: {
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
    teacher(val) {
      this.myTeacher = Object.assign({}, val);
      this.myTeacher.lastVisit = this.$moment(this.myTeacher.lastVisit).format(
        'DD.MM.YYYY'
      );
    },
  },

  created() {},

  methods: {
    close() {
      this.$emit('update:isOpen', false);
    },
    save() {
      this.$emit('update:isOpen', false);
      this.myTeacher.lastVisit = this.$moment(
        this.myTeacher.lastVisit,
        'DD.MM.YYYY'
      ).toDate();
      this.$emit('save', this.myTeacher);
    },
  },
};
</script>

<style>
</style>
