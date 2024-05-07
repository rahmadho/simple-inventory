export const formatRupiah = (number: string | number | null): string | 0 => {
    if (!number) return 0
    // const shouldNumber = (typeof number === 'string') ? parseFloat(number) : number
    return number.toLocaleString('id-ID', {minimumFractionDigits: 2})
}

export const formatTanggal = (tanggal: string | Date | null) => {
    if (!tanggal) return '-';
    return new Date(tanggal).toLocaleString("id-ID", {
        timeZone: "Asia/Jakarta",
        day: "numeric",
        month: "long",
        year: "numeric",
      })
}