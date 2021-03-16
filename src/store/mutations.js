export const INIT_FAKTUR_GAJI = (state, { data }) => {
  state.fakturGaji = data
}

export const CLEAR_DATA_REKENING = (state) => {
  state.pembayaran.listBank = []
}

export const SET_DATA_REKENING = (state, { data }) => {
  data.forEach(data => {
    state.pembayaran.listBank.push({
      ...data,
      value : JSON.stringify(data)
    })
  })
}

export const MODAL_SUBMIT = (state, { target, value }) => {
  let indexGaji = -1
  target.forEach((item, idx) => {
    switch (item) {
      case "total_kehadiran":
      case "total_periode":
        state.fakturGaji[item] = parseInt(value[idx])
        break
      case "gaji_pokok":
        indexGaji = state.fakturGaji.pengaturan_gaji.findIndex(gaji => gaji.id === 1)
        state.fakturGaji.pengaturan_gaji[indexGaji].nominal = value[idx]
        break
      case "modal-gaji-2":
      case "modal-gaji-3":
      case "modal-gaji-4":
      case "modal-gaji-5":
        let dataId= [item.match(/\d+/)[0]];
        indexGaji = state.fakturGaji.pengaturan_gaji.findIndex(gaji => gaji.id === parseInt(dataId))
        state.fakturGaji.pengaturan_gaji[indexGaji].nominal = value[idx]
        break
      case "komisi":
        if (!value[1] && !value[2]) {
          return
        }
        if (value[0] === -1) {
          state.fakturGaji.komisi.push({
            nama: value[1],
            nominal : value[2]
          })
        } else {
          state.fakturGaji.komisi[value[0]].nama = value[1]
          state.fakturGaji.komisi[value[0]].nominal = value[2]
        }
        break
    }
  });
}

export const SET_ACTIVE_MODAL = (state, payload) => {
  state.activeModal = payload
}

export const ON_CHANGE_MODAL_INPUT = (state, { target, value }) => {
  
  switch (target) {
    case "total_kehadiran":
      state.activeModal.value.kehadiran = value
      break
    case "gaji_pokok":
    case "gaji_tunjangan":
      state.activeModal.value.nominal = value
      break
    case "total_periode":
      state.activeModal.value.periode = value
      break
    case "komisi":
      state.activeModal.value[value.target] = value.val
      break
  }
}

export const HAPUS_KEHADIRAN  = (state) => {
  state.fakturGaji.total_kehadiran = 0
}
export const HAPUS_KOMISI = (state, { index }) => {
  state.fakturGaji.komisi.splice(index, 1)
}
export const ADD_TANGGUNGAN = (state, payload) => {
  state.fakturGaji.tanggungan.push(payload)
}
export const HAPUS_TANGGUNGAN = (state, { index }) => {
  state.fakturGaji.tanggungan.splice(index, 1)
}
export const SET_AFTERSAVE = (state, { data }) => {
  state.afterSave = data
} 