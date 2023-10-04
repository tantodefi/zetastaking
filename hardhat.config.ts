import "./tasks/interact";
import "./tasks/stake";
import "./tasks/address";
import "./tasks/beneficiary";
import "./tasks/claim";
import "./tasks/deploy";
import "./tasks/unstake";
import "./tasks/withdraw";
import "@nomicfoundation/hardhat-toolbox";
import "@zetachain/toolkit/tasks";

import { getHardhatConfigNetworks } from "@zetachain/networks";
import { HardhatUserConfig } from "hardhat/config";

const config: HardhatUserConfig = {
  networks: {
    ...getHardhatConfigNetworks(),
  },
  solidity: "0.8.7",
};

export default config;
