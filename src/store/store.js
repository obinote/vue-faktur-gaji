import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex);

axios.defaults.baseURL = "https://dev-bos.smartlink.id"

export const store = new Vuex.Store({
  state : {
    rekening : {},
    pembayaran : {
      listBank : []
    },
    fakturGaji : {
      pengaturan_gaji : [],
      pengaturan_upah : [],
      komisi: [],
      tanggungan : []
    },
    beforeEdit: {
      total_kehadiran : "",
      gajiValue: "",
      total_periode: "",
      komisi: {
        index : "",
        nominal: "",
        nama: ""
      },
    },
    modalList : [
      {
        id : 'ubah-kehadiran',
        header : 'Ubah Kehadiran',
        body   : 'kehadiran',
        footer : 'hapus-simpan',
      },
      {
        id : 'modal-gaji-1',
        header : 'Ubah Gaji Pokok',
        body   : 'gaji',
        footer : 'simpan',
      },
      {
        id : 'modal-gaji-2',
        header : 'Ubah Uang Makan',
        body   : 'gaji',
        footer : 'simpan',
      },
      {
        id : 'modal-gaji-3',
        header : 'Ubah Uang Absen',
        body   : 'gaji',
        footer : 'simpan',
      },
      {
        id : 'modal-gaji-4',
        header : 'Ubah Uang Transport',
        body   : 'gaji',
        footer : 'simpan',
      },
      {
        id : 'modal-gaji-5',
        header : 'Ubah Uang Snack',
        body   : 'gaji',
        footer : 'simpan',
      },
      {
        id : 'modal-komisi',
        header : 'Komisi',
        body   : 'komisi',
        footer : 'hapus-simpan',
      },
      {
        id : 'modal-tanggungan',
        header : 'Bayar Tanggungan / Denda',
        body   : 'tanggungan',
        footer : 'hapus-simpan',
      },
    ],
    activeModal: {},
    komisiTemp: {
      nama: "",
      nominal : ""
    },
    tanggunganTemp: {
      nama: "",
      nominal : ""
    }
  },
  getters: {
    beforeEdit (state) {
      return state.beforeEdit
    },
    dataFakturGaji (state) {
      return state.fakturGaji
    },
    dataPembayaran (state) {
      return state.pembayaran
    },
    listModal (state) {
      return state.modalList
    },
    dataModal (state) {
      return state.activeModal
    },
    tempAddKomisi (state) {
      return state.komisiTemp
    },
    detailBorongan (state) {
      return boronganId => {
        let upah = state.fakturGaji.pengerjaan_upah.find(upah => upah.pengaturan_upah_id === boronganId);
        return `${upah.nominal}${upah.satuan}`
      };
    },
    subtotalGaji (state) {
      let subTotal = state.fakturGaji.pengaturan_gaji.reduce(function(prev, cur) {
        let nominalGaji = cur.id === 1 ? parseInt(cur.nominal) * state.fakturGaji.total_periode : cur.nominal * state.fakturGaji.total_kehadiran
        
        return prev + parseInt(nominalGaji)
      }, 0)

      return subTotal
    },
    subtotalUpah (state) {
      let subTotal = state.fakturGaji.pengaturan_upah.reduce(function(prev, cur) {
        return prev + parseInt(cur.nominal)
      }, 0)

      return subTotal
    },
    subtotalKomisi (state) {
      let subTotal = state.fakturGaji.komisi.reduce(function(prev, cur) {
        return prev + parseInt(cur.nominal)
      }, 0)

      return subTotal
    },
    subtotalTanggungan (state) {
      let subTotal = state.fakturGaji.tanggungan.reduce(function(prev, cur) {
        return prev + parseInt(cur.nominal)
      }, 0)

      return subTotal
    },
    brutoGaji (state, getters) {
      return getters.subtotalGaji + getters.subtotalKomisi + getters.subtotalUpah
    },
    netGaji (state, getters) {
      return getters.brutoGaji - getters.subtotalTanggungan;
    },
    formatNumber (state) {
      return gaji => {
        if (gaji !== '' || gaji !== undefined || gaji !== 0 || gaji !== '0' || gaji !== null) {
            return gaji.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
        
        return gaji
      }
    }
  },
  mutations: {
    initFakturGaji(state, { data }) {
      state.fakturGaji = data
    },
    clearDataRekening(state) {
      state.pembayaran.listBank = []
    },
    dataRekening(state, { data }) {
      data.forEach(data => {
        state.pembayaran.listBank.push({
          ...data,
          value : JSON.stringify(data)
        })
      });
    },
    setBeforeEdit (state, data) {
      data.target.forEach((target, index) => {
        switch (target) {
          case "total_kehadiran":
            state.beforeEdit.total_kehadiran = data.value[index]
            break
          case "total_periode":
            state.beforeEdit.total_periode = data.value[index]
            break
          case "gaji":
            state.beforeEdit.gajiValue = data.value[index]
            break
          case "komisi":
            state.beforeEdit.komisi = {
              index : data.value[0],
              nominal: data.value[2],
              nama: data.value[1]
            }
            break
        }
      });
    },
    setActiveModal (state, data) {
      state.activeModal = data
    },
    onChangeInput (state, data) {
      switch (data.target) {
        case "total_kehadiran":
          state.fakturGaji.total_kehadiran = data.value
          break
        case "total_periode":
          state.fakturGaji.total_periode = data.value
          break
        case "gaji":
          let dataId= state.activeModal.id.match(/\d+/)[0];
          let index = state.fakturGaji.pengaturan_gaji.findIndex(gaji => gaji.id === parseInt(dataId))

          state.fakturGaji.pengaturan_gaji[index].nominal = data.value
          break
        
      }
    },
    onChangeKomisi (state, { index, target, value }) {
      if (index !== -1) {
        let existData = state.fakturGaji.komisi[index]
        if (existData !== undefined) {
          state.fakturGaji.komisi[index][target] = value
        } 
      } else {
        state.komisiTemp[target] = value
      }
    },
    tambahKomisi (state, data) {
      state.fakturGaji.komisi.push(data)
    },
    tambahTanggungan(state, data) {
      state.fakturGaji.tanggungan.push(data)
    },
    hapusKomisi(state, { index }) {
      state.fakturGaji.komisi.splice(index, 1)
    },
    hapusTanggungan(state, { index }) {
      state.fakturGaji.tanggungan.splice(index, 1)
    },
    setPembayaran(state, { value, target }) {
      switch (target) {
        case "rekening":
          state.pembayaran.rekening = JSON.parse(value)
          break;
      
        default:
          break;
      }
    }
  },
  actions:{
    loadFakturGaji (contex) {
      axios.get('/salary/inquiry')
        .then(response => {
          let { data } = response;
          if (data.success === true) {
            contex.commit('initFakturGaji', data)
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    loadRekening (contex) {
      contex.commit('clearDataRekening')
      axios.get('/salary/bank')
        .then(response => {
          let { data } = response;
          if (data.success === true) {
            contex.commit('dataRekening', data)
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    pembayaran (contex, payload) {
      let posted = {
        ...this.getters.dataFakturGaji,
        ...payload
      }

      let config = {
        headers: {
          'Content-Type': 'application/json',
        }
      }

      axios.post('/salaryi/save', JSON.stringify(posted), config)
        .then(response => {
          context.commit('addTodo', response.data)
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
})