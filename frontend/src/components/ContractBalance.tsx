import React, { useState } from 'react'
import { ethers } from 'ethers';

const ContractBalance = () => {

    const [contractBalance, setContractBalance] = useState<number>(0);

    const RPC_URL = process.env.NEXT_PUBLIC_RPC_URL;
    const PRIVATE_KEY = process.env.NEXT_PUBLIC_PRIVATE_KEY;
    const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;

    const ABI = [
        "function getEthInSmartContract() public view returns (uint)"
    ];

    const provider = new ethers.JsonRpcProvider(RPC_URL);
    const wallet = new ethers.Wallet(PRIVATE_KEY || '', provider);
    const contract = new ethers.Contract(CONTRACT_ADDRESS || '', ABI, wallet);

    async function getBalance() {
        const tx = await contract.getEthInSmartContract();

        const ethBalance = parseInt(tx.toString()) / 10**18;
        console.log(ethBalance);
        setContractBalance(ethBalance);
    }

  return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white shadow-md rounded-lg p-8">
        <div>
                <button 
                    onClick={() => getBalance()}
                    className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 w-full mb-4"
                >Get Balance</button>

                <br></br>
                <br></br>

                <p className="text-lg font-semibold text-center">{contractBalance}</p>

            </div>
        </div>
        </div>
  )
}

export default ContractBalance