let httpRequest = require("../utils/httpRequest")
let config = require("../config/config")

let currentAccount = {
    name: "",
    authority: "",
    publicKey: ""
}

module.exports = {
    getCurrentAccount: async () => {
        let response = {
            "accounts": [{
                "name": currentAccount.name,
                "authority": currentAccount.authority,
                "blockchain": "eos"
            }],
            "publicKey": currentAccount.publicKey
        }
        return response
    },
    setCurrentAccount: async (account) => {
        let accountInfo = await httpRequest.postRequest(config.accountMethods.accountInfo, {"account_name":account})
        let publicKey = accountInfo["data"]["permissions"][0]["required_auth"]["keys"][0]["key"]
        currentAccount.name = account
        currentAccount.authority = "active"
        currentAccount.publicKey = publicKey
    },
    getWalletPrivatekeyList: async (wallet, password) => {
        let privatekeyList = []
        let res = await httpRequest.postRequest(config.walletMethods.walletGetKeys, [wallet, password])
        if (res.code == 0 && res.data.length > 0) {
            for (const index in res.data) {
                let keys = res.data[index]
                privatekeyList.push(keys[1])
            }
        }
        return privatekeyList
    }
}
