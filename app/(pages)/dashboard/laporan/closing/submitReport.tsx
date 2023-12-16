"use client"
import { Button } from "@/components/ui/button";

export const SubmitReport = ({ 
    date,
    location,
    revenueTotal,
    idTracking,
    quantityTotal,
    disable
 } : {
    date: string,
    location: string,
    idTracking: string,
    revenueTotal: number,
    quantityTotal: number,
    disable: boolean
 }) => {


  const sendWhatsAppMessage = () => {
    const phoneNumber = "6281290493785";

    const today = date
    const booth = location;
    const revenue = revenueTotal;
    const productsSold = quantityTotal;
    const reportDetailLink = `http://localhost:3000/dashboard/laporan/laporan-harian/${idTracking}`;

    const message = `
      Assalamualaikum wr. wb

      Saya mengirimkan laporan penjualan hari ini, tanggal ${today} :
      Booth: ${booth},
      Pendapatan hari ini: ${revenue},
      Produk terjual: ${productsSold},
      Laporan Detail: 
      ${reportDetailLink}
    `;

    const whatsappURL = `https://wa.me/${phoneNumber}/?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, "_blank");
  };

  return (
    <div className="mt-5 mb-10 w-full flex items-center justify-end">
      <Button onClick={sendWhatsAppMessage} disabled={disable}>Kirim Laporan</Button>
    </div>
  );
};
