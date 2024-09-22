import React, { useState } from 'react'
import { ethers } from 'ethers';

const GetFunder = () => {

    const [funderIndex, setFunderIndex] = useState<string>('');

    const [showAddress, setShowAddress] = useState<string>('');

    const RPC_URL = process.env.NEXT_PUBLIC_RPC_URL;
    const PRIVATE_KEY = process.env.NEXT_PUBLIC_PRIVATE_KEY;
    const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;

    const ABI = [
        "function getFunder(uint256 index) public view returns (address)"
    ];

    const provider = new ethers.JsonRpcProvider(RPC_URL);
    const wallet = new ethers.Wallet(PRIVATE_KEY || '', provider);
    const contract = new ethers.Contract(CONTRACT_ADDRESS || '', ABI, wallet);

    async function getFunderByIndex() {
        const index = parseInt(funderIndex);
        const getFunder = await contract.getFunder(index);
        console.log(getFunder.toString());
        setShowAddress(getFunder.toString());
    }

  return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="bg-white shadow-md rounded-lg p-8 w-80">
            <h1 className="text-2xl font-bold mb-6 text-center">Get Funder by Index</h1>
            
            <input
                type='number'
                placeholder='Index'
                onChange={(e) => setFunderIndex(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <br></br>
            <br></br>


            {showAddress}


            <br></br>
            <br></br>

            <button 
                className="mt-6 w-full bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition"
                onClick={() => getFunderByIndex()}
            > Get Funder</button>

        </div>
        </div>
  )
}

export default GetFunder;