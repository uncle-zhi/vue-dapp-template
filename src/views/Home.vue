<template>
  <main>
   <div class="wallet-connector-wrapper">
      <WalletConnector />
    </div>
    <h1>🦊 DApp 示例 - Vue + JS</h1>
    <ContractInteractor />
       <router-link to="/new">
      <a-button>跳转到新页面</a-button>
    </router-link>
  </main>
</template>

<script>
import WalletConnector from '../components/WalletConnector.vue'
import ContractInteractor from '../components/ContractInteractor.vue'

export default {
  components: {
    WalletConnector,
    ContractInteractor,
  },
}
</script>
<style>
.wallet-connector-wrapper {
  display: flex;
  justify-content: flex-start;
  top: 16px;
  left: 16px;
  z-index: 1000;
}
main {
  min-height: 100vh;
}
</style>