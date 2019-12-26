#!/usr/bin/env node

const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const program = require('commander');
const ethers = require('ethers');
const TronWeb = require('tronweb');
const TronGrid = require('trongrid');
const rp = require('request-promise');
const contracts = require('../contracts.json');

const TRON_NODE = "https://api.trongrid.io";
const SOLIDITY_NODE = "https://api.trongrid.io";

const CURVY_INTERFACE = new ethers.utils.Interface(contracts.curvy.abi);
const VANITY_INTERFACE = new ethers.utils.Interface(contracts.vanity.abi);

const CONTRACTS = new Map();
CONTRACTS.set(contracts.curvy.contract, CURVY_INTERFACE);
CONTRACTS.set(contracts.vanity.contract, VANITY_INTERFACE);

const CONVERSION_FACTOR = 1000000;
const MS_IN_SECOND = 1000;

clear();
console.log(
    chalk.red(
        figlet.textSync('snow-cannon', { horizontalLayout: 'full' })
    )
);

program
    .version('0.0.3')
    .description("Command line tool to troubleshoot just.game")
    .option('-r, --round', 'Get Current round info')
    .option('-i, --info <address>', 'Get player stats')
    .option('-t, --transactions <address>', 'Get recent just.game related transactions')
    .parse(process.argv);


if (!process.argv.slice(2).length) {
    program.outputHelp();
}

const tronWeb = new TronWeb(TRON_NODE, SOLIDITY_NODE);
// Using curvy's address as the fallback address for the request
tronWeb.setAddress(contracts.curvy.address);
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
    if (program.transactions) {
        try {
            await displayRecentTransactions(program.transactions);
        } catch (e) {
            console.error(e);
        }
    }
};

const formatNumber = (n: number): string => {
    return n.toLocaleString();
};

const displayBalances = async (userAddress: string) => {
    tronWeb.setAddress(userAddress);

    const contract = await tronWeb
        .contract()
        .at(contracts.curvy.address);

    const userBalance = await getTronBalance(userAddress);
    console.log(`Players wallet balance: ${ formatNumber(userBalance) } trx`);

    try {
        const contract = await tronWeb
            .contract()
            .at(contracts.vanity.address);

        const vanity = await resolveRefName(contract, userAddress);
        console.log(`Players Vanity Name: ${ vanity }`);
    } catch (e) {
    }

    const currentRoundNumber = await getCurrentRoundNumber(contract);
    const dividendsOf = await getDividendsOf(contract, userAddress, currentRoundNumber);
    const playerMetadataOf = await getPlayerMetadata(contract, userAddress);
    const players = await getPlayerInfo(contract, userAddress);

    console.log(`Player stats: 
     current earnings: ${ formatNumber(dividendsOf) } trx
     ticketsOwned: ${ formatNumber(playerMetadataOf.ticketsOwned) },
     experienceTotal: ${ formatNumber(players.experienceTotal) },
     experienceNextRound: ${ formatNumber(players.experienceNextRound) }
     experienceToSpend: ${ formatNumber(players.experienceToSpend) }
     automaticallyUpgrade: ${ players.automaticallyUpgrade }
     lastInteraction: ${ players.lastInteraction }
     Position: ${ formatNumber(playerMetadataOf.myPosition) }
     backing: ${ formatNumber(playerMetadataOf.backing) }`);
};

const displayCurrentRoundInfo = async () => {
    const contract = await tronWeb
        .contract()
        .at(contracts.curvy.address);

    const currentRoundData = await getCurrentRoundInfoData(contract);
    console.log(`currentRoundData:
     endsAt: ${ currentRoundData.endsAt },
     grandPrize: ${ formatNumber(currentRoundData.grandPrize) }
     leaderBonus: ${ formatNumber(currentRoundData.leaderBonus) }
     ticketsBought: ${ formatNumber(currentRoundData.ticketsBought) }
     ticketsRedeemed: ${ formatNumber(currentRoundData.ticketsRedeemed) }
     ticketsRedeemed / ticketsBought:  ${ formatNumber(currentRoundData.ticketsRedeemed /
        currentRoundData.ticketsBought * 100) }%
     totalParticipants: ${ formatNumber(currentRoundData.totalParticipants) }
     hasEnded: ${ currentRoundData.hasEnded }
     unredeemedBacking: ${ formatNumber(currentRoundData.unredeemedBacking) }
     bombValue: ${ formatNumber(currentRoundData.bombValue) }
     bombFuseCounter: ${ formatNumber(currentRoundData.bombFuseCounter) }
     roundNumber: ${ formatNumber(currentRoundData.roundNumber) }
     totalTronPledged: ${ formatNumber(currentRoundData.totalTronPledged) }`);
};

const displayRecentTransactions = async (address: string) => {
    const transactions = await getRecentTransactionData(address);
    if (transactions) {
        console.log(`Recent transactions:`);
        for (const tx of transactions) {
            console.log(`  ${ tx.status } ${ tx.value } trx ${ tx.operation }`);
            for (const input of tx.inputs) {
                console.log(`    ${ input.name } ${ input.value }`);
            }
        }
    }
};

const getPlayerInfo = async (contract: any, userAddress: string) => {
    const data = await contract.Players(userAddress).call();
    return {
        experienceTotal: data.experienceTotal / CONVERSION_FACTOR,
        experienceNextRound: data.experienceNextRound / CONVERSION_FACTOR,
        experienceToSpend: data.experienceToSpend / CONVERSION_FACTOR,
        automaticallyUpgrade: data.automaticallyUpgrade,
        lastInteraction: new Date(data.lastInteraction * MS_IN_SECOND),
    };
};

const getPlayerMetadata = async (contract: any, userAddress: string) => {
    const data = await contract.playerMetadataOf(userAddress).call();
    return {
        ticketsOwned: data.ticketsOwned / CONVERSION_FACTOR,
        myPosition: data.myPosition,
        backing: data.backing / CONVERSION_FACTOR,
    }
};

const getCurrentRoundNumber = async (contract: any) => {
    return await contract.currentRoundNumber().call();
};

const getDividendsOf = async (contract: any, userAddress: string, currentRoundNumber: number,
                              includeBonus: boolean = true) => {
    return (await contract.dividendsOf(currentRoundNumber, userAddress, includeBonus).call()) / CONVERSION_FACTOR;
};

const getCurrentRoundInfoData = async (contract: any) => {
    const data = await contract.currentRoundData().call();
    return {
        endsAt: new Date(data.endsAt * MS_IN_SECOND),
        grandPrize: data.grandPrize / CONVERSION_FACTOR,
        leaderBonus: data.leaderBonus / CONVERSION_FACTOR,
        ticketsBought: data.ticketsBought / CONVERSION_FACTOR,
        ticketsRedeemed: data.ticketsRedeemed / CONVERSION_FACTOR,
        totalParticipants: data.totalParticipants,
        hasEnded: data.hasEnded,
        unredeemedBacking: data.unredeemedBacking / CONVERSION_FACTOR,
        bombValue: data.bombValue / CONVERSION_FACTOR,
        bombFuseCounter: data.bombFuseCounter / CONVERSION_FACTOR,
        totalTransactionCount: data.totalTransactionCount,
        roundNumber: data.roundNumber,
        totalTronPledged: data.totalTronPledged / CONVERSION_FACTOR,
    };
};

const getRecentTransactionData = async (userAddress: string, limit: number = 200) => {
    let data = [];
    const options = {
        method: 'GET',
        uri: `https://api.trongrid.io/v1/accounts/${ userAddress }/transactions?only_from=true&limit=${ limit }`,
        json: true,
    };
    const resp = await rp(options);
    if (resp.success) {
        for (const tx of resp.data) {
            if (tx.raw_data.contract[0].type === "TriggerSmartContract") {
                const contractAddress = tx.raw_data.contract[0].parameter.value.contract_address.slice(2);
                const abiInterface = CONTRACTS.get(contractAddress);
                if (abiInterface) {
                    const decodedTx = abiInterface.parseTransaction({
                        data: "0x" + tx.raw_data.contract[0].parameter.value.data
                    });
                    const funcAbi = abiInterface.functions[decodedTx.name];
                    let callValue = tx.raw_data.contract[0].parameter.value.call_value;
                    if (!callValue) {
                        callValue = 0;
                    }
                    data.push({
                        status: tx.ret[0].code,
                        value: formatNumber(callValue / CONVERSION_FACTOR),
                        operation: decodedTx.name,
                        inputs: parseArguments(funcAbi.inputs, decodedTx.args),
                    });
                }
            }
        }
        return data;
    }
};

const resolveRefName = async (contract: any, userAddress: string) => {
    const resp = await contract.resolveToName(userAddress).call();
    return ethers.utils.parseBytes32String(resp);
};

const getTronBalance = async (userAddress: string) => {
    return (await tronWeb.trx.getBalance(userAddress) / CONVERSION_FACTOR);
};

const parseArguments = (inputs: any, args: any) => {
    let data = [];
    for (let i = 0; i < inputs.length; i++) {
        let input = {
            name: i,
            value: args[i].toString(),
        };
        if (inputs[i].name) {
            input.name = inputs[i].name;
        }
        if (inputs[i].type === 'bytes32') {
            input.value = ethers.utils.parseBytes32String(args[i]);
        }
        data.push(input);
    }
    return data;
};

main();
