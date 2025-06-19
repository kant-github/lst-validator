import { getOrCreateAssociatedTokenAccount, mintTo, TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { Connection, Keypair, PublicKey } from "@solana/web3.js";
import bs58 from 'bs58';
import dotenv from 'dotenv'

dotenv.config();

const secretKeyString = process.env.PRIVATE_KEY;
if (!secretKeyString) throw new Error("PRIVATE_KEY not set in .env");

const secretKey = bs58.decode(secretKeyString);
const wallet = Keypair.fromSecretKey(secretKey);

const mint = new PublicKey(process.env.MINT_PUBLIC_KEY as string);

export default async function mintTokens(fromAddress: PublicKey, amount: number) {

    const connection = new Connection('https://api.devnet.solana.com');
    const ata = await getOrCreateAssociatedTokenAccount(
        connection,
        wallet,
        mint,
        fromAddress,
        false,
        undefined,
        undefined,
        TOKEN_PROGRAM_ID
    )

    const mintTokensTxHash = await mintTo(
        connection,
        wallet,
        mint,
        ata.address,
        wallet.publicKey,
        amount
    )

    return mintTokensTxHash
}