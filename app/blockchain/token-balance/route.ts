import { NextResponse } from 'next/server'
import { ethers } from 'ethers'

const ETHEREUM_NODE_URL = process.env.ETHEREUM_NODE_URL || 'https://mainnet.infura.io/v3/YOUR-PROJECT-ID'

// ERC20 Token ABI (Application Binary Interface)
const ERC20_ABI = [
  "function balanceOf(address owner) view returns (uint256)",
  "function decimals() view returns (uint8)",
  "function symbol() view returns (string)"
]

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const address = searchParams.get('address')
  const tokenAddress = searchParams.get('tokenAddress')

  if (!address || !tokenAddress) {
    return NextResponse.json({ error: 'Address and token address parameters are required' }, { status: 400 })
  }

  try {
    const provider = new ethers.JsonRpcProvider(ETHEREUM_NODE_URL)
    const contract = new ethers.Contract(tokenAddress, ERC20_ABI, provider)

    const [balance, decimals, symbol] = await Promise.all([
      contract.balanceOf(address),
      contract.decimals(),
      contract.symbol()
    ])

    const formattedBalance = ethers.formatUnits(balance, decimals)

    return NextResponse.json({ 
      address, 
      tokenAddress, 
      balance: formattedBalance, 
      symbol 
    })
  } catch (error) {
    console.error('Error fetching token balance:', error)
    return NextResponse.json({ error: 'Failed to fetch token balance' }, { status: 500 })
  }
}