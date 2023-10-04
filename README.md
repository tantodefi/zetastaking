# Template for a ZetaChain Hardhat Project

This is a simple Hardhat template that provides a starting point for developing
smart contract applications on the ZetaChain blockchain.

## Prerequisites

Before getting started, ensure that you have
[Node.js](https://nodejs.org/en/download) and [Yarn](https://yarnpkg.com/)
installed on your system.

## Getting Started

To get started, install the necessary dependencies:

```
yarn
```

## Hardhat Tasks

This template includes Hardhat tasks that can be used make it easier to build
with ZetaChain.

### Generating a Random Wallet

To generate a random wallet:

```
npx hardhat account --save
```

This command generates a random wallet, prints information about the wallet to
the terminal, and saves the private key to a `.env` file to make it accessible
to Hardhat. If you don't want to save the wallet (for example, if you just need
an address to send tokens to for testing purposes), you can run the command
without the `--save` flag.

### Querying for Token Balances

To query for token balances:

```
npx hardhat balances
```

This command queries token balances for the account address derived from the
private key specified in the `.env`.

If you want to query for token balances for a different account, you can use the
`--address` flag:

```
npx hardhat balances --address ADDRESS
```

### Requesting Tokens from the Faucet

To request ZETA tokens from the faucet:

```
npx hardhat faucet
```

This command requests tokens from the faucet for the account address derived
from the private key specified in the `.env`. Tokens sent to the address on
ZetaChain. To specify a different chain use a flag:

```
npx hardhat faucet --chain goerli_testnet
```

You can also specify a different address to send the tokens to:

```
npx hardhat faucet --address ADDRESS
```

Alternatively, you can install a standalone faucet CLI:

```
yarn global add @zetachain/faucet-cli@athens3
```

You can then use it with the following command:

```
zetafaucet -h
```

### Creating an Omnichain Contract

To create a new omnichain contract:

```
npx hardhat omnichain MyContract
```

This command creates a new omnichain contract in `contracts/MyContract.sol`, a
task to deploy the contract in `tasks/deploy.ts`, and a task to interact with
the contract in `tasks/interact.ts`.

When an omnichain contract is called, it can receive data in the `data` field of
a transaction. This data is passed to the `message` parameter of the contract's
`onCrossChainCall` function. To specify the fields of the `message` parameter,
use positional arguments:

```
npx hardhat omnichain MyContract recepient:address description quantity:uint256
```

A field may have a type specified after the field name, separated by a colon. If
no type is specified, the type defaults to `bytes32`.

Learn more about omnichain contracts by following the
[tutorials](https://www.zetachain.com/docs/developers/omnichain/tutorials/hello/).

### Tracking a Cross-Chain Transaction

After broadcasting a cross-chain transaction on a connected chain either to a
cross-chain messaging contract or to trigger an omnichain contract, you can
track its status:

```
npx hardhat cctx --tx TX_HASH
```

### Verifying a Contract

To verify a contract deployed on ZetaChain:

```
npx hardhat verify:zeta --contract ADDRESS
```

Select the contract to verify:

```
? Select a contract to verify: (Use arrow keys)
  @zetachain/zevm-protocol-contracts/contracts/interfaces/IZRC20.sol:IZRC20
  @zetachain/zevm-protocol-contracts/contracts/interfaces/zContract.sol:zContract
❯ contracts/Withdraw.sol:Withdraw
```

After the confirmation the contract will be verified.

### Sending Tokens

Sending ZETA from ZetaChain to Goerli:

```
npx hardhat send-zeta --amount 1 --network zeta_testnet --destination goerli_testnet
```

Sending ZETA from Goerli to ZetaChain:

```
npx hardhat send-zeta --amount 1 --network goerli_testnet --destination zeta_testnet
```

Depositing gETH to ZetaChain as ZRC-20:

```
npx hardhat send-zrc20 --amount 1 --network goerli_testnet --destination zeta_testnet
```

Withdrawing ZRC-20 from ZetaChain go Goerli as gETH:

```
npx hardhat send-zrc20 --amount 1 --network zeta_testnet --destination goerli_testnet
```

Depositing tBTC from the Bitcoin testnet to ZetaChain:

```
npx hardhat send-btc --amount 1 --recipient TSS_ADDRESS --memo RECIPIENT_ADDRESS_WITHOUT_0x
```

## Next Steps

To learn more about building decentralized apps on ZetaChain, follow the
tutorials available in
[the documentation](https://www.zetachain.com/docs/developers/overview/).

NOTES: taken from https://www.zetachain.com/docs/developers/omnichain/tutorials/staking/

DEPLOYED ON MUMBAI:
npx hardhat deploy --network zeta_testnet --chain mumbai_testnet
🔑 Using account: 0x0aE7cf3B6D7321e6f7bb9f241C2C51c5701D5147

🚀 Successfully deployed contract on ZetaChain.
📜 Contract address: 0xCb862Af242d65AF1d2c33B3B68234f9E4D58Bf31
🌍 Explorer: https://athens3.explorer.zetachain.com/address/0xCb862Af242d65AF1d2c33B3B68234f9E4D58Bf31

npx hardhat set-beneficiary 0x0aE7cf3B6D7321e6f7bb9f241C2C51c5701D5147 --contract 0xCb862Af242d65AF1d2c33B3B68234f9E4D58Bf31 --network mumbai_testnet
🔑 Using account: 0x0aE7cf3B6D7321e6f7bb9f241C2C51c5701D5147


🚀 Successfully broadcasted a token transfer transaction on mumbai_testnet network.
📝 Transaction hash: 0xeb2b9a18e7f746dc56d48c661c522d10d26e74da82c775963b7cd968c92887e5

npx hardhat set-withdraw --contract 0xCb862Af242d65AF1d2c33B3B68234f9E4D58Bf31 --network mumbai_testnet
🔑 Using account: 0x0aE7cf3B6D7321e6f7bb9f241C2C51c5701D5147


🚀 Successfully broadcasted a token transfer transaction on mumbai_testnet network.
📝 Transaction hash: 0x29e343516607ea28a636e5f2ad9deeed4ae62f9febd7bdf2a9442903c91411da

TODOS:
Stake Tokens
npx hardhat stake --amount 0.1 --contract ADDRESS --network mumbai_testnet

Unstake Tokens
npx hardhat unstake --contract ADDRESS --network mumbai_testnet

DEPLOYED ON BTC_TESTNET

npx hardhat deploy --network zeta_testnet --chain btc_testnet
🔑 Using account: 0x0aE7cf3B6D7321e6f7bb9f241C2C51c5701D5147

🚀 Successfully deployed contract on ZetaChain.
📜 Contract address: 0x11af51687b2FBb9daacC893CfBE2690b60b5cB9B
🌍 Explorer: https://athens3.explorer.zetachain.com/address/0x11af51687b2FBb9daacC893CfBE2690b60b5cB9B

npx hardhat address tb1qp6kx5rjqfl6relt7wqg93jwc79q88z9rf4hm7m
Encoded: 0x7462317170366b7835726a71666c3672656c743777716739336a776337397138387a39726634686d376d
context.origin: 0x7462317170366b7835726a71666c3672656c7437

npx hardhat send-btc --memo 0aE7cf3B6D7321e6f7bb9f241C2C51c5701D514703 --amount 0.0 --recipient tb1qp6kx5rjqfl6relt7wqg93jwc79q88z9rf4hm7m
An unexpected error occurred:

Error: Not enough funds

