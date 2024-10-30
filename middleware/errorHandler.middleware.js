// middleware/error.middleware.js
export const errorMiddleware = (err, req, res, next) => {
  //   console.log("Error middleware terpicu:", err);
  // Tentukan status kode HTTP jika tidak ada
  const statusCode = err.status || 500;

  // Tentukan pesan error yang lebih ramah pengguna
  let errorMessage;

  if (statusCode === 500) {
    errorMessage = "Terjadi kesalahan di server";
  } else if (statusCode === 404) {
    errorMessage = "Data tidak ditemukan.";
  } else if (statusCode === 400) {
    errorMessage =
      "Permintaan tidak valid. Mohon periksa kembali data yang Anda kirim.";
  } else {
    errorMessage = err.message || "Terjadi kesalahan.";
  }

  // Kirim respons dengan pesan yang sudah disesuaikan
  res.status(statusCode).json({
    success: false,
    message: errorMessage,
    error: {
      code: err.status,
      description: err.message,
    },
  });
};
