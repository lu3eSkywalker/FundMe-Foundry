import React, { useState } from 'react'
import { ethers } from 'ethers';

const SendEth = () => {

    const [ethValue, setEthValue] = useState<string>('');
    const [txHash, setTxHash] = useState<string>('');

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
        setTxHash(tx.hash);
    }

  return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="bg-white shadow-md rounded-lg p-8 w-80">
                <h1 className="text-2xl font-bold mb-6 text-center">Save Info on Blockchain</h1>
                
                <input
                    type='number'
                    placeholder='ETH'
                    onChange={(e) => setEthValue(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <div className="min-h-8">
                    {txHash && (
                        <h2 className="text-lg font-semibold text-center break-words">
                            {`Tx Hash: ${txHash}`}
                        </h2>
                    )}
                </div>

                <button 
                    className="mt-6 w-full bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition"
                    onClick={() => sendEthToContract()}
                >
                    Send Eth
                </button>
            </div>
        </div>

  )
}

export default SendEth