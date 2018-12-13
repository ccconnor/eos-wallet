const router = require('koa-router')()
const webController = require("../controllers/web")

router.get("/", webController.getWalletHtml)
router.get("/wallet.html", webController.getWalletHtml)
router.get("/account.html", webController.getAccountHtml)
router.get("/accountnew.html", webController.getAccountCreateHtml)
router.get("/accountinfo.html", webController.getAccountInfoHtml)
router.get("/transaction.html", webController.getTransactionHtml)
router.get("/netresource.html", webController.getNetRosourceHtml)

module.exports = router
