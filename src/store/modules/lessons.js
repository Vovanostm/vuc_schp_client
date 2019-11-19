import { axios, url } from './../../api';

const state = {
  lessons: [],
};

// getters
const getters = {
  lessons: ({ lessons }) => lessons,
};

const actions = {
  async getLessons({ commit }) {
    const answer = await axios.get(url.lessons.base);
    let { data } = answer;
    Object.keys(data).forEach((key) => {
      data[key].timeStart = new Date(data[key].timeStart);
      data[key].timeEnd = new Date(data[key].timeEnd);
    });
    commit('UPDATE_LESSONS', answer.data);
    return answer.data;
  },

  async setLessons({ dispatch }, teachers) {
    const answer = await axios.post(url.lessons.base, teachers);
    dispatch('network', answer.status);
    return answer.data;
  },

  async deleteLessons({ dispatch }, teachers) {
    dispatch('network', answer.status);
    const answer = await axios.delete(url.lessons.base, teachers);
    return answer.data;
  },
};

const mutations = {
  UPDATE_LESSONS(state, data) {
    state.lessons = data;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
