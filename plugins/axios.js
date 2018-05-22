export default function({ $axios, redirect, store }) {

  $axios.onRequest(config => {
    const user = store.getters.user;
    if (user && user.token) {
      console.log(user.token);
      config.headers['Authorization'] = `Token ${user.token}`;
    } else {
      delete config.headers['Authorization'];
    }
  });

  $axios.onError(error => {
    const code = parseInt(error.response && error.response.status);
    if (code === 401) {
      console.log(401);
      store.commit('setUser', null);
      redirect('/');
    }
  });

}
