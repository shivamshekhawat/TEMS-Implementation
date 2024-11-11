'use client'

import { useState } from 'react'
import { getBalance, sendTransaction, getTokenBalance } from '../services/blockchain'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export function BlockchainInteraction() {
  const [address, setAddress] = useState('')
  const [balance, setBalance] = useState('')
  const [toAddress, setToAddress] = useState('')
  const [amount, setAmount] = useState('')
  const [tokenAddress, setTokenAddress] = useState('')
  const [tokenBalance, setTokenBalance] = useState('')
  const [tokenSymbol, setTokenSymbol] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const handleGetBalance = async () => {
    try {
      if (!address) {
        setErrorMessage('Please enter a valid Ethereum address.')
        return
      }
      const result = await getBalance(address)
      setBalance(result)
      setErrorMessage('')
    } catch (error) {
      console.error('Error getting balance:', error)
      setErrorMessage('Failed to retrieve balance. Please try again.')
    }
  }

  const handleSendTransaction = async () => {
    try {
      if (!toAddress || !amount) {
        setErrorMessage('Please enter a valid address and amount.')
        return
      }
      const txHash = await sendTransaction(toAddress, amount)
      alert(`Transaction sent! Hash: ${txHash}`)
      setErrorMessage('')
    } catch (error) {
      console.error('Error sending transaction:', error)
      setErrorMessage('Failed to send transaction. Please try again.')
    }
  }

  const handleGetTokenBalance = async () => {
    try {
      if (!address || !tokenAddress) {
        setErrorMessage('Please enter a valid address and token address.')
        return
      }
      const result = await getTokenBalance(address, tokenAddress)
      setTokenBalance(result.balance)
      setTokenSymbol(result.symbol)
      setErrorMessage('')
    } catch (error) {
      console.error('Error getting token balance:', error)
      setErrorMessage('Failed to retrieve token balance. Please try again.')
    }
  }

  return (
    <div className="space-y-4">
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}

      <div>
        <Input
          type="text"
          placeholder="Ethereum Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <Button onClick={handleGetBalance}>Get Balance</Button>
        {balance !== '' && <p>Balance: {balance} ETH</p>}
      </div>

      <div>
        <Input
          type="text"
          placeholder="To Address"
          value={toAddress}
          onChange={(e) => setToAddress(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Amount in ETH"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <Button onClick={handleSendTransaction}>Send Transaction</Button>
      </div>

      <div>
        <Input
          type="text"
          placeholder="Token Address (ERC-20)"
          value={tokenAddress}
          onChange={(e) => setTokenAddress(e.target.value)}
        />
        <Button onClick={handleGetTokenBalance}>Get Token Balance</Button>
        {tokenBalance !== '' && tokenSymbol && (
          <p>Token Balance: {tokenBalance} {tokenSymbol}</p>
        )}
      </div>
    </div>
  )
}
