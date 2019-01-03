let myUtils = require("../utils/myUtils")
let walletService = require("../services/wallet")
let {success, fail} = require("../utils/myUtils")

module.exports = {
    transfer: async (ctx) => {
        console.log(ctx.request.body)
        let {from, to, amount, symbol, memo, wallet, password} = ctx.request.body

        //1.获取钱包里面所有的私钥
        let privatekeyList = walletService.getWalletPrivatekeyList(wallet, password)
        //2.配置EOSJS
        eos = myUtils.getEOSJS(privatekeyList)

        //3.发起转账交易
        let standardAmount = parseFloat(amount).toFixed(4)
        let data = await eos.transfer(from, to, `${standardAmount} ${symbol}`, memo)
        console.log("data:", data)
        ctx.body = data
    },

    pushActions: async (ctx) => {
        console.log(ctx.request.body)
        let {wallet, password, params} = ctx.request.body
        let privatekeyList = walletService.getWalletPrivatekeyList(wallet, password)
        eos = myUtils.getEOSJS(privatekeyList)
        let data = await eos.transaction(params)
        console.log("data:", data)
        ctx.body = data
    },
}
