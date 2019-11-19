const state = {
  network: [],
  branches: [
    'Мытищи',
    'Королёв',
    'Пушкино',
    'Физтехпарк',
    'Щёлково',
    'Онлайн',
    'Москва (ВШЭ)',
    'Москва (пр-т Мира)',
    'Москва (Профсоюзная)',
    'Москва (Яндекс)',
  ],

  weekDays: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
};

// getters
const getters = {
  network: ({ network }) => network,
  branches: ({ branches }) => branches.sort(),
  weekDays: ({ weekDays }) => weekDays,
};

const actions = {
  async network({ commit }, status) {
    commit('UPDATE_NETWORK', status);
    return status;
  },
};

const mutations = {
  UPDATE_NETWORK(state, data) {
    state.network.push(data);
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
