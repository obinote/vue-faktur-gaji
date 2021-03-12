import Salary from '../api/Salary'
import Bank from '../api/Bank'

export const loadFakturGaji = ({ commit }) => {
  console.log("load")
  Salary.get()
    .then(response => {
      let { data } = response;
      if (data.success === true) {
        commit('INIT_FAKTUR_GAJI', data)
      }
    })
    .catch(error => {
      console.log(error)
    })
}

export const loadRekening =  ({ commit }) =>  {
  commit('CLEAR_DATA_REKENING')

  Bank.get()
    .then(response => {
      let { data } = response;
      if (data.success === true) {
        commit('SET_DATA_REKENING', data)
      }
    })
    .catch(error => {
      console.log(error)
    })
}

export const pembayaran = ({ commit, getters }, payload) => {
  let posted = {
    ...getters.FAKTUR_GAJI,
    ...payload
  }

  Salary.post(posted)
    .then(response => {
      console.log(response)
    })
    .catch(error => {
      console.log(error)
    })
}

export const onSubmitModal = ({ commit }, payload) => {
  commit('MODAL_SUBMIT', payload)
}

export const tambahTanggungan = ({ commit }, payload) => {
  commit('ADD_TANGGUNGAN', payload)
}

export const setActiveModal = ({ commit }, payload) => {
  commit('SET_ACTIVE_MODAL', payload)
}

export const onChangeModalInput = ({ commit }, payload) => {
  commit('ON_CHANGE_MODAL_INPUT', payload)
}

export const hapusKehadiran = ({ commit }) => {
  commit('HAPUS_KEHADIRAN')
}

export const hapusKomisi = ({ commit }, payload) => {
  commit('HAPUS_KOMISI', payload)
}

export const hapusTanggungan = ({ commit }, payload) => {
  commit('HAPUS_TANGGUNGAN', payload)
}