import React from 'react';
import { ethers } from 'ethers';

const GetAddressToEthFunded = () => {

  const RPC_URL = process.env.NEXT_PUBLIC_RPC_URL;
  const PRIVATE_KEY = process.env.NEXT_PUBLIC_PRIVATE_KEY;
  const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;

  const ABI = [
    "function getAllFundersWithAddress() public view returns(uint[] memory)"
  ];

  const provider = new ethers.JsonRpcProvider(RPC_URL);
  const wallet = new ethers.Wallet(PRIVATE_KEY || '', provider);

  const contract = new ethers.Contract(CONTRACT_ADDRESS || '', ABI, wallet);

  async function getAddressWithEth() {
    const addEth = await contract.getAllFundersWithAddress();
    // console.log(addEth.toString());
    console.log(addEth);
  }

  return (
    <div>
      <button onClick={() => getAddressWithEth()}>AddWithEth</button>
    </div>
  )
}

export default GetAddressToEthFunded