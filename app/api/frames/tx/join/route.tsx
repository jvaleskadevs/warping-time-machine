import { NextRequest, NextResponse } from 'next/server';
import { 
  FrameRequest,
  FrameTransactionResponse, 
  FrameTransactionEthSendParams ,
  getFrameMessage  
} from '@coinbase/onchainkit/frame';
import { Address, encodeFunctionData } from 'viem';
import { 
  CHAIN,
  WTM_ABI, 
  WTM_ADDRESS, 
  WTM_FIXED_DEPOSIT_AMOUNT
} from '../../../../config';
import { getFirstTokenOf } from '../../../../lib/getFirstTokenOf'; 
import { getFarcasterAddress } from '../../../../lib/getFarcasterAddress'; 
import { ownerOf } from '../../../../lib/ownerOf'; 
import { Errors } from '../../../../errors';

async function getResponse(req: NextRequest): Promise<NextResponse> {
  const frameRequest: FrameRequest = await req.json();
  const { isValid, message } = await getFrameMessage(frameRequest, {
    neynarApiKey: process.env.NEYNAR_API_KEY ?? 'ONCHAIN_KIT'
  });
  if (!isValid) return NextResponse.json({ message: Errors.NoValidMessage }, { status: 400 });
  
  // get the fid and the custody address of the caller
  const fid: number | undefined = message?.interactor?.fid || undefined;
  console.log(fid);
  if (!fid) return NextResponse.json({ message: Errors.NoAddress }, { status: 400 });
  //const address: Address | undefined = message?.interactor?.custody_address as Address || undefined;
  const address: Address | undefined = await getFarcasterAddress(fid);
  console.log(address);  
  if (!address) return NextResponse.json({ message: Errors.NoAddress }, { status: 400 });
  
  const text = message?.input || '';  
  console.log(text);
  
  let tokenId;
  if (text) {
    tokenId = parseInt(text);
    if ((await ownerOf(tokenId))?.toLowerCase() !== address) return NextResponse.json({ message: Errors.NoDFBC }, { status: 400 });
  } else {
    tokenId = await getFirstTokenOf(address);  
  }

  if (!tokenId) return NextResponse.json({ message: Errors.NoDFBC }, { status: 400 });
  
  // create transaction data for calling the deposit function
  const data = encodeFunctionData({
    abi: WTM_ABI,
    functionName: 'joinPool',
    args: [tokenId]
  });
  
  const txData: FrameTransactionResponse = {
    chainId: `eip155:${CHAIN.id}`,
    method: 'eth_sendTransaction',
    params: {
      abi: WTM_ABI,
      data,
      to: WTM_ADDRESS,
      value: WTM_FIXED_DEPOSIT_AMOUNT
    } as FrameTransactionEthSendParams
  };
      
  return NextResponse.json(txData); 
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = 'force-dynamic';
