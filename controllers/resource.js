
let {success, fail} = require("../utils/myUtils")
let myUtils = require("../utils/myUtils")
let walletService = require("../services/wallet")
let httpRequest = require("../utils/httpRequest")
let config = require("../config/config")

async function getRamInfo() {
    ramData = await eos.getTableRows(true, "eosio", "eosio", "rammarket")
    //RAM消耗的EOS数量
    let eosAmount = ramData.rows[0].quote.balance.split(" ")[0]
    //RAM使用量
    let ramAmount = ramData.rows[0].base.balance.split(" ")[0] / 1024
    //RAM价格
    let ramPriceWithEOS = eosAmount / ramAmount
    console.log(eosAmount, ramAmount, ramPriceWithEOS)
    return {
        ramUsed: ramAmount / (1024 * 1024),
        ramPrice: ramPriceWithEOS
    }
}

module.exports = {
    netResourceGetRamInfo: async (ctx) => {
        console.log(ctx.request.body)
        let {wallet, password} = ctx.request.body
        //获取钱包里面所有的私钥配置EOSJS
        let privatekeyList = await walletService.getWalletPrivatekeyList(wallet, password)
        eos = myUtils.getEOSJS(privatekeyList)

        let ramData = await eos.getTableRows(true, "eosio", "eosio", "global")
        //ram总量，bytes转为G
        let ramTotal = ramData.rows[0].max_ram_size / (1024 * 1024 * 1024)
        console.log(ramTotal)

        let ramInfo = await getRamInfo()
        ctx.body = success({
            ramPrice: ramInfo.ramPrice.toFixed(4),
            ramTotal: ramTotal.toFixed(2),
            ramAvailable: (ramTotal - ramInfo.ramUsed).toFixed(2)
        })
    },

    netResourceTransactionRam: async (ctx) => {
        console.log(ctx.request.body)
        let {amount, action, account, wallet, password} = ctx.request.body
        let privatekeyList = await walletService.getWalletPrivatekeyList(wallet, password)
        eos = myUtils.getEOSJS(privatekeyList)

        let result
        if (action == 1) {
            console.log("买ram")
            let ramInfo = await getRamInfo()
            let ramAmount = parseInt(amount / ramInfo.ramPrice * 1024)
            console.log("ramAmount:", ramAmount)
            result = await eos.transaction(tr => {
                tr.buyrambytes({
                    payer: account,
                    receiver: account,
                    bytes: ramAmount
                })
            })
        } else {
            console.log("卖ram")
            let ramAmount = parseInt(amount * 1024)
            result = await eos.transaction(tr => {
                tr.sellram({
                    account: account,
                    bytes: ramAmount
                })
            })
        }

        console.log("data:", result)
        if (result.broadcast) {
            ctx.body = success("ok")
        } else {
            ctx.body = fail("error")
        }
    },

    netResourceGetBandwidthPrice: async (ctx) => {
        console.log(ctx.request.body)
        let {account} = ctx.request.body

        let res = await httpRequest.postRequest(config.accountMethods.accountInfo, {"account_name": account})
        if (res.code == 0) {
            data = res.data
            //1. 计算NET价格
            //抵押NET的EOS数量
            var netBalance = data.net_weight / 10000
            //NET贷款的总量
            var netTotal = data.net_limit.max / 1024
            //(netBalance / netTotal)获取到的是过去3天内的平均消耗量，除以３获取每天的平均消耗量，即价格
            netPrice = ((netBalance / netTotal) / 3).toFixed(4)
            console.log(netBalance, netTotal, netPrice)

            //1. 计算CPU价格
            //抵押CPU的EOS数量
            var cpuBalance = data.cpu_weight / 10000;
            //CPU贷款的总量
            var cpuTotal = data.cpu_limit.max / 1024
            //(cpuBalance / cpuTotal)获取到的是过去3天内的平均消耗量，除以３获取每天的平均消耗量，即价格
            cpuPrice = ((cpuBalance / cpuTotal) / 3).toFixed(4)

            ctx.body = success({
                netPrice: netPrice,
                cpuPrice: cpuPrice
            })
        } else {
            ctx.body = res
        }
    },

    netResourceTransactionBandwidth: async (ctx) => {
        console.log(ctx.request.body)
        let {net_amount, cpu_amount, action, account, wallet, password} = ctx.request.body

        //获取钱包里面所有的私钥配置EOSJS
        let privatekeyList = await walletService.getWalletPrivatekeyList(wallet, password)
        eos = myUtils.getEOSJS(privatekeyList)

        let result
        console.log(typeof bandwidth_transaction_type)
        if (action == '1') {
            //抵押EOS购买NET、CPU
            result = await eos.transaction(tr => {
                tr.delegatebw({
                    from: account,
                    receiver: account,
                    stake_cpu_quantity: parseFloat(cpu_amount).toFixed(4) + " EOS",
                    stake_net_quantity: parseFloat(net_amount).toFixed(4) + " EOS",
                    transfer: 0
                })
            })
        } else {
            //从NET、CPU资源中赎回EOS
            result = await eos.transaction(tr => {
                tr.undelegatebw({
                    from: account,
                    receiver: account,
                    unstake_net_quantity: parseFloat(net_amount).toFixed(4) + " EOS",
                    unstake_cpu_quantity: parseFloat(cpu_amount).toFixed(4) + " EOS"
                })
            })
        }

        console.log("data:", result)
        if (result.broadcast) {
            ctx.body = success("ok")
        } else {
            ctx.body = fail("error")
        }
    }
}
