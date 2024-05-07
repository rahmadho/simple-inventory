export const formatRupiah = (number: string | number) => {
    // const shouldNumber = (typeof number === 'string') ? parseFloat(number) : number
    return number.toLocaleString('id-ID', {minimumFractionDigits: 2})
}

export const formatTanggal = (tanggal: string) => {
    return new Date(tanggal).toLocaleString("id-ID", {
        timeZone: "Asia/Jakarta",
        day: "numeric",
        month: "long",
        year: "numeric",
      })
}