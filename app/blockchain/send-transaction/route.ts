import { NextResponse } from 'next/server'
import { ethers } from 'ethers'

const ETHEREUM_NODE_URL = process.env.ETHEREUM_NODE_URL || 'https://mainnet.infura.io/v3/YOUR-PROJECT-ID'
const PRIVATE_KEY = process.env.PRIVATE_KEY || 'your-private-key-here'

export async function POST(request: Request) {
  const { to, value } = await request.json()

  if (!to || !value) {
    return NextResponse.json({ error: 'To address and value are required' }, { status: 400 })
  }

  try {
    const provider = new ethers.JsonRpcProvider(ETHEREUM_NODE_URL)
    const wallet = new ethers.Wallet(PRIVATE_KEY, provider)

    const transaction = await wallet.sendTransaction({
      to: to,
      value: ethers.parseEther(value)
    })

    await transaction.wait()

    return NextResponse.json({ 
      message: 'Transaction sent successfully', 
      transactionHash: transaction.hash 
    })
  } catch (error) {
    console.error('Error sending transaction:', error)
    return NextResponse.json({ error: 'Failed to send transaction' }, { status: 500 })
  }
}