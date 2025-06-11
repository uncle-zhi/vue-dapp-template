<template>
  <div>
  
    <a-button @click="getBalance">读取余额</a-button>
    <a-button @click="getEthBalance" style="margin-left:10px;">读取钱包ETH余额</a-button>

    <p v-if="CONTRACT_ADDRESS">合约地址：{{ CONTRACT_ADDRESS }}</p>
    <p v-if="balance !== null">合约余额：{{ balance }}</p>
    <p v-if="ethBalance !== null">钱包ETH余额：{{ ethBalance }}</p>
        <!-- 新增：发送ETH功能 -->
    <div style="margin-top:20px;">
      <a-textarea id="sendTo" auto-size v-model:value="sendTo" placeholder="请输入接收地址" style="width:260px;"/>
      <a-input id="sendAmount" v-model:value="sendAmount" placeholder="ETH数量" style="width:120px; margin-left:10px;"/>
      <a-button @click="sendEth" style="margin-left:10px;">发送ETH</a-button>
      <a-button @click="checkEth" style="margin-left:10px;">查看接收地址的余额</a-button>
      <p v-if="sendStatus">{{ sendStatus }}</p>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { ethers } from 'ethers'
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '../config'

export default {
  setup() {
    const balance = ref(null)
    const ethBalance = ref(null)
    const sendTo = ref('')
    const sendAmount = ref('')
    const sendStatus = ref('')
    const getBalance = async () => {
      if (!window.ethereum) {
        balance.value = '未检测到钱包'
        return
      }
      try {
        // 请求用户授权
        await window.ethereum.request({ method: 'eth_requestAccounts' })
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = await provider.getSigner()
        //const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer)
        // const result = await contract.getBalance?.()
        const balanceBigNumber = await provider.getBalance(CONTRACT_ADDRESS)
        console.log('合约余额:', balanceBigNumber);
        balance.value = ethers.utils.formatEther(balanceBigNumber)+'ETH'
      } catch (e) {
        console.error('读取合约余额失败:', e);
        balance.value = '读取失败'
      }
    }

    
    // 新增：查询钱包ETH余额
    const getEthBalance = async () => {
      if (!window.ethereum) {
        ethBalance.value = '未检测到钱包'
        return
      }
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' })
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = await provider.getSigner()
        const address = await signer.getAddress()
        const balanceBigNumber = await provider.getBalance(address)
        ethBalance.value = ethers.utils.formatEther(balanceBigNumber) + ' ETH'
      } catch (e) {
        console.error('读取ETH余额失败:', e);
        ethBalance.value = '读取失败'
      }
    }
    // 新增：发送ETH功能
    const sendEth = async () => {
      sendStatus.value = ''
      if (!window.ethereum) {
        sendStatus.value = '未检测到钱包'
        return
      }
      if (!ethers.utils.isAddress(sendTo.value)) {
        console.log('无效的以太坊地址:', sendTo);
        sendStatus.value = '请输入有效的以太坊地址'+sendTo.value
        return
      }
      if (!sendAmount.value || isNaN(sendAmount.value) || Number(sendAmount.value) <= 0) {
        sendStatus.value = '请输入正确的ETH数量'
        return
      }
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' })
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = await provider.getSigner()
        const tx = await signer.sendTransaction({
          to: sendTo.value,
          value: ethers.utils.parseEther(sendAmount.value)
        })
        sendStatus.value = '交易已发送，等待确认中...'
        await tx.wait()
        sendStatus.value = '发送成功，交易哈希：' + tx.hash
      } catch (e) {
        console.error('发送ETH失败:', e);
        sendStatus.value = '发送失败: ' + (e.message || e)
      }
    }
    const checkEth = async () => {
      if (!window.ethereum) {
        sendStatus.value = '未检测到钱包'
        return
      }
      if (!ethers.utils.isAddress(sendTo.value)) {
        console.log('无效的以太坊地址:', sendTo.value);
        sendStatus.value = '请输入有效的以太坊地址'
        return
      }
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const balanceBigNumber = await provider.getBalance(sendTo.value)
        const balanceInEth = ethers.utils.formatEther(balanceBigNumber)
        sendStatus.value = `接收地址 ${sendTo.value} 的余额为: ${balanceInEth} ETH`
      } catch (e) {
        console.error('查询接收地址余额失败:', e);
        sendStatus.value = '查询失败: ' + (e.message || e)
      }
    }
    return { getBalance, balance, CONTRACT_ADDRESS, getEthBalance, ethBalance, sendTo, sendAmount, sendEth, sendStatus, checkEth }
  },
}
</script>
