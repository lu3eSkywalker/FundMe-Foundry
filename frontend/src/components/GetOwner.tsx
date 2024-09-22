import React, { useEffect, useState } from 'react'
import { ethers } from 'ethers';

const GetOwner = () => {

  const [contractOwner, setContractOwner] = useState<string>('');

    const RPC_URL = process.env.NEXT_PUBLIC_RPC_URL;
    const PRIVATE_KEY = process.env.NEXT_PUBLIC_PRIVATE_KEY;
    const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;

    const ABI = [
        "function getOwner() public view returns (address)"
    ];

    const provider = new ethers.JsonRpcProvider(RPC_URL);
    const wallet = new ethers.Wallet(PRIVATE_KEY || '', provider);
    const contract = new ethers.Contract(CONTRACT_ADDRESS || '', ABI, wallet);

    useEffect(() => {
      getContractOwnerAddress();
    }, []);

    async function getContractOwnerAddress() {
        const getOwner = await contract.getOwner();
        console.log(getOwner.toString());
        setContractOwner(getOwner.toString());
    }

  return (
    <div>


      <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="bg-white shadow-md rounded-lg p-8 w-80">
                <h1 className="text-2xl font-bold mb-6 text-center">Contract Owner</h1>
                  <div className="text-gray-700 font-bold break-words word-break w-full bg-gray-100 p-2 border border-gray-300 rounded-md mb-4">
                  {contractOwner}
                  </div>
            </div>
        </div>
    </div>
  )
}

export default GetOwner