import { create } from 'ipfs-http-client';

const ipfs = create({ url: process.env.IPFS_API_URL });

export async function uploadToIPFS(buffer) {
  const { path } = await ipfs.add(buffer);
  return path; // IPFS hash
}
