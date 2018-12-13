const router = require('koa-router')()
const walletController = require("../controllers/wallet")

router.prefix('/wallet')
router.post("/create", walletController.walletCreate)
router.post("/open", walletController.walletOpen)
router.get("/list", walletController.walletList)
router.post("/unlock", walletController.walletUnlock)
router.post("/lock", walletController.walletLock)
router.post("/importkey", walletController.walletImportPrivatekey)
router.post("/keys", walletController.walletGetKeys)
router.post("/createkey", walletController.walletCreateKey)
router.post("/privatekey", walletController.walletPubkeyGetPrivatekey)

module.exports = router
