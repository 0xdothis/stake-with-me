import { STAKING_CONTRACT_ABI } from "@/constant/STAKING_CONTRACT_ABI";
import { createPublicClient, createWalletClient, http } from "viem";
import { sepolia } from "viem/chains";
import { TOKEN_CONTRACT_ABI } from "@/constant/TOKEN_CONTRACT_ABI";

export const publicClient = createPublicClient({
  chain: sepolia,
  transport: http(import.meta.env.VITE_ALCHEMY_RPC_URL),
});

export const walletClient = createWalletClient({
  chain: sepolia,
  transport: http(import.meta.env.VITE_ALCHEMY_RPC_URL),
});

export const contractData = {
  contractAddress: import.meta.env.VITE_STAKE_EASY_CONTRACT,
  contractABI: STAKING_CONTRACT_ABI,
};

export const tokenData = {
  tokenAddress: import.meta.env.VITE_STAKE_EASY_TOKEN_CONTRACT,
  tokenABI: TOKEN_CONTRACT_ABI,
};
