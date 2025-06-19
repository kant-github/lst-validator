import express, { Request, Response } from 'express'
import http from 'http'
import { PublicKey } from '@solana/web3.js';
import mintTokens from './controllers/mintTokens';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const server = http.createServer(app);

const data = {
    "nativeTransfers": [{
        "amount":
            10000000,
        "fromUserAccount": "9ozcPjeq8Vm5z3VVnFrmPpJMGuU2LqnPubYdS5qsrA47",
        "toUserAccount": "2M7ntBVJMWsKhioRWxbYLYJemvJ2TrZ7BuDLVpTpEira"
    }],
}

app.get("/", (req: Request, res: Response) => {
    console.log("hey logged");
    res.send("logged");
    return;
})

app.get("/helius", async (req: Request, res: Response) => {
    console.log("req.body is : ", req.body);
    const incomingData = data.nativeTransfers;
    const myPublicKey = process.env.PUBLIC_KEY;
    const fromAddress = incomingData.find(tx => tx.toUserAccount === myPublicKey)
    const amount = fromAddress?.amount;

    if (!fromAddress) {
        res.send("no senders")
        return;
    }
    const fromAdressKey = new PublicKey(fromAddress.fromUserAccount);
    const mintTokensTxHash = await mintTokens(fromAdressKey, Number(amount));
    res.send(mintTokensTxHash)
    return;
})


server.listen(8080, () => {
    console.log("app is listening at port 8080");
})