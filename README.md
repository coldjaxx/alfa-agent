# 🌸 ALFA: Autonomous Liquidity & Finance Agent

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![OpenAI](https://img.shields.io/badge/GitHub_Models-412991?style=for-the-badge&logo=openai&logoColor=white)
![PinionOS](https://img.shields.io/badge/PinionOS_x402-FF4F8B?style=for-the-badge&logo=base&logoColor=white)

A fully autonomous crypto-intelligence orchestration system that scans prediction markets, runs LLM-driven probability analysis, and autonomously settles execution fees on-chain via the **x402 protocol**. 

ALFA operates as a headless backend agent—an "AI Degen" with a unique Gen-Z persona—designed to demonstrate the shift from "Software as a Service" to **"Software that Earns"**.

---

## 📑 Table of Contents
- [What This Project Does](#what-this-project-does)
- [Hackathon Additions (Pinion + x402)](#hackathon-additions-pinion--x402)
- [End-to-End Flow](#end-to-end-flow)
- [Services and Architecture](#services-and-architecture)
- [Prerequisites & Local Setup](#prerequisites--local-setup)
- [Environment Variables](#environment-variables)
- [Production Hardening](#production-hardening)

---

## ⚙️ What This Project Does

ALFA is a continuous execution loop agent that:
1. **Indexes** active high-volume prediction markets from Polymarket.
2. **Evaluates** event probabilities using GitHub Models (GPT-4o-mini).
3. **Decides** whether to allocate capital (`BET_YES`, `BET_NO`, or `SKIP`).
4. **Procures** execution capabilities by autonomously paying a `$0.01 USDC` server fee using PinionOS.
5. **Broadcasts** the final transaction to the Base network.

Unlike traditional bots that require human transaction signing or pre-funded subscription accounts, ALFA manages her own treasury and pays for her own API execution skills dynamically.

---

## 🏆 Hackathon Additions (Pinion + x402)

This build heavily integrates the **PinionOS runtime** and trust layers to demonstrate true machine-to-machine economy:
* **Headless x402 Procurement:** The agent uses the Pinion SDK to automatically sign EIP-3009 authorization and settle USDC micropayments for server-side skills (`skills.send`, `skills.broadcast`).
* **Base Network Settlement:** All compute and execution fees are settled on the Base L2 network natively by the agent's internal wallet.
* **Autonomous Treasury Routing:** No frontend required. The agent identifies a profitable market, pays the x402 toll, and routes the transaction autonomously.

---

## 🔄 End-to-End Flow

1. **Cron/Loop Initialization:** The system awakes and queries the Polymarket Gamma API.
2. **Data Sanitization:** Raw market data (odds, liquidity, outcomes) is parsed and filtered.
3. **LLM Orchestration:** Data is fed into the Intelligence Engine. ALFA applies her persona constraints and risk-management parameters (max bet limits).
4. **x402 Payment Flow:** - Agent requests a transaction build (`skills.send`).
   - Pinion Server returns a `402 Payment Required` challenge.
   - ALFA signs the payment, remitting $0.01 USDC on Base.
5. **On-Chain Execution:** The signed transaction is broadcasted to the network, and the receipt hash is logged.
6. **Cooldown:** The agent enters a sleep cycle to prevent API rate-limiting and preserve treasury funds.

---

## 🏗 Services and Architecture

The repository is modularized for strict separation of concerns:

| Module | File | Responsibility |
| :--- | :--- | :--- |
| **Data Oracle** | `src/polymarket.ts` | External API fetching, JSON parsing, market volume filtering. |
| **Intelligence Engine** | `src/brain.ts` | GitHub Models (GPT) integration, prompt engineering, strict JSON structuring. |
| **Treasury & Procurement** | `src/wallet.ts` | Pinion SDK initialization, x402 payment signing, Base network RPC communication. |
| **Orchestrator** | `src/index.ts` | Main execution loop, state management, error handling, and agent lifecycle. |

---

## 💻 Prerequisites & Local Setup

**Prerequisites:**
- Node.js 18+
- npm or yarn
- Wallet with Base Mainnet ETH (for gas) and USDC (for x402 payments)
- GitHub account (for GitHub Models API access)

**Local Setup:**
```bash
# 1. Clone the repository
git clone [https://github.com/coldjaxx/alfa-agent.git](https://github.com/coldjaxx/alfa-agent.git)
cd alfa-agent

# 2. Install dependencies
npm install

# 3. Create environment config
cp .env.example .env

# 4. Start the autonomous loop
npm start