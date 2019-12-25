#!/usr/bin/env node
declare const chalk: any;
declare const clear: any;
declare const figlet: any;
declare const program: any;
declare const ethers: any;
declare const TronWeb: any;
declare const TronGrid: any;
declare const rp: any;
declare const contracts: any;
declare const TRON_NODE = "https://api.trongrid.io";
declare const SOLIDITY_NODE = "https://api.trongrid.io";
declare const CURVY_INTERFACE: any;
declare const VANITY_INTERFACE: any;
declare const CONTRACTS: Map<any, any>;
declare const tronWeb: any;
declare const tronGrid: any;
declare const main: () => Promise<void>;
declare const formatNumber: (n: number) => string;
declare const displayBalances: (userAddress: string) => Promise<void>;
declare const displayCurrentRoundInfo: () => Promise<void>;
declare const displayRecentTransactions: (address: string) => Promise<void>;
declare const getPlayerInfo: (contract: any, userAddress: string) => Promise<any>;
declare const getPlayerMetadata: (contract: any, userAddress: string) => Promise<any>;
declare const getCurrentRoundNumber: (contract: any) => Promise<any>;
declare const getDividendsOf: (contract: any, userAddress: string, currentRoundNumber: number, includeBonus?: boolean) => Promise<any>;
declare const getCurrentRoundInfoData: (contract: any) => Promise<any>;
declare const getRecentTransactionData: (userAddress: string) => Promise<{
    status: any;
    value: string;
    operation: any;
    inputs: {
        name: number;
        value: any;
    }[];
}[] | undefined>;
declare const resolveRefName: (contract: any, userAddress: string) => Promise<any>;
declare const parseArguments: (inputs: any, args: any) => {
    name: number;
    value: any;
}[];
