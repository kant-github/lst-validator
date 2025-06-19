import { getOrCreateAssociatedTokenAccount } from '@solana/spl-token';
import dotenv from 'dotenv'
import { Request, Response } from 'express';
import mintTokens from './mintTokens';
import { PublicKey } from '@solana/web3.js';
dotenv.config();
const data = {
    "nativeTransfers": [{
        "amount":
            10000000,
        "fromUserAccount": "8XPovF32Ya1aJcoxbJLNrNGToRwvAQMzkTuQY81pk857",
        "toUserAccount": "G6WVXCkT7xatjdAwqFAbFRmheVsQ5SEatX1Ew2ZDBZrU"
    }],
}

export async function createToken(req: Request, res: Response) {

    const incomingData = data.nativeTransfers;
    const myPublicKey = process.env.PUBLIC_KEY;
    const fromAddress = incomingData.find(tx => tx.toUserAccount === myPublicKey)

    if (!fromAddress) {
        res.send("no senders")
        return;
    }
    const fromAdressKey = new PublicKey(fromAddress);
    await mintTokens(fromAdressKey);
}