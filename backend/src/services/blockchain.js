import Web3 from 'web3';
import fs from 'fs';
import path from 'path';

const web3 = new Web3(process.env.BLOCKCHAIN_RPC_URL);
const contractABI = JSON.parse(fs.readFileSync(path.resolve('smart-contracts', 'artifacts', 'contracts', 'AyurTrace.sol', 'AyurTrace.json'))).abi;
const contractAddress = process.env.CONTRACT_ADDRESS;
const contract = new web3.eth.Contract(contractABI, contractAddress);

export async function logSupplyChainEvent(eventType, batchId, dataHash, from, privateKey) {
  const tx = contract.methods.logEvent(eventType, batchId, dataHash);
  const gas = await tx.estimateGas({ from });
  const data = tx.encodeABI();
  const nonce = await web3.eth.getTransactionCount(from);
  const signed = await web3.eth.accounts.signTransaction({
    to: contractAddress,
    data,
    gas,
    nonce
  }, privateKey);
  const receipt = await web3.eth.sendSignedTransaction(signed.rawTransaction);
  return receipt;
}
