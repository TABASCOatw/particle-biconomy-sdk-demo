<div align="center">
  <a href="https://particle.network/">
    <img src="https://i.imgur.com/xmdzXU4.png" />
  </a>
  <h3>
    Particle Biconomy SDK Demo
  </h3>
</div>

⚡️ Example application showcasing the utilization of Biconomy's `@biconomy/particle-auth` SDK to facilitate social login alongside the assignment of a smart account and eventually the execution of a sample UserOperation (a gasless burn of 0.001 ETH).

Built using **Biconomy Particle Auth SDK**, **TypeScript**, **React**

## 🔑 Particle Auth
Particle Auth, a component of Particle Network's Wallet-as-a-Service, enables seamless onboarding to an application-embedded MPC-TSS/AA wallet facilitated by social login, such as Google, GitHub, email, phone number, etc.

##

👉 Try the demo: https://web-demo.particle.network

👉 Learn more about Particle Network: https://particle.network

![Particle Auth Example](https://i.imgur.com/FkCIgZO.png)

## 🛠️ Quickstart

### Clone this repository
```
git clone https://github.com/TABASCOatw/particle-biconomy-sdk-demo.git
```

### Install dependencies
```
yarn install
```
OR
```
npm install
```

### Set environment variables
This project requires a number of keys from Particle Network and WalletConnect to be defined in `.env`. The following should be defined:
- `REACT_APP_APP_ID`, the ID of the corresponding application in your [Particle Network dashboard](https://dashboard.particle.network/#/applications).
- `REACT_APP_PROJECT_ID`, the ID of the corresponding project in your [Particle Network dashboard](https://dashboard.particle.network/#/applications).
-  `REACT_APP_CLIENT_KEY`, the client key of the corresponding project in your [Particle Network dashboard](https://dashboard.particle.network/#/applications).
-  `REACT_APP_DAPP_API_KEY`, a paymaster API key retrieved from the [Biconomy dashboard](https://dashboard.biconomy.io)

### Start the project
```
npm run dev
```
OR
```
yarn dev
```