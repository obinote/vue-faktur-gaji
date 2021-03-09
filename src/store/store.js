import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export const store = new Vuex.Store({
  state : {
    fakturGaji : {
      id_karyawan: "KRY2098201001",
      nama_karyawan: "Bu Adara Olivia",
      tanggal_awal:"2021-01-01",
      tanggal_akhir:"2021-01-31",
      total_kehadiran:22,
      total_periode:1,
      pengaturan_gaji:[
        {
          id:1, 
          jenis:"periode",
          nama: "Gaji Pokok",
          nominal:80000
        },
        {
          id:2,
          jenis:"kehadiran",
          nama:"Uang Makan",
          nominal:10000
        },
        {
          id:3,
          jenis:"periode",
          nama:"Uang Absen",
          nominal:12000
        },
        {
          id:4,
          jenis:"periode",
          nama:"Uang Transport",
          nominal:15000
        },
        {
          id:5,
          jenis:"periode",
          nama:"Uang Snack",
          nominal:5000
        }
      ],
      pengaturan_upah:[
        {
          id:1,
          nama:"mencuci",
          nominal:200
        },
        {
          id:2,
          nama:"menyetrikan",
          nominal:1600
        }
      ],
      pengerjaan_upah:[
        {
          pengaturan_upah_id:2,
          nominal:50,
          satuan:"KG"
        },
        {
          pengaturan_upah_id:1,
          nominal:100,
          satuan:"KG"
        }
      ],
      komisi:[
        {
          nama:"Bonus Bulanan",
          nominal:300000
        },
        {
          nama:"Bonus Bulanan 2",
          nominal:200000
        }
      ],
      tanggungan:[
        {
          nama:"Denda menghilankan Barang",
          nominal:120000,
        }
      ],
      rekening:{
        nomor:"0371200780",
        bank:"BCA",
        pemilik:"Mega Marcela"
      },
      tanggal_catat:"2020-02-02",
      keterangan:"Gaji Bulan Januari"
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
      return state.fakturGaji;
    },
    listModal (state) {
      return state.modalList;
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
        return `${upah.nominal}${upah.satuan}`;
      };
    },
    subtotalGaji (state) {
      let subTotal = state.fakturGaji.pengaturan_gaji.reduce(function(prev, cur) {
        let nominalGaji = cur.id === 1 ? parseInt(cur.nominal) * state.fakturGaji.total_periode : cur.nominal * state.fakturGaji.total_kehadiran
        
        return prev + parseInt(nominalGaji);
      }, 0);

      return subTotal
    },
    subtotalUpah (state) {
      let subTotal = state.fakturGaji.pengaturan_upah.reduce(function(prev, cur) {
        return prev + parseInt(cur.nominal);
      }, 0);

      return subTotal
    },
    subtotalKomisi (state) {
      let subTotal = state.fakturGaji.komisi.reduce(function(prev, cur) {
        return prev + parseInt(cur.nominal);
      }, 0);

      return subTotal
    },
    subtotalTanggungan (state) {
      let subTotal = state.fakturGaji.tanggungan.reduce(function(prev, cur) {
        return prev + parseInt(cur.nominal);
      }, 0);

      return subTotal
    },
    formatNumber (state) {
      return gaji => {
        if (gaji !== '' || gaji !== undefined || gaji !== 0 || gaji !== '0' || gaji !== null) {
            return gaji.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
        
        return gaji;
      }
    }
  },
  mutations: {
    setBeforeEdit (state, data) {
      data.target.forEach((target, index) => {
        switch (target) {
          case "total_kehadiran":
            state.beforeEdit.total_kehadiran = data.value[index]
            break;
          case "total_periode":
            state.beforeEdit.total_periode = data.value[index]
            break;
          case "gaji":
            state.beforeEdit.gajiValue = data.value[index]
            break;
          case "komisi":
            state.beforeEdit.komisi = {
              index : data.value[0],
              nominal: data.value[2],
              nama: data.value[1]
            }
            break;
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
          break;
        case "total_periode":
          state.fakturGaji.total_periode = data.value
          break;
        case "gaji":
          let dataId= state.activeModal.id.match(/\d+/)[0];
          let index = state.fakturGaji.pengaturan_gaji.findIndex(gaji => gaji.id === parseInt(dataId))

          state.fakturGaji.pengaturan_gaji[index].nominal = data.value
          break;
        
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
  }
})