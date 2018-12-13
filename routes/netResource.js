const router = require('koa-router')()
const netResourceController = require("../controllers/netResource")

router.prefix('/net_resource')
router.post("/ram/info", netResourceController.netResourceGetRamInfo)
router.post("/ram/transaction", netResourceController.netResourceTransactionRam)
router.post("/bandwidth/price", netResourceController.netResourceGetBandwidthPrice)
router.post("/bandwidth/transaction", netResourceController.netResourceTransactionBandwidth)

module.exports = router
