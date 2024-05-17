import React from 'react'
import { Amount } from '../constants'

function page() {
  return (
    <div className='flex flex-col items-center '>
        <div className='w-24 h-24 bg-gray-200 text-center flex justify-center items-center'>Loading Icon</div>
        <p className='text-xl font-semibold py-5 text-gray-700'>Payment Initiated</p>
        <small className='text-center text-gray-400'>
            We've initiated your payment of GH{Amount} . Kindly check your phone and approved the payment. <br/> Thank you
        </small>
    </div>
  )
}

export default page