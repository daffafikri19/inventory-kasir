import React from 'react'
import { ProductList } from './products'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export default async function KasirPage() {

  const session = await getServerSession(authOptions);

  return (
    <div className='w-full h-full'>
      <div>
        <div className='rounded-sm'>
            <ProductList fullname={session?.user.fullname} location={session?.user.location} role={session?.user.role} karyawanId={session?.user.karyawanId} />
        </div>
      </div>
    </div>
  )
}
