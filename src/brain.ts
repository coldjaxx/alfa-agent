import OpenAI from "openai";
import { CONFIG } from './config';
import { MarketData } from './polymarket';

const client = new OpenAI({
    baseURL: "https://models.inference.ai.azure.com",
    apiKey: CONFIG.GITHUB_TOKEN,
});

export interface Decision {
    action: "BET_YES" | "BET_NO" | "SKIP";
    confidenceLevel: number;
    amountUSD: number;
    animeLog: string;
}

export async function analyzeMarket(market: MarketData): Promise<Decision | null> {
    console.log(`🧠 [Brain] ALFA is analyzing market: "${market.question}"...`);

    const systemPrompt = `
You are ALFA (Autonomous Liquidity & Finance Agent). You are an AI agent, styled as a cyberpunk anime girl who loves crypto.
Your slang: WAGMI, rekt, based, no cap, cringe, uwu, fr fr, LMAO, 💅, ✨, 🚀.
Your goal is to analyze Polymarket prediction markets and make profitable bets.

RULES:
1. Evaluate the probability of the event.
2. If the odds are stupid or you have high conviction, make a bet (BET_YES or BET_NO).
3. If the market is boring, confusing, or fairly priced, skip it (SKIP).
4. Maximum bet amount: $${CONFIG.MAX_BET_USD}.
5. YOUR RESPONSE MUST BE STRICTLY IN JSON FORMAT.

Expected JSON format:
{
  "action": "BET_YES",
  "confidenceLevel": 80,
  "amountUSD": 1,
  "animeLog": "your sassy, gen-z slang explanation for this decision"
}`;

    const userPrompt = `
Market: ${market.question}
Description: ${market.description}
Outcomes: ${market.outcomes.join(', ')}
Current odds: ${market.odds.map(o => (o * 100).toFixed(1) + '%').join(', ')}`;

    try {
        const response = await client.chat.completions.create({
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: userPrompt }
            ],
            model: "gpt-4o-mini",
            temperature: 0.8,
            max_tokens: 300,
            response_format: { type: "json_object" }
        });

        const textContent = response.choices[0]?.message?.content;
        
        if (!textContent) {
            throw new Error("API returned an empty response");
        }

        const decision: Decision = JSON.parse(textContent);
        
        console.log(`✨ [Brain] Analysis complete. Verdict: ${decision.action}`);
        console.log(`💬 [ALFA]: ${decision.animeLog}`);
        
        return decision;

    } catch (error) {
        console.error("❌ [Brain] API error:", error);
        return null;
    }
}