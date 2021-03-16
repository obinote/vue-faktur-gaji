export default {
  rekening : {},
  afterSave: {},
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
}