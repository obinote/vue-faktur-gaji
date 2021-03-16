export const FAKTUR_GAJI = (state) => {
  return state.fakturGaji
}

export const LIST_BANK = (state) => {
  return state.pembayaran.listBank
}

export const LIST_MODAL = (state) => {
  return state.modalList
}

export const ACTIVE_MODAL = (state) => {
  return state.activeModal
}

export const SUB_TOTAL_GAJI = (state) => {
  let subTotal = state.fakturGaji.pengaturan_gaji.reduce(function(prev, cur) {
    let nominalGaji = cur.id === 1 ? parseInt(cur.nominal) * state.fakturGaji.total_periode : cur.nominal * state.fakturGaji.total_kehadiran
    
    return prev + parseInt(nominalGaji)
  }, 0)

  return subTotal
}

export const SUB_TOTAL_UPAH = (state) => {
  let subTotal = state.fakturGaji.pengaturan_upah.reduce(function(prev, cur) {
    return prev + parseInt(cur.nominal)
  }, 0)

  return subTotal
}

export const SUB_TOTAL_KOMISI = (state) => {
  let subTotal = state.fakturGaji.komisi.reduce(function(prev, cur) {
    return prev + parseInt(cur.nominal)
  }, 0)

  return subTotal
}

export const SUB_TOTAL_TANGGUNGAN = (state) => {
  let subTotal = state.fakturGaji.tanggungan.reduce(function(prev, cur) {
    return prev + parseInt(cur.nominal)
  }, 0)

  return subTotal
}

export const BRUTO_GAJI = (state, getters) => {
  return getters.SUB_TOTAL_GAJI + getters.SUB_TOTAL_KOMISI + getters.SUB_TOTAL_UPAH
}

export const NET_GAJI = (state, getters) => {
  return getters.BRUTO_GAJI - getters.SUB_TOTAL_TANGGUNGAN
}

export const formatNumber = (state) => {
  return gaji => {
    if (gaji !== '' || gaji !== undefined || gaji !== 0 || gaji !== '0' || gaji !== null) {
        return gaji.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    
    return gaji
  }
}

export const detailBorongan = (state) => {
  return boronganId => {
    let upah = state.fakturGaji.pengerjaan_upah.find(upah => upah.pengaturan_upah_id === boronganId);
    return `${upah.nominal}${upah.satuan}`
  }
}

export const AFTERSAVE = (state) => {
  return state.afterSave
}

export const SUB_GAJI = (state) => {
  let subTotal = state.afterSave.pengaturan_gaji.reduce(function(prev, cur) {
    let nominalGaji = cur.id === 1 ? parseInt(cur.nominal) * state.afterSave.total_periode : cur.nominal * state.afterSave.total_kehadiran
    
    return prev + parseInt(nominalGaji)
  }, 0)

  return subTotal
}

export const SUB_UPAH = (state) => {
  let subTotal = state.afterSave.pengaturan_upah.reduce(function(prev, cur) {
    return prev + parseInt(cur.nominal)
  }, 0)

  return subTotal
}

export const SUB_KOMISI = (state) => {
  let subTotal = state.afterSave.komisi.reduce(function(prev, cur) {
    return prev + parseInt(cur.nominal)
  }, 0)

  return subTotal
}

export const SUB_TANGGUNGAN = (state) => {
  let subTotal = state.afterSave.tanggungan.reduce(function(prev, cur) {
    return prev + parseInt(cur.nominal)
  }, 0)

  return subTotal
}

export const GAJI_KOTOR = (state, getters) => {
  return getters.SUB_GAJI + getters.SUB_KOMISI + getters.SUB_UPAH
}

export const GAJI_BERSIH = (state, getters) => {
  return getters.GAJI_KOTOR - getters.SUB_TANGGUNGAN
}

export const itemBorongan = (state) => {
  return boronganId => {
    let upah = state.afterSave.pengerjaan_upah.find(upah => upah.pengaturan_upah_id === boronganId);
    return `${upah.nominal}${upah.satuan}`
  }
}
