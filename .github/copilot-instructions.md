# Copilot Instructions for AyurTrace

## Project Overview
- **AyurTrace** is a full-stack web platform for end-to-end traceability of Ayurvedic products, prioritizing trust, transparency, and sustainability.
- The system uses blockchain/IPFS for immutable supply chain records, MongoDB for metadata, and role-based dashboards for each actor (Farmer, Processor, Lab Technician, Consumer).

## Architecture & Key Components
- **Frontend:** React + Tailwind CSS (in `frontend/`)
  - Each user role has a dedicated dashboard (see `frontend/src/pages/`)
  - Uses Google Maps API for geolocation display, QR code generation for consumer traceability
- **Backend:** Node.js + Express.js (in `backend/`)
  - REST API for all data exchange
  - JWT-based authentication/authorization
  - Integrates with MongoDB (metadata) and blockchain/IPFS (immutable logs)
- **Smart Contracts:** Solidity (in `smart-contracts/`)
  - Deployed to Ethereum/Polygon testnet
  - Handles append-only records for crop, process, lab, and shipping events

## Developer Workflows
- **Smart Contracts:**
  - Deploy: `cd smart-contracts && npx hardhat deploy`
  - Update ABI in backend/frontend after contract changes
- **Backend:**
  - Start: `cd backend && npm install && npm start`
  - Environment: `.env` for DB, blockchain, JWT secrets
- **Frontend:**
  - Start: `cd frontend && npm install && npm run dev`
  - Use `.env` for API endpoints, Google Maps keys

## Project-Specific Patterns
- All supply chain events are timestamped and written to blockchain/IPFS via backend endpoints
- Geotagged images: frontend collects browser geolocation + file upload, backend stores metadata and hashes to IPFS
- QR codes: generated per product batch, encode batch ID for consumer lookup
- Trust Score: calculated in backend based on verified, signed records
- Each dashboard restricts access to the authenticated role only

## Integration Points
- Blockchain/IPFS: see `backend/services/blockchain.js` and `smart-contracts/`
- MongoDB: see `backend/models/`
- QR code: see `frontend/src/components/QRCode.tsx`
- Geolocation: see `frontend/src/components/GeoImageUpload.tsx`

## Conventions
- Use append-only, immutable logs for all supply chain events
- Never allow direct record deletion or mutation—always append new events
- All API responses must include timestamps and actor role
- UI color palette: Ayurveda-inspired (green, earthy, saffron)

## Example: Adding a New Supply Chain Event
1. Frontend: User submits form (with geotag/image if needed)
2. Backend: Validates, writes metadata to MongoDB, hashes to IPFS, logs event on blockchain
3. All dashboards update in real-time via API polling or websockets (if implemented)

---
For any unclear conventions or missing details, consult `README.md` or ask for clarification.