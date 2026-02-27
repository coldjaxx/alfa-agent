export interface MarketData {
    id: string;
    question: string;
    description: string;
    outcomes: string[];
    odds: number[];
    volume: number;
}

export async function getTrendingMarkets(): Promise<MarketData[]> {
    console.log("🌐 [Polymarket] Scanning for trending markets...");
    
    try {
        const response = await fetch('https://gamma-api.polymarket.com/events?active=true&closed=false&limit=10');
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        const markets = data.map((event: any): MarketData | null => {
            const mainMarket = event.markets && event.markets.length > 0 ? event.markets[0] : null;
            
            if (!mainMarket) return null;

            let parsedOutcomes = ["Yes", "No"];
            let parsedOdds = [0.5, 0.5];

            try {
                if (mainMarket.outcomes) parsedOutcomes = JSON.parse(mainMarket.outcomes);
                if (mainMarket.outcomePrices) parsedOdds = JSON.parse(mainMarket.outcomePrices).map(Number);
            } catch (e) {
                console.log(`⚠️ [Polymarket] Failed to parse data for market ${mainMarket.id}, skipping.`);
                return null;
            }

            return {
                id: mainMarket.id,
                question: event.title,
                description: event.description || "",
                outcomes: parsedOutcomes,
                odds: parsedOdds,
                volume: mainMarket.volume || 0
            };
        });

        const validMarkets = markets.filter((m: MarketData | null): m is MarketData => m !== null && m.volume > 1000);
        
        console.log(`✅ [Polymarket] Found ${validMarkets.length} active markets with high volume.`);
        return validMarkets;
        
    } catch (error) {
        console.error("❌ [Polymarket] Error fetching data:", error);
        return [];
    }
}