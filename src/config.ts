import dotenv from 'dotenv';

dotenv.config();

export const CONFIG = {
    GITHUB_TOKEN: process.env.GITHUB_TOKEN || '',
    PINION_WALLET_KEY: process.env.PINION_WALLET_KEY || '',
    MAX_BET_USD: parseFloat(process.env.MAX_BET_USD || '5'),
};

if (!CONFIG.GITHUB_TOKEN) {
    console.error("❌ [Config] Error: GITHUB_TOKEN is missing in .env");
    process.exit(1);
}

if (!CONFIG.PINION_WALLET_KEY) {
    console.error("❌ [Config] Error: PINION_WALLET_KEY is missing in .env");
    process.exit(1);
}

console.log("⚙️  [Config] Configuration loaded successfully!");