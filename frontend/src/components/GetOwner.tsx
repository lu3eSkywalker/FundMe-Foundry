import React from 'react'
import { ethers } from 'ethers';

const GetOwner = () => {

    const RPC_URL = process.env.NEXT_PUBLIC_RPC_URL;
    const PRIVATE_KEY = process.env.NEXT_PUBLIC_PRIVATE_KEY;
    const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;

    const ABI = [
        "function getOwner() public view returns (address)"
    ];

    const provider = new ethers.JsonRpcProvider(RPC_URL);
    const wallet = new ethers.Wallet(PRIVATE_KEY || '', provider);
    const contract = new ethers.Contract(CONTRACT_ADDRESS || '', ABI, wallet);

    async function getContractOwnerAddress() {
        const getOwner = await contract.getOwner();
        console.log(getOwner.toString());
    }


  return (
    <div>
        <button onClick={() => getContractOwnerAddress()}>Get Contract Owner</button>
    </div>
  )
}

export default GetOwner