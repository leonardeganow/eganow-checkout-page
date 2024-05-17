import React from 'react'
import { Grid } from 'react-loader-spinner'
import { Amount } from '../constants'

function Pending() {
    return (
        <div className='flex flex-col items-center mt-5'>
            <div className='w-24 h-24 text-center flex justify-center items-center'><Grid
                visible={true}
                height="80"
                width="80"
                color="lightgray"
                ariaLabel="grid-loading"
                radius="12.5"
                wrapperClass="grid-wrapper"
            /></div>
            <p className='text-xl font-semibold py-5 text-gray-700'>Payment Initiated</p>
            <small className='text-center text-gray-400'>
                We've initiated your payment of GH{Amount} . Kindly check your phone and approved the payment. <br /> Thank you
            </small>
        </div>
    )
}

export default Pending