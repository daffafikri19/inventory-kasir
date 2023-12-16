import React from 'react'
import AddStokForm from '../addStokForm'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

const AddInventoryPage = async () => {

    const session = await getServerSession(authOptions);

    return (
        <div>
            <AddStokForm location={session?.user.location} label='Tambah Stok' />
        </div>
    )
}

export default AddInventoryPage