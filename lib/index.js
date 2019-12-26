#!/usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var chalk = require('chalk');
var clear = require('clear');
var figlet = require('figlet');
var program = require('commander');
var ethers = require('ethers');
var TronWeb = require('tronweb');
var TronGrid = require('trongrid');
var rp = require('request-promise');
var contracts = require('../contracts.json');
var TRON_NODE = "https://api.trongrid.io";
var SOLIDITY_NODE = "https://api.trongrid.io";
var CURVY_INTERFACE = new ethers.utils.Interface(contracts.curvy.abi);
var VANITY_INTERFACE = new ethers.utils.Interface(contracts.vanity.abi);
var CONTRACTS = new Map();
CONTRACTS.set(contracts.curvy.contract, CURVY_INTERFACE);
CONTRACTS.set(contracts.vanity.contract, VANITY_INTERFACE);
var CONVERSION_FACTOR = 1000000;
var MS_IN_SECOND = 1000;
clear();
console.log(chalk.red(figlet.textSync('snow-cannon', { horizontalLayout: 'full' })));
program
    .version('0.0.4')
    .description("Command line tool to troubleshoot just.game")
    .option('-r, --round', 'Get Current round info')
    .option('-i, --info <address|vanity>', 'Get player stats')
    .option('-v, --vanity <name>', 'Get player address for given vanity name')
    .option('-t, --transactions <address|vanity>', 'Get recent just.game related transactions')
    .parse(process.argv);
if (!process.argv.slice(2).length) {
    program.outputHelp();
}
var tronWeb = new TronWeb(TRON_NODE, SOLIDITY_NODE);
// Using curvy's address as the fallback address for the request
tronWeb.setAddress(contracts.curvy.address);
var tronGrid = new TronGrid(tronWeb);
var main = function () { return __awaiter(void 0, void 0, void 0, function () {
    var e_1, e_2, e_3, e_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!program.info) return [3 /*break*/, 4];
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, displayBalances(program.info)];
            case 2:
                _a.sent();
                return [3 /*break*/, 4];
            case 3:
                e_1 = _a.sent();
                console.error(e_1);
                return [3 /*break*/, 4];
            case 4:
                if (!program.round) return [3 /*break*/, 8];
                _a.label = 5;
            case 5:
                _a.trys.push([5, 7, , 8]);
                return [4 /*yield*/, displayCurrentRoundInfo()];
            case 6:
                _a.sent();
                return [3 /*break*/, 8];
            case 7:
                e_2 = _a.sent();
                console.error(e_2);
                return [3 /*break*/, 8];
            case 8:
                if (!program.transactions) return [3 /*break*/, 12];
                _a.label = 9;
            case 9:
                _a.trys.push([9, 11, , 12]);
                return [4 /*yield*/, displayRecentTransactions(program.transactions)];
            case 10:
                _a.sent();
                return [3 /*break*/, 12];
            case 11:
                e_3 = _a.sent();
                console.error(e_3);
                return [3 /*break*/, 12];
            case 12:
                if (!program.vanity) return [3 /*break*/, 16];
                _a.label = 13;
            case 13:
                _a.trys.push([13, 15, , 16]);
                return [4 /*yield*/, displayAddressFromVanity(program.vanity)];
            case 14:
                _a.sent();
                return [3 /*break*/, 16];
            case 15:
                e_4 = _a.sent();
                console.error(e_4);
                return [3 /*break*/, 16];
            case 16: return [2 /*return*/];
        }
    });
}); };
var formatNumber = function (n) {
    return n.toLocaleString();
};
var displayBalances = function (user) { return __awaiter(void 0, void 0, void 0, function () {
    var userAddress, contract_1, address, contract, userBalance, contract_2, vanity, currentRoundNumber, dividends, playerMetadata, player;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!(user.charAt(0) === 'T')) return [3 /*break*/, 1];
                userAddress = user;
                return [3 /*break*/, 4];
            case 1: return [4 /*yield*/, tronWeb
                    .contract()
                    .at(contracts.vanity.address)];
            case 2:
                contract_1 = _a.sent();
                return [4 /*yield*/, resolveAddress(contract_1, user.trim())];
            case 3:
                address = _a.sent();
                if (address) {
                    userAddress = address;
                    console.log("Player's ref name: " + user);
                    console.log("User's address: " + address);
                }
                else {
                    return [2 /*return*/, console.error("Couldn't find user: " + user)];
                }
                _a.label = 4;
            case 4:
                tronWeb.setAddress(userAddress);
                return [4 /*yield*/, tronWeb
                        .contract()
                        .at(contracts.curvy.address)];
            case 5:
                contract = _a.sent();
                return [4 /*yield*/, getTronBalance(userAddress)];
            case 6:
                userBalance = _a.sent();
                console.log("Players wallet balance: " + formatNumber(userBalance) + " trx");
                if (!(user === userAddress)) return [3 /*break*/, 9];
                return [4 /*yield*/, tronWeb
                        .contract()
                        .at(contracts.vanity.address)];
            case 7:
                contract_2 = _a.sent();
                return [4 /*yield*/, resolveRefName(contract_2, userAddress)];
            case 8:
                vanity = _a.sent();
                if (vanity) {
                    console.log("Player's Vanity Name: " + vanity);
                }
                _a.label = 9;
            case 9: return [4 /*yield*/, getCurrentRoundNumber(contract)];
            case 10:
                currentRoundNumber = _a.sent();
                return [4 /*yield*/, getDividendsOf(contract, userAddress, currentRoundNumber, false)];
            case 11:
                dividends = _a.sent();
                return [4 /*yield*/, getPlayerMetadata(contract, userAddress)];
            case 12:
                playerMetadata = _a.sent();
                return [4 /*yield*/, getPlayerInfo(contract, userAddress)];
            case 13:
                player = _a.sent();
                console.log("Player stats: \n     earnings: " + formatNumber(dividends) + " trx\n     refEarnings: " + formatNumber(player.squadEarnings) + " trx\n     ticketsOwned: " + formatNumber(playerMetadata.ticketsOwned) + ",\n     experienceTotal: " + formatNumber(player.experienceTotal) + ",\n     experienceNextRound: " + formatNumber(player.experienceNextRound) + "\n     experienceToSpend: " + formatNumber(player.experienceToSpend) + "\n     automaticallyUpgrade: " + player.automaticallyUpgrade + "\n     lastInteraction: " + player.lastInteraction + "\n     Position: " + formatNumber(playerMetadata.myPosition) + "\n     backing: " + formatNumber(playerMetadata.backing));
                return [2 /*return*/];
        }
    });
}); };
var displayCurrentRoundInfo = function () { return __awaiter(void 0, void 0, void 0, function () {
    var contract, currentRoundData;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, tronWeb
                    .contract()
                    .at(contracts.curvy.address)];
            case 1:
                contract = _a.sent();
                return [4 /*yield*/, getCurrentRoundInfoData(contract)];
            case 2:
                currentRoundData = _a.sent();
                console.log("currentRoundData:\n     endsAt: " + currentRoundData.endsAt + ",\n     grandPrize: " + formatNumber(currentRoundData.grandPrize) + "\n     leaderBonus: " + formatNumber(currentRoundData.leaderBonus) + "\n     ticketsBought: " + formatNumber(currentRoundData.ticketsBought) + "\n     ticketsRedeemed: " + formatNumber(currentRoundData.ticketsRedeemed) + "\n     ticketsRedeemed / ticketsBought:  " + formatNumber(currentRoundData.ticketsRedeemed /
                    currentRoundData.ticketsBought * 100) + "%\n     totalParticipants: " + formatNumber(currentRoundData.totalParticipants) + "\n     hasEnded: " + currentRoundData.hasEnded + "\n     unredeemedBacking: " + formatNumber(currentRoundData.unredeemedBacking) + "\n     bombValue: " + formatNumber(currentRoundData.bombValue) + "\n     bombFuseCounter: " + formatNumber(currentRoundData.bombFuseCounter) + "\n     roundNumber: " + formatNumber(currentRoundData.roundNumber) + "\n     totalTronPledged: " + formatNumber(currentRoundData.totalTronPledged));
                return [2 /*return*/];
        }
    });
}); };
var displayRecentTransactions = function (user) { return __awaiter(void 0, void 0, void 0, function () {
    var address, contract, resp, transactions, _i, transactions_1, tx, _a, _b, input;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                if (!(user.charAt(0) === 'T')) return [3 /*break*/, 1];
                address = user;
                return [3 /*break*/, 4];
            case 1: return [4 /*yield*/, tronWeb
                    .contract()
                    .at(contracts.vanity.address)];
            case 2:
                contract = _c.sent();
                return [4 /*yield*/, resolveAddress(contract, user.trim())];
            case 3:
                resp = _c.sent();
                if (resp) {
                    address = resp;
                    console.log("User's address: " + address);
                }
                else {
                    return [2 /*return*/, console.error("Couldn't find user: " + user)];
                }
                _c.label = 4;
            case 4: return [4 /*yield*/, getRecentTransactionData(address)];
            case 5:
                transactions = _c.sent();
                if (transactions) {
                    console.log("Recent transactions:");
                    for (_i = 0, transactions_1 = transactions; _i < transactions_1.length; _i++) {
                        tx = transactions_1[_i];
                        console.log("  " + tx.status + " " + tx.value + " trx " + tx.operation);
                        for (_a = 0, _b = tx.inputs; _a < _b.length; _a++) {
                            input = _b[_a];
                            console.log("    " + input.name + " " + input.value);
                        }
                    }
                }
                return [2 /*return*/];
        }
    });
}); };
var displayAddressFromVanity = function (vanity) { return __awaiter(void 0, void 0, void 0, function () {
    var contract, address;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, tronWeb
                    .contract()
                    .at(contracts.vanity.address)];
            case 1:
                contract = _a.sent();
                return [4 /*yield*/, resolveAddress(contract, vanity.trim())];
            case 2:
                address = _a.sent();
                if (address) {
                    return [2 /*return*/, console.log(vanity + " is owned by: " + address)];
                }
                console.log("Couldn't retrieve address for ref name: " + vanity);
                return [2 /*return*/];
        }
    });
}); };
var getPlayerInfo = function (contract, userAddress) { return __awaiter(void 0, void 0, void 0, function () {
    var data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, contract.Players(userAddress).call()];
            case 1:
                data = _a.sent();
                return [2 /*return*/, {
                        experienceTotal: data.experienceTotal / CONVERSION_FACTOR,
                        experienceNextRound: data.experienceNextRound / CONVERSION_FACTOR,
                        experienceToSpend: data.experienceToSpend / CONVERSION_FACTOR,
                        automaticallyUpgrade: data.automaticallyUpgrade,
                        lastInteraction: new Date(data.lastInteraction * MS_IN_SECOND),
                        squadEarnings: data.squadEarnings / CONVERSION_FACTOR,
                    }];
        }
    });
}); };
var getPlayerMetadata = function (contract, userAddress) { return __awaiter(void 0, void 0, void 0, function () {
    var data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, contract.playerMetadataOf(userAddress).call()];
            case 1:
                data = _a.sent();
                return [2 /*return*/, {
                        ticketsOwned: data.ticketsOwned / CONVERSION_FACTOR,
                        myPosition: data.myPosition,
                        backing: data.backing / CONVERSION_FACTOR,
                    }];
        }
    });
}); };
var getCurrentRoundNumber = function (contract) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, contract.currentRoundNumber().call()];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
var getDividendsOf = function (contract, userAddress, currentRoundNumber, include2XBonus) {
    if (include2XBonus === void 0) { include2XBonus = false; }
    return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, contract.dividendsOf(currentRoundNumber, userAddress, include2XBonus).call()];
                case 1: return [2 /*return*/, (_a.sent()) / CONVERSION_FACTOR];
            }
        });
    });
};
var getCurrentRoundInfoData = function (contract) { return __awaiter(void 0, void 0, void 0, function () {
    var data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, contract.currentRoundData().call()];
            case 1:
                data = _a.sent();
                return [2 /*return*/, {
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
                    }];
        }
    });
}); };
var getRecentTransactionData = function (userAddress, limit) {
    if (limit === void 0) { limit = 200; }
    return __awaiter(void 0, void 0, void 0, function () {
        var data, options, resp, _i, _a, tx, contractAddress, abiInterface, decodedTx, funcAbi, callValue;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    data = [];
                    options = {
                        method: 'GET',
                        uri: "https://api.trongrid.io/v1/accounts/" + userAddress + "/transactions?only_from=true&limit=" + limit,
                        json: true,
                    };
                    return [4 /*yield*/, rp(options)];
                case 1:
                    resp = _b.sent();
                    if (resp.success) {
                        for (_i = 0, _a = resp.data; _i < _a.length; _i++) {
                            tx = _a[_i];
                            if (tx.raw_data.contract[0].type === "TriggerSmartContract") {
                                contractAddress = tx.raw_data.contract[0].parameter.value.contract_address.slice(2);
                                abiInterface = CONTRACTS.get(contractAddress);
                                if (abiInterface) {
                                    decodedTx = abiInterface.parseTransaction({
                                        data: "0x" + tx.raw_data.contract[0].parameter.value.data
                                    });
                                    funcAbi = abiInterface.functions[decodedTx.name];
                                    callValue = tx.raw_data.contract[0].parameter.value.call_value;
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
                        return [2 /*return*/, data];
                    }
                    return [2 /*return*/];
            }
        });
    });
};
var resolveRefName = function (contract, userAddress) { return __awaiter(void 0, void 0, void 0, function () {
    var resp;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, contract.resolveToName(userAddress).call()];
            case 1:
                resp = _a.sent();
                return [2 /*return*/, ethers.utils.parseBytes32String(resp)];
        }
    });
}); };
var resolveAddress = function (contract, refName) { return __awaiter(void 0, void 0, void 0, function () {
    var bytes32, address;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                bytes32 = ethers.utils.formatBytes32String(refName);
                return [4 /*yield*/, contract.resolveToAddress(bytes32).call()];
            case 1:
                address = _a.sent();
                return [2 /*return*/, address === "410000000000000000000000000000000000000000" ? false : tronWeb.address.fromHex(address)];
        }
    });
}); };
var getTronBalance = function (userAddress) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, tronWeb.trx.getBalance(userAddress)];
            case 1: return [2 /*return*/, ((_a.sent()) / CONVERSION_FACTOR)];
        }
    });
}); };
var parseArguments = function (inputs, args) {
    var data = [];
    for (var i = 0; i < inputs.length; i++) {
        var input = {
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
