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
declare const CONVERSION_FACTOR = 1000000;
declare const MS_IN_SECOND = 1000;
declare const tronWeb: any;
declare const tronGrid: any;
declare const main: () => Promise<void>;
declare const formatNumber: (n: number) => string;
declare const displayBalances: (user: string) => Promise<void>;
declare const displayCurrentRoundInfo: () => Promise<void>;
declare const displayRecentTransactions: (user: string) => Promise<void>;
declare const displayAddressFromVanity: (vanity: string) => Promise<void>;
declare const getPlayerInfo: (contract: any, userAddress: string) => Promise<{
    experienceTotal: number;
    experienceNextRound: number;
    experienceToSpend: number;
    automaticallyUpgrade: any;
    lastInteraction: Date;
}>;
declare const getPlayerMetadata: (contract: any, userAddress: string) => Promise<{
    ticketsOwned: number;
    myPosition: any;
    backing: number;
}>;
declare const getCurrentRoundNumber: (contract: any) => Promise<number>;
declare const getDividendsOf: (contract: any, userAddress: string, currentRoundNumber: number, include2XBonus?: boolean) => Promise<number>;
declare const getCurrentRoundInfoData: (contract: any) => Promise<{
    endsAt: Date;
    grandPrize: number;
    leaderBonus: number;
    ticketsBought: number;
    ticketsRedeemed: number;
    totalParticipants: any;
    hasEnded: any;
    unredeemedBacking: number;
    bombValue: number;
    bombFuseCounter: number;
    totalTransactionCount: any;
    roundNumber: any;
    totalTronPledged: number;
}>;
declare const getRecentTransactionData: (userAddress: string, limit?: number) => Promise<{
    status: any;
    value: string;
    operation: any;
    inputs: {
        name: number;
        value: any;
    }[];
}[] | undefined>;
declare const resolveRefName: (contract: any, userAddress: string) => Promise<any>;
declare const resolveAddress: (contract: any, refName: string) => Promise<any>;
declare const getTronBalance: (userAddress: string) => Promise<number>;
declare const parseArguments: (inputs: any, args: any) => {
    name: number;
    value: any;
}[];
