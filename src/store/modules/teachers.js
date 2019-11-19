import { axios, url } from './../../api';

const state = {
  teachers: [],
};

// getters
const getters = {
  teachers: ({ teachers }) => teachers,
};

const actions = {
  async getTeachers({ commit }) {
    const answer = await axios.get(url.teachers.base);
    let { data } = answer;
    Object.keys(data).forEach((key) => {
      let dTime =
        (Date.now() - (new Date(data[key].lastVisit) || 0)) / 1000 / 60 / 60;
      data[key].autoPriority = Math.round(
        Math.max(dTime * data[key].rating, data[key].priority || 0)
      );
    });
    commit('UPDATE_TEACHERS', data);
    return answer.data;
  },

  async setTeachers({ dispatch }, teachers) {
    const answer = await axios.post(url.teachers.base, teachers);
    await dispatch('network', answer.status);
    await dispatch('getTeachers');
    return answer.data;
  },

  async deleteTeachers({ dispatch }, teachers) {
    dispatch('network', answer.status);
    const answer = await axios.delete(url.teachers.base, teachers);
    return answer.data;
  },
};

const mutations = {
  UPDATE_TEACHERS(state, data) {
    state.teachers = data;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
