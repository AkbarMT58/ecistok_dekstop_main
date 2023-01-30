const midtransResponse = (status) => {
  const data = [
    { status: 400, message: "Kesalahan validasi, dan data tidak valid" },
    {
      status: 401,
      message: "Akses ditolak, terjadi kesalahan transaksi",
    },
    {
      status: 402,
      message: "Tidak ada akses untuk pembayaran ini",
    },
    {
      status: 403,
      message:
        "Sumber daya yang diminta tidak mampu menghasilkan konten dalam format yang ditentukan dalam header permintaan.",
    },
    {
      status: 404,
      message: "transaksi yang diminta tidak ditemukan.",
    },
    {
      status: 405,
      message: "Metode HTTP tidak diizinkan",
    },
    {
      status: 406,
      message: "ID Pesanan telah digunakan, mohon coba lagi",
    },
    {
      status: 407,
      message: "Transaksi telah kedaluwarsa",
    },
    {
      status: 409,
      message:
        "Anda telah mengirim terlalu banyak transaksi untuk nomor kartu yang sama.",
    },
    {
      status: 411,
      message: "Token ID tidak valid",
    },
    {
      status: 412,
      message: "Anda tidak dapat mengubah status transaksi",
    },
    {
      status: 413,
      message: "Terjadi kesalahan payload pada saat melakukan request",
    },
    {
      status: 414,
      message:
        "Permintaan pengembalian dana ditolak karena dana pedagang tidak mencukupi.",
    },
    {
      status: 429,
      message: "Permintaan Request melampaui batas",
    },
    {
      status: 500,
      message: "Terjadi kesalahan pada server",
    },
    {
      status: 501,
      message: "Fitur tidak tersedia",
    },
    {
      status: 502,
      message: "Terjadi kesalahan pada server bank",
    },
    {
      status: 503,
      message: "Bank atau mitra mengalami masalah koneksi",
    },
    {
      status: 505,
      message: "Gagal membuat nomor VA yang diminta. Coba lagi nanti.",
    },
  ];

  const result = data.find((item) => item.status === parseInt(status));
  return result.message;
};

export default midtransResponse;
