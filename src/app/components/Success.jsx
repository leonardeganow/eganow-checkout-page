import React from 'react'
import success from '../../../public/sucess.gif'
import animation from '../../../public/Animation.json'
import Lottie from 'react-lottie';
import Link from 'next/link'
import Image from 'next/image'

function Success() {
    const defaultOptions = {
        loop: false,
        autoplay: true, 
        animationData: animation,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice'
        }
      };


    return (
        <div className='flex flex-col items-center mt-5'>
            <div className='w-auto h-24 text-center flex justify-center items-center'>
            <Lottie options={defaultOptions}
              height={200}
              width={200}/>
            </div>
            <p className='text-xl font-semibold py-2 text-green-500'>Payment Successful !</p>
            <small className='text-center text-gray-400 p-3 mb-4'>Thank you for your purchase. Your order has been placed successfully and is being processed.</small>
           <div>
            <Link href={'#'} className='bg-blue-500 my-4 px-4 py-2 text-white shadow'>Return to Merchant</Link>
           </div>
        </div>
    )
}

export default Success