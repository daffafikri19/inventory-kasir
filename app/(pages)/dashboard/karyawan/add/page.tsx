import React from 'react'
import { Card, CardContent } from '@/components/ui/card'

import RegisterForm from '../registerForm'

export default function RegisterPage() {
    return (
        <div className='w-full min-h-screen mt-10'>
            <Card className='w-full'>
                <CardContent className='w-full'>
                    <RegisterForm />
                </CardContent>
            </Card>
        </div>
    )
}
