export async function getBalance(address: string): Promise<string> {
    const response = await fetch(`/api/blockchain/get-balance?address=${address}`)
    const data = await response.json()
    if (response.ok) {
      return data.balance
    } else {
      throw new Error(data.error)
    }
  }
  
  export async function sendTransaction(to: string, value: string): Promise<string> {
    const response = await fetch('/api/blockchain/send-transaction', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ to, value }),
    })
    const data = await response.json()
    if (response.ok) {
      return data.transactionHash
    } else {
      throw new Error(data.error)
    }
  }
  
  export async function getTokenBalance(address: string, tokenAddress: string): Promise<{ balance: string, symbol: string }> {
    const response = await fetch(`/api/blockchain/token-balance?address=${address}&tokenAddress=${tokenAddress}`)
    const data = await response.json()
    if (response.ok) {
      return { balance: data.balance, symbol: data.symbol }
    } else {
      throw new Error(data.error)
    }
  }