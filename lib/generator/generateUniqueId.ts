
import { v4 as uuidv4 } from 'uuid';

export const generateTrackingId = (date: Date) => {
    const dayIndex = date.getDay();
    const dateNumber = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const unikId = uuidv4();
    const result =  `${unikId}-${dayIndex + 1}-${dateNumber}-${month}-${year}`;
    return result
}