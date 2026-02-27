import { getTrendingMarkets } from './polymarket';
import { analyzeMarket } from './brain';
import { executeBet } from './wallet';

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

async function main() {
    console.clear();
    console.log(`
=========================================================
🌸 ALFA: Autonomous Liquidity & Finance Agent v1.0 🌸
=========================================================
[System] Initializing PinionOS core... Success.
[System] Connecting to GitHub Models (gpt-4o-mini)... Success.
[System] Agent ALFA is awake and ready to trade! ✨
=========================================================
`);

    while (true) {
        try {
            console.log(`\n⏳ [System] Starting a new market scanning cycle...`);
            
            const markets = await getTrendingMarkets();
            
            if (markets.length === 0) {
                console.log(`📭 [System] No interesting markets found. Sleeping for 5 minutes...`);
                await sleep(5 * 60 * 1000);
                continue;
            }

            // Pick a random market to avoid getting stuck on the same one
            const randomIndex = Math.floor(Math.random() * markets.length);
            const targetMarket = markets[randomIndex];
            
            const decision = await analyzeMarket(targetMarket);

            if (!decision) {
                console.log(`⚠️ [System] ALFA failed to respond. Retrying later.`);
                await sleep(60 * 1000);
                continue;
            }

            if (decision.action !== 'SKIP') {
                console.log(`\n🤖 [System] ALFA decided to: ${decision.action}. Handing over to PinionOS...`);
                
                const success = await executeBet(targetMarket.id, decision);
                
                if (success) {
                    console.log(`💸 [System] Bet executed successfully!`);
                } else {
                    console.log(`⚠️ [System] Transaction failed. Capital protected.`);
                }
            } else {
                console.log(`\n⏭️ [System] ALFA decided to skip this market (SKIP).`);
            }

            console.log(`\n💤 [System] Cycle complete. ALFA went to get boba tea. Sleeping for 15 minutes... uwu 🧋`);
            await sleep(15 * 60 * 1000);

        } catch (error) {
            console.error(`\n❌ [System] Critical error in main loop:`, error);
            await sleep(60 * 1000);
        }
    }
}

main();