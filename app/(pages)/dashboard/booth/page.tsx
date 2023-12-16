import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/use-toast'
import React from 'react'
import { BoothTable } from './table';
import { boothProps } from '@/types';
import axios from 'axios';
import { CircleDashedIcon } from 'lucide-react';

// export const getBoothData = async () => {
//   try {
//     const response = await axios.get('/api/booth/get');
//     return response.data
//   } catch (error) {
//     toast({
//       title: 'terjadi kesalahan server saat mendapatkan data booth',
//       variant: 'destructive'
//     })
//     return
//   }
// }

const BoothPage = async () => {

  // if(!data) {
  //   return (
  //     <div className='w-full h-full flex items-center justify-center'>
  //       <CircleDashedIcon className='w-10 h-10 animate-spin text-black dark:text-white' />
  //     </div>
  //   )
  // }

  return (
    <div>
        <Button>Add New Booth</Button>
        <BoothTable />
    </div>
  )
}

export default BoothPage