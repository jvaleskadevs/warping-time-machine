import { Abi, Address, parseEther } from 'viem';
import { base/*, baseSepolia*/ } from 'viem/chains'; 
import { wtmAbi } from './abis/wtmAbi';

const LOCALHOST_URL: string = 'http://localhost:3000';
const PRODUCTION_URL: string = 'https://warping-time-machine.vercel.app';
export const SITE_URL: string = 
  process.env.NODE_ENV === 'development' ? LOCALHOST_URL : PRODUCTION_URL;

/*
const useTestnet = false;  
export const CHAIN = 
  useTestnet === true ? baseSepolia : base;
*/
export const CHAIN = base;
  
export const WTM_ADDRESS: Address = "0xfe359890D3dc037E79290967d8338C8944C78e28" as Address;
export const WTM_ABI: Abi = wtmAbi as Abi;

export const WTM_FIXED_DEPOSIT_AMOUNT = parseEther('0.00069').toString();
