import React from 'react'
import { Actions } from './actions';
import { BoothTable } from './table';

const BoothPage = async () => {
  return (
    <div className='mt-10'>
        <Actions />
        <div>
          <BoothTable />
        </div>
    </div>
  )
}

export default BoothPage