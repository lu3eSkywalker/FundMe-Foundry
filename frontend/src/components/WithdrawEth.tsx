import React, { useState } from 'react';
import { ethers } from 'ethers';

const WithdrawEth = () => {
    const [ethValue, setEthValue] = useState<string>('');

    const RPC_URL = process.env.NEXT_PUBLIC_RPC_URL;
    const PRIVATE_KEY = process.env.NEXT_PUBLIC_PRIVATE_KEY;
    const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;

    const ABI = [
        "function fund() public payable"
    ];

    const provider = new ethers.JsonRpcProvider(RPC_URL);
    const wallet = new ethers.Wallet(PRIVATE_KEY || '', provider);
    const contract = new ethers.Contract(CONTRACT_ADDRESS || '', ABI, wallet);

    async function sendEthToContract() {
        const valueInWei = ethers.parseEther(ethValue);
        const tx = await contract.fund({
            value: valueInWei
        });
        await tx.wait();
        console.log(tx.hash);
    }

  return (
    <div>
                <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-md">
                <h1 className="text-2xl font-semibold mb-6 text-center text-gray-800">Save Info on Blockchain</h1>
                
                <input
                    type='number'
                    placeholder='ETH'
                    onChange={(e) => setEthValue(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <button 
                    className="mt-6 w-full bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition"
                    onClick={() => sendEthToContract()}>Send Eth</button>
            </div>
        </div>
    </div>
  )
}

export default WithdrawEth