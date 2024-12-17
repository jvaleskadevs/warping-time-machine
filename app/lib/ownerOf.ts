import { Address, createPublicClient, http } from 'viem';
import { CHAIN, DFBC_ADDRESS, DFBC_ABI } from '../config';

const publicClient = createPublicClient({
  chain: CHAIN,
  transport: http()
})

export const ownerOf = async (tokenId: number): Promise<Address | undefined> => {
  if (!tokenId) return undefined;
  
  const data = await publicClient.readContract({
    address: DFBC_ADDRESS,
    abi: DFBC_ABI,
    functionName: "ownerOf",
    args: [tokenId]
  });
  
  return data as Address ?? undefined;
}
