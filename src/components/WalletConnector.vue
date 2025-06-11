<template>
  <div>
    <p v-if="connected">
      <a-button @click="disconnect" class="wallet-btn">断开连接</a-button>
      ✅ 已连接：{{ account }}
    </p>
    <p v-else>
    <a-button  @click="connect" class="wallet-btn">连接钱包</a-button>
    ❌ 未连接钱包
    </p>
  </div>
</template>

<script>
import { ref } from 'vue'
import { ethers } from 'ethers'

export default {
  setup() {
    const account = ref('')
    const connected = ref(false)

    const connect = async () => {
      if (window.ethereum) {
        try {
          const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
          account.value = accounts[0]
          connected.value = true
        } catch (error) {
          console.error('连接钱包失败:', error)
        }
      } else {
        alert('请先安装 MetaMask 钱包插件')
      }
    }
    // 新增断开连接功能
    const disconnect = () => {
      account.value = ''
      connected.value = false
    }

    return { connect,disconnect, account, connected }
  },
}
</script>
<style scoped>
.wallet-btn {
  margin: 20px;
  /* 你也可以设置左右padding，比如：padding-left: 20px; padding-right: 20px; */
}
</style>
