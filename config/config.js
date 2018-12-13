let binaryen = require('binaryen')

module.exports = {
    eosconfig:{
        httpEndpoint:"http://192.168.1.6:8888",//"http://jungle2.cryptolions.io:80",
        chainId: "e70aaab8997e1dfce58fbfac80cbbb8fecec7b99cf982a9444273cbc64c41473",
        // keyProvider: ['5HrTPjYLGSKupEpcBrAz32q7VXfK1wJpJ2MptGduz1Xv5ULagh7'],
        binaryen: binaryen,
        expireInSeconds: 60,
        broadcast: true,
        verbose: false,
        sign: true
    },
    walletAddress:"http://192.168.1.6:8889",

    walletCreate:"/v1/wallet/create",
    walletOpen:"/v1/wallet/open",
    walletList:"/v1/wallet/list_wallets",
    walletUnlock:"/v1/wallet/unlock",
    walletLock: "/v1/wallet/lock",
    walletImportPrivatekey:"/v1/wallet/import_key",
    walletGetKeys:"/v1/wallet/list_keys",
    walletCreateKey:"/v1/wallet/create_key",

    accountListForKey:"/v1/history/get_key_accounts",
    accountBalance: "/v1/chain/get_currency_balance",
    accountInfo:"/v1/chain/get_account",

    port: 3000
}