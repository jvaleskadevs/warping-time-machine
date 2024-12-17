import { Address, createPublicClient, http } from 'viem';
import { CHAIN, WTM_ADDRESS, WTM_ABI } from '../config';

const publicClient = createPublicClient({
  chain: CHAIN,
  transport: http()
})

export const getFirstTokenOf = async (address: Address): Promise<bigint | undefined> => {
  if (!address) return undefined;
  
  const data = await publicClient.readContract({
    address: WTM_ADDRESS,
    abi: WTM_ABI,
    functionName: "tokenOfOwnerByIndex",
    args: [address, '0']
  });
  
  return data as bigint ?? undefined;
}
