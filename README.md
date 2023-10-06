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


npx hardhat stake --amount 0.01 --contract 0xCb862Af242d65AF1d2c33B3B68234f9E4D58Bf31 --network mumbai_testnet
🔑 Using account: 0x0aE7cf3B6D7321e6f7bb9f241C2C51c5701D5147


🚀 Successfully broadcasted a token transfer transaction on mumbai_testnet network.
📝 Transaction hash: 0x44850a91f7c52b121c2faa5e6d63bcc23bd7229156ceb0dd79f458e945a7aa7a

TODOS:
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

npx hardhat send-btc --memo 11af51687b2FBb9daacC893CfBE2690b60b5cB9B03 --amount 0.0 --recipient tb1qp6kx5rjqfl6relt7wqg93jwc79q88z9rf4hm7m

Transaction:

02000000000102e6b76b8be1feb6190b4d3f32a1a5d2e0cc175ab93762ad8fbdf3e015ecf7dd4b0000000000ffffffff0435e58cd4de0f8a765b47f5d9325b1dee0798adb5db268c77937a781522700e0100000000ffffffff0300000000000000001600140eac6a0e404ff43cfd7e701058c9d8f1407388a30000000000000000176a1511af51687b2fbb9daacc893cfbe2690b60b5cb9b0370170000000000001600140eac6a0e404ff43cfd7e701058c9d8f1407388a302483045022100bde66ea7e9f5f66539028f54b49ef47436b0b4326d6f72e1d6e2377a48f4e51e022023671a44ee597e61ff86ee2f1642325e1a99d4b3af88d1a1e338c392a12f8cd3012103c1e35408b65f784d01d931ded8f593381970c247d0c435c1acdca6373bfb102902483045022100aeb3af68b7b9d36cea7c066f0072f1c7a2e84ecdb6989082cc02b33a5e313174022017c76e5f5ab64518a0c4c2e85b9bbf32e4ad9d2e6c5f5f3ee6b75fe1231154af012103c1e35408b65f784d01d931ded8f593381970c247d0c435c1acdca6373bfb102900000000

Decoded transaction:

{
  "block_height": -1,
  "block_index": -1,
  "hash": "9141c73a807bb5e5e8884662e1271c50a3b75f40faae6cf6bfdba4eb96f2954e",
  "addresses": [
    "tb1qp6kx5rjqfl6relt7wqg93jwc79q88z9rf4hm7m"
  ],
  "total": 6000,
  "fees": 10000,
  "size": 404,
  "vsize": 241,
  "preference": "low",
  "relayed_by": "204.83.229.94",
  "received": "2023-10-05T22:05:35.601550239Z",
  "ver": 2,
  "double_spend": false,
  "vin_sz": 2,
  "vout_sz": 3,
  "data_protocol": "unknown",
  "confirmations": 0,
  "inputs": [
    {
      "prev_hash": "4bddf7ec15e0f3bd8fad6237b95a17cce0d2a5a1323f4d0b19b6fee18b6bb7e6",
      "output_index": 0,
      "output_value": 8000,
      "sequence": 4294967295,
      "addresses": [
        "tb1qp6kx5rjqfl6relt7wqg93jwc79q88z9rf4hm7m"
      ],
      "script_type": "pay-to-witness-pubkey-hash",
      "age": 2530378,
      "witness": [
        "3045022100bde66ea7e9f5f66539028f54b49ef47436b0b4326d6f72e1d6e2377a48f4e51e022023671a44ee597e61ff86ee2f1642325e1a99d4b3af88d1a1e338c392a12f8cd301",
        "03c1e35408b65f784d01d931ded8f593381970c247d0c435c1acdca6373bfb1029"
      ]
    },
    {
      "prev_hash": "0e702215787a93778c26dbb5ad9807ee1d5b32d9f5475b768a0fded48ce53504",
      "output_index": 1,
      "output_value": 8000,
      "sequence": 4294967295,
      "addresses": [
        "tb1qp6kx5rjqfl6relt7wqg93jwc79q88z9rf4hm7m"
      ],
      "script_type": "pay-to-witness-pubkey-hash",
      "age": 2504626,
      "witness": [
        "3045022100aeb3af68b7b9d36cea7c066f0072f1c7a2e84ecdb6989082cc02b33a5e313174022017c76e5f5ab64518a0c4c2e85b9bbf32e4ad9d2e6c5f5f3ee6b75fe1231154af01",
        "03c1e35408b65f784d01d931ded8f593381970c247d0c435c1acdca6373bfb1029"
      ]
    }
  ],
  "outputs": [
    {
      "value": 0,
      "script": "00140eac6a0e404ff43cfd7e701058c9d8f1407388a3",
      "addresses": [
        "tb1qp6kx5rjqfl6relt7wqg93jwc79q88z9rf4hm7m"
      ],
      "script_type": "pay-to-witness-pubkey-hash"
    },
    {
      "value": 0,
      "script": "6a1511af51687b2fbb9daacc893cfbe2690b60b5cb9b03",
      "addresses": null,
      "script_type": "null-data",
      "data_hex": "11af51687b2fbb9daacc893cfbe2690b60b5cb9b03"
    },
    {
      "value": 6000,
      "script": "00140eac6a0e404ff43cfd7e701058c9d8f1407388a3",
      "addresses": [
        "tb1qp6kx5rjqfl6relt7wqg93jwc79q88z9rf4hm7m"
      ],
      "script_type": "pay-to-witness-pubkey-hash"
    }
  ]
}

Transaction hash: 9141c73a807bb5e5e8884662e1271c50a3b75f40faae6cf6bfdba4eb96f2954e

npx hardhat send-btc --memo 11af51687b2FBb9daacC893CfBE2690b60b5cB9B047462317170366b7835726a71666c3672656c743777716739336a776337397138387a39726634686d376d --amount 0.0 --recipient tb1qp6kx5rjqfl6relt7wqg93jwc79q88z9rf4hm7m

Transaction:

020000000001034e95f296eba4dbbff66caefa405fb7a3501c27e1624688e8e5b57b803ac741910000000000ffffffff4e95f296eba4dbbff66caefa405fb7a3501c27e1624688e8e5b57b803ac741910200000000ffffffff812db456aa8a019d1415094b1e910261b5086e5b33d69cde21c43c7c12de6b0d0100000000ffffffff0300000000000000001600140eac6a0e404ff43cfd7e701058c9d8f1407388a30000000000000000416a3f11af51687b2fbb9daacc893cfbe2690b60b5cb9b047462317170366b7835726a71666c3672656c743777716739336a776337397138387a39726634686d376da00f0000000000001600140eac6a0e404ff43cfd7e701058c9d8f1407388a30248304502210087b93d2835d687ca9b8c10366c3305ec40369df9695c917f5e0b41179d228a3a0220095be958a2c229a8efec95f7251e45eb6840257c52a9622e0f31ed98b1eef302012103c1e35408b65f784d01d931ded8f593381970c247d0c435c1acdca6373bfb1029024730440220490d748d0e8f681dc094f24c148e922b64324da3f16befc610926914711cc5720220325249074ed27b7fc90e2328fdd440f98d16bab57a1b28fb7d1574e199272da7012103c1e35408b65f784d01d931ded8f593381970c247d0c435c1acdca6373bfb1029024830450221009f09aabab4b3a9514a795e6a2038807f3bb7d47911b135517dcb6f505b5085b7022020ae49a7e21b748109de8e5b12e89653564b1597ca1c6c3b18f7d0abc67873a7012103c1e35408b65f784d01d931ded8f593381970c247d0c435c1acdca6373bfb102900000000

Decoded transaction:

{
  "block_height": -1,
  "block_index": -1,
  "hash": "31f48f934fac0d2735151b054d69d1e14651093901be192f51e2a614bcb41375",
  "addresses": [
    "tb1qp6kx5rjqfl6relt7wqg93jwc79q88z9rf4hm7m"
  ],
  "total": 4000,
  "fees": 10000,
  "size": 594,
  "vsize": 351,
  "preference": "low",
  "relayed_by": "204.83.229.94",
  "received": "2023-10-05T22:10:55.193760691Z",
  "ver": 2,
  "double_spend": false,
  "vin_sz": 3,
  "vout_sz": 3,
  "data_protocol": "unknown",
  "confirmations": 0,
  "inputs": [
    {
      "prev_hash": "9141c73a807bb5e5e8884662e1271c50a3b75f40faae6cf6bfdba4eb96f2954e",
      "output_index": 0,
      "sequence": 4294967295,
      "addresses": [
        "tb1qp6kx5rjqfl6relt7wqg93jwc79q88z9rf4hm7m"
      ],
      "script_type": "pay-to-witness-pubkey-hash",
      "age": 2530379,
      "witness": [
        "304502210087b93d2835d687ca9b8c10366c3305ec40369df9695c917f5e0b41179d228a3a0220095be958a2c229a8efec95f7251e45eb6840257c52a9622e0f31ed98b1eef30201",
        "03c1e35408b65f784d01d931ded8f593381970c247d0c435c1acdca6373bfb1029"
      ]
    },
    {
      "prev_hash": "9141c73a807bb5e5e8884662e1271c50a3b75f40faae6cf6bfdba4eb96f2954e",
      "output_index": 2,
      "output_value": 6000,
      "sequence": 4294967295,
      "addresses": [
        "tb1qp6kx5rjqfl6relt7wqg93jwc79q88z9rf4hm7m"
      ],
      "script_type": "pay-to-witness-pubkey-hash",
      "age": 2530379,
      "witness": [
        "30440220490d748d0e8f681dc094f24c148e922b64324da3f16befc610926914711cc5720220325249074ed27b7fc90e2328fdd440f98d16bab57a1b28fb7d1574e199272da701",
        "03c1e35408b65f784d01d931ded8f593381970c247d0c435c1acdca6373bfb1029"
      ]
    },
    {
      "prev_hash": "0d6bde127c3cc421de9cd6335b6e08b56102911e4b0915149d018aaa56b42d81",
      "output_index": 1,
      "output_value": 8000,
      "sequence": 4294967295,
      "addresses": [
        "tb1qp6kx5rjqfl6relt7wqg93jwc79q88z9rf4hm7m"
      ],
      "script_type": "pay-to-witness-pubkey-hash",
      "age": 2530347,
      "witness": [
        "30450221009f09aabab4b3a9514a795e6a2038807f3bb7d47911b135517dcb6f505b5085b7022020ae49a7e21b748109de8e5b12e89653564b1597ca1c6c3b18f7d0abc67873a701",
        "03c1e35408b65f784d01d931ded8f593381970c247d0c435c1acdca6373bfb1029"
      ]
    }
  ],
  "outputs": [
    {
      "value": 0,
      "script": "00140eac6a0e404ff43cfd7e701058c9d8f1407388a3",
      "addresses": [
        "tb1qp6kx5rjqfl6relt7wqg93jwc79q88z9rf4hm7m"
      ],
      "script_type": "pay-to-witness-pubkey-hash"
    },
    {
      "value": 0,
      "script": "6a3f11af51687b2fbb9daacc893cfbe2690b60b5cb9b047462317170366b7835726a71666c3672656c743777716739336a776337397138387a39726634686d376d",
      "addresses": null,
      "script_type": "null-data",
      "data_hex": "11af51687b2fbb9daacc893cfbe2690b60b5cb9b047462317170366b7835726a71666c3672656c743777716739336a776337397138387a39726634686d376d"
    },
    {
      "value": 4000,
      "script": "00140eac6a0e404ff43cfd7e701058c9d8f1407388a3",
      "addresses": [
        "tb1qp6kx5rjqfl6relt7wqg93jwc79q88z9rf4hm7m"
      ],
      "script_type": "pay-to-witness-pubkey-hash"
    }
  ]
}

Transaction hash: 31f48f934fac0d2735151b054d69d1e14651093901be192f51e2a614bcb41375

npx hardhat verify:zeta --contract 0x11af51687b2FBb9daacC893CfBE2690b60b5cB9B
? Select a contract to verify: contracts/Staking.sol:Staking
✅ Contract verified: https://athens3.explorer.zetachain.com/address/0x11af51687b2FBb9daacC893CfBE2690b60b5cB9B