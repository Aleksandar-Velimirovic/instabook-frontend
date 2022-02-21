
export const ProfileStore = {
  state:{
    searchTerm: localStorage.getItem('searchTerm'),
  },

  mutations:{
    setSearchTerm(state, searchTerm) {
        state.searchTerm = searchTerm
        localStorage.setItem('searchTerm', searchTerm)
    }
  },

  getters:{
    getSearchTerm(state) {
        return state.searchTerm
    }
  }
}