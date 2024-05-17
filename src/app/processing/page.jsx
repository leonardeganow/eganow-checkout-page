"use client"
import React, { useEffect, useState } from 'react'

import { getTransactionStatus } from '../api'
import Pending from '../components/Pending'
import Success from '../components/Success'
import Failed from '../components/Failed'

function page() {
    const savedTransactionId = localStorage.getItem('transactionId')
    const [transactionStatus, setTransactionStatus] = useState('PENDING');


    // FUNCTION TO CHECK TRANSACTION STATUS 
    const getStats = async () => {
        try {
            const resp = await getTransactionStatus(savedTransactionId);
            return resp.data.TransStatus;
        } catch (err) {
            console.error(err);
            return 'failed';
        }
    };

    useEffect(() => {
        const interval = setInterval(async () => {
            const status = await getStats();
            setTransactionStatus(status);
        }, 5000); // Check every 5 seconds

        // Clean up interval on component unmount
        return () => clearInterval(interval);
    }, []);

    const renderStatusComponent = () => {
        switch (transactionStatus) {
            case 'SUCCESSFUL':
                return <Success />;
            case 'FAILED':
                return <Failed />;
            default:
                return <Pending />;
        }
    };


    return (
        <div>
            {renderStatusComponent()}
        </div>
    )
}

export default page