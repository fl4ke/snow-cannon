#!/usr/bin/env node

const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const program = require('commander');
const TronWeb = require('tronweb');
const TronGrid = require('trongrid');

const CURVY_ADDR = "TWjkoz18Y48SgWoxEeGG11ezCCzee8wo1A";
const TRON_NODE = "https://api.trongrid.io";
const SOLIDITY_NODE = "https://api.trongrid.io";

clear();
console.log(
    chalk.red(
        figlet.textSync('snow-cannon', { horizontalLayout: 'full' })
    )
);

program
    .version('0.0.1')
    .description("An example CLI for ordering pizza's")
    .option('-r, --round', 'Get Current round info')
    .option('-i, --info <address>', 'Get player stats')
    .parse(process.argv);


if (!process.argv.slice(2).length) {
    program.outputHelp();
}

const tronWeb = new TronWeb(TRON_NODE, SOLIDITY_NODE);
// Using curvy's address as the fallback address for the request
tronWeb.setAddress(CURVY_ADDR);
const tronGrid = new TronGrid(tronWeb);

const main = async () => {
    if (program.info) {
        console.log(program.info);
        try {
            await displayBalances(program.info);
        } catch (e) {
            console.error(e);
        }
    }
    if (program.round) {
        try {
            await displayCurrentRoundInfo();
        } catch (e) {
            console.error(e);
        }
    }
};

const displayBalances = async (userAddress: string) => {
    tronWeb.setAddress(userAddress);

    const contract = await tronWeb
        .contract()
        .at(CURVY_ADDR);

    const userBalance = await tronWeb.trx.getBalance(userAddress);
    console.log(`Players wallet balance: ${ formatNumber(userBalance / 1000000) } trx`);

    const currentRoundNumber = await getCurrentRoundNumber(contract);
    const dividendsOf = await getDividendsOf(contract, userAddress, currentRoundNumber);
    const playerMetadataOf = await getPlayerMetadata(contract, userAddress);
    const players = await getPlayerInfo(contract, userAddress);

    console.log(`Player stats: 
     current earnings: ${ formatNumber(dividendsOf / 1000000) } trx
     ticketsOwned: ${ formatNumber(playerMetadataOf.ticketsOwned / 1000000) },
     experienceTotal: ${ formatNumber(players.experienceTotal / 1000000) },
     experienceNextRound: ${ formatNumber(players.experienceNextRound / 1000000) }
     experienceToSpend: ${ formatNumber(players.experienceToSpend / 1000000) }
     automaticallyUpgrade: ${ formatNumber(players.automaticallyUpgrade) }
     lastInteraction: ${ new Date(players.lastInteraction * 1000) }
     Position: ${ formatNumber(playerMetadataOf.myPosition) }
     backing: ${ formatNumber(playerMetadataOf.backing / 1000000) }`);
};

const displayCurrentRoundInfo = async () => {
    const contract = await tronWeb
        .contract()
        .at(CURVY_ADDR);

    const currentRoundData = await getCurrentRoundInfoData(contract);
    console.log(`currentRoundData:
     endsAt: ${ new Date(currentRoundData.endsAt * 1000) },
     grandPrize: ${ formatNumber(currentRoundData.grandPrize / 1000000) }
     leaderBonus: ${ formatNumber(currentRoundData.leaderBonus / 1000000) }
     ticketsBought: ${ formatNumber(currentRoundData.ticketsBought / 1000000) }
     ticketsRedeemed: ${ formatNumber(currentRoundData.ticketsRedeemed / 1000000) }
     totalParticipants: ${ formatNumber(currentRoundData.totalParticipants) }
     hasEnded: ${ currentRoundData.hasEnded }
     unredeemedBacking: ${ formatNumber(currentRoundData.unredeemedBacking / 1000000) }
     bombValue: ${ formatNumber(currentRoundData.bombValue / 1000000) }
     bombFuseCounter: ${ formatNumber(currentRoundData.bombFuseCounter / 1000000) }
     totalTransactionCount: ${ formatNumber(currentRoundData.totalTransactionCount) }
     roundNumber: ${ formatNumber(currentRoundData.roundNumber) }
     totalTronPledged: ${ formatNumber(currentRoundData.totalTronPledged / 1000000) }`);
};

const getPlayerInfo = async (contract: any, userAddress: string) => {
    return await contract.Players(userAddress).call();
};

const getPlayerMetadata = async (contract: any, userAddress: string) => {
    return await contract.playerMetadataOf(userAddress).call();
};

const getCurrentRoundNumber = async (contract: any) => {
    return await contract.currentRoundNumber().call();
};

const getDividendsOf = async (contract: any, userAddress: string, currentRoundNumber: number,
                              includeBonus: boolean = true) => {
    return await contract.dividendsOf(currentRoundNumber, userAddress, includeBonus).call();
};

const getCurrentRoundInfoData = async (contract: any) => {
    return await contract.currentRoundData().call();
};

const formatNumber = (n: number): string => {
    return n.toLocaleString();
};

main();
