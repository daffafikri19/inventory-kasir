export function formatNominal(price : number) {
    const formattedPrice = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  
    return formattedPrice;
}
  
  // Contoh penggunaan:
//   const priceTotal = 36000;
//   console.log(formatNominal(priceTotal)); // Output: Rp. 36.000
  
//   const largePrice = 1500000;
//   console.log(formatNominal(largePrice)); // Output: Rp. 1.500.000
  