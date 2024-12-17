import { getFarcasterUserAddress } from '@coinbase/onchainkit/farcaster';
import { Address } from 'viem';
 
export const getFarcasterAddress = async (fid: number): Promise<Address | undefined> => {
  const addresses = await getFarcasterUserAddress(fid, {
    neynarApiKey: process.env.NEYNAR_API_KEY ?? 'ONCHAIN_KIT',
    hasVerifiedAddresses: false,
  });
  
  return addresses?.custodyAddress as Address ?? undefined;
}
