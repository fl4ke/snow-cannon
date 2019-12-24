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
var CURVY_ADDR = "TWjkoz18Y48SgWoxEeGG11ezCCzee8wo1A";
var VANITY_CONTRACT = "TV7DiSukGoP1h5KswfWVk9LWgED6sSxTt8";
var TRON_NODE = "https://api.trongrid.io";
var SOLIDITY_NODE = "https://api.trongrid.io";
clear();
console.log(chalk.red(figlet.textSync('snow-cannon', { horizontalLayout: 'full' })));
program
    .version('0.0.2')
    .description("Command line tool to troubleshoot curvy")
    .option('-r, --round', 'Get Current round info')
    .option('-i, --info <address>', 'Get player stats')
    .parse(process.argv);
if (!process.argv.slice(2).length) {
    program.outputHelp();
}
var tronWeb = new TronWeb(TRON_NODE, SOLIDITY_NODE);
// Using curvy's address as the fallback address for the request
tronWeb.setAddress(CURVY_ADDR);
var tronGrid = new TronGrid(tronWeb);
var main = function () { return __awaiter(void 0, void 0, void 0, function () {
    var e_1, e_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!program.info) return [3 /*break*/, 4];
                console.log(program.info);
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
            case 8: return [2 /*return*/];
        }
    });
}); };
var displayBalances = function (userAddress) { return __awaiter(void 0, void 0, void 0, function () {
    var contract, userBalance, contract_1, vanity, e_3, currentRoundNumber, dividendsOf, playerMetadataOf, players;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                tronWeb.setAddress(userAddress);
                return [4 /*yield*/, tronWeb
                        .contract()
                        .at(CURVY_ADDR)];
            case 1:
                contract = _a.sent();
                return [4 /*yield*/, tronWeb.trx.getBalance(userAddress)];
            case 2:
                userBalance = _a.sent();
                console.log("Players wallet balance: " + formatNumber(userBalance / 1000000) + " trx");
                _a.label = 3;
            case 3:
                _a.trys.push([3, 6, , 7]);
                return [4 /*yield*/, tronWeb
                        .contract()
                        .at(VANITY_CONTRACT)];
            case 4:
                contract_1 = _a.sent();
                return [4 /*yield*/, resolveRefName(contract_1, userAddress)];
            case 5:
                vanity = _a.sent();
                console.log("Players Vanity Name: " + vanity);
                return [3 /*break*/, 7];
            case 6:
                e_3 = _a.sent();
                console.log(e_3);
                return [3 /*break*/, 7];
            case 7: return [4 /*yield*/, getCurrentRoundNumber(contract)];
            case 8:
                currentRoundNumber = _a.sent();
                return [4 /*yield*/, getDividendsOf(contract, userAddress, currentRoundNumber)];
            case 9:
                dividendsOf = _a.sent();
                return [4 /*yield*/, getPlayerMetadata(contract, userAddress)];
            case 10:
                playerMetadataOf = _a.sent();
                return [4 /*yield*/, getPlayerInfo(contract, userAddress)];
            case 11:
                players = _a.sent();
                console.log("Player stats: \n     current earnings: " + formatNumber(dividendsOf / 1000000) + " trx\n     ticketsOwned: " + formatNumber(playerMetadataOf.ticketsOwned / 1000000) + ",\n     experienceTotal: " + formatNumber(players.experienceTotal / 1000000) + ",\n     experienceNextRound: " + formatNumber(players.experienceNextRound / 1000000) + "\n     experienceToSpend: " + formatNumber(players.experienceToSpend / 1000000) + "\n     automaticallyUpgrade: " + formatNumber(players.automaticallyUpgrade) + "\n     lastInteraction: " + new Date(players.lastInteraction * 1000) + "\n     Position: " + formatNumber(playerMetadataOf.myPosition) + "\n     backing: " + formatNumber(playerMetadataOf.backing / 1000000));
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
                    .at(CURVY_ADDR)];
            case 1:
                contract = _a.sent();
                return [4 /*yield*/, getCurrentRoundInfoData(contract)];
            case 2:
                currentRoundData = _a.sent();
                console.log("currentRoundData:\n     endsAt: " + new Date(currentRoundData.endsAt * 1000) + ",\n     grandPrize: " + formatNumber(currentRoundData.grandPrize / 1000000) + "\n     leaderBonus: " + formatNumber(currentRoundData.leaderBonus / 1000000) + "\n     ticketsBought: " + formatNumber(currentRoundData.ticketsBought / 1000000) + "\n     ticketsRedeemed: " + formatNumber(currentRoundData.ticketsRedeemed / 1000000) + "\n     totalParticipants: " + formatNumber(currentRoundData.totalParticipants) + "\n     hasEnded: " + currentRoundData.hasEnded + "\n     unredeemedBacking: " + formatNumber(currentRoundData.unredeemedBacking / 1000000) + "\n     bombValue: " + formatNumber(currentRoundData.bombValue / 1000000) + "\n     bombFuseCounter: " + formatNumber(currentRoundData.bombFuseCounter / 1000000) + "\n     totalTransactionCount: " + formatNumber(currentRoundData.totalTransactionCount) + "\n     roundNumber: " + formatNumber(currentRoundData.roundNumber) + "\n     totalTronPledged: " + formatNumber(currentRoundData.totalTronPledged / 1000000));
                return [2 /*return*/];
        }
    });
}); };
var getPlayerInfo = function (contract, userAddress) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, contract.Players(userAddress).call()];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
var getPlayerMetadata = function (contract, userAddress) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, contract.playerMetadataOf(userAddress).call()];
            case 1: return [2 /*return*/, _a.sent()];
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
var getDividendsOf = function (contract, userAddress, currentRoundNumber, includeBonus) {
    if (includeBonus === void 0) { includeBonus = true; }
    return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, contract.dividendsOf(currentRoundNumber, userAddress, includeBonus).call()];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
};
var getCurrentRoundInfoData = function (contract) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, contract.currentRoundData().call()];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
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
var formatNumber = function (n) {
    return n.toLocaleString();
};
main();
