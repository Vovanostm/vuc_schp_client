const axios = require('axios');

const base = '/api';
const url = {
  teachers: {
    base: base + '/teachers',
  },
  methodists: {
    base: base + '/methodists',
  },
  lessons: {
    base: base + '/lessons',
  },
  visits: {
    base: base + '/visits',
  },
};

export { url, axios };
