import { format } from "date-fns";

export function formatUpdatedAt(isoDateString : string) {
    const date = new Date(isoDateString);
    const formattedDate = date.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        weekday: 'long',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        timeZone: 'Asia/Jakarta'
    });

    return formattedDate;
}


export function formatDate(date: Date | undefined): string {
    if (!date) {
      return "";
    }
    return format(date, "dd/MM/yyyy");
  }
// // Contoh penggunaan:
// const updatedAt = '2023-11-11T21:28:55.469Z';
// const formattedUpdatedAt = formatUpdatedAt(updatedAt);

// console.log(formattedUpdatedAt); // Output: "Minggu, 12 - Nov - 2023 04.28.55"
