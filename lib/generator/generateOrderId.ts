
import { v4 as uuidv4 } from 'uuid';

export const generateOrderId = (date: Date) => {
    const days = ['senin', 'selasa', 'rabu', 'kamis', 'jumat', 'sabtu', 'minggu'];
    const dayIndex = date.getDay();
    const day = days[dayIndex];
    const dateNumber = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const unikId = uuidv4();

    const result =  `${dayIndex + 1}-${dateNumber}-${month}-${year}-${unikId}`;
    console.log("hasil generate order id", result);

    return result
}