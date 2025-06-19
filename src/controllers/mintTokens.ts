import { getOrCreateAssociatedTokenAccount } from "@solana/spl-token";
import { Connection, Keypair, PublicKey } from "@solana/web3.js";


const walletUint8Array = new Uint8Array(process.env.PRIVATE_KEY as any);
const wallet = Keypair.fromSecretKey(walletUint8Array);
export default async function mintTokens(fromAddress: PublicKey) {
    const connection = new Connection('https://api.devnet.solana.com');

    const minttokens = getOrCreateAssociatedTokenAccount(
        connection,
        wallet,
        
    )
}