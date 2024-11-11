import { NextResponse } from 'next/server'
import { ethers } from 'ethers'

// Replace with your Ethereum node URL (e.g., Infura or Alchemy)
const ETHEREUM_NODE_URL = process.env.ETHEREUM_NODE_URL || 'https://mainnet.infura.io/v3/YOUR-PROJECT-ID'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const address = searchParams.get('address')

  if (!address) {
    return NextResponse.json({ error: 'Address parameter is required' }, { status: 400 })
  }

  try {
    const provider = new ethers.JsonRpcProvider(ETHEREUM_NODE_URL)
    const balance = await provider.getBalance(address)
    const balanceInEther = ethers.formatEther(balance)

    return NextResponse.json({ address, balance: balanceInEther })
  } catch (error) {
    console.error('Error fetching balance:', error)
    return NextResponse.json({ error: 'Failed to fetch balance' }, { status: 500 })
  }
}