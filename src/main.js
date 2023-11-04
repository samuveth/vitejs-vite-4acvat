import { createApp } from 'vue';
import './style.css';
import { UseWagmiPlugin, createConfig, mainnet } from 'use-wagmi';
import { createPublicClient, http } from 'viem';
import { InjectedConnector } from 'use-wagmi/connectors/injected';
import App from './App.vue';

const config = createConfig({
  autoConnect: true,
  publicClient: createPublicClient({
    chain: mainnet,
    transport: http(),
  }),
  connectors: [
    new InjectedConnector({
      options: {
        name: (detectedName) =>
          typeof detectedName === 'string'
            ? detectedName
            : detectedName.join(', '),
        shimDisconnect: true,
      },
    }),
  ],
});

const app = createApp(App);
app.use(UseWagmiPlugin, config);
app.mount('#app');
