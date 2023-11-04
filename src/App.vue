<script setup>
import { ref } from 'vue';
import { useAccount, useConnect, useDisconnect } from 'use-wagmi';
import { InjectedConnector } from 'use-wagmi/connectors/injected';

const { address, isConnected, isConnecting } = useAccount({
  onConnect({ connector }) {
    console.log(connector);
    connector?.getProvider();
  },
});
const { connect, connectors } = useConnect({
  onSuccess({ connector }) {
    console.log(connector);
    connector?.getProvider();
  },
});
const { disconnect } = useDisconnect();
</script>

<template>
  <div>
    <div v-if="isConnected">
      Connected to {{ address }}
      <button @click="disconnect">Disconnect</button>
    </div>
    <button v-else @click="connect({ connector: connectors[0] })">
      Connect Wallet
    </button>
  </div>
</template>
