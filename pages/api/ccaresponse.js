export default function ccaresponse(req, res) {
    const nodeCCAvenue = require('node-ccavenue');
    const ccav = new nodeCCAvenue.Configure({
        merchant_id: process.env.merchant_id,
        working_key: process.env.test_working_key || process.env.prod_working_key,
    });
    const { encResp } = req.body;
    const decryptedJsonResponse = ccav.redirectResponseToJson(encResp);
}
