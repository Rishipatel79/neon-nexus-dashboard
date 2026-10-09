# ProcurePilot AI

Neon procurement workspace built with React 19, TypeScript, TanStack Start, Tailwind CSS 4, Lucide and Recharts.

## Run locally in VS Code (Windows, macOS or Linux)

1. Extract the ZIP into a folder and open that folder in VS Code.
2. Install Node.js 22 or later.
3. Open Terminal → New Terminal.
4. Run `npm install`.
5. Run `npm run dev -- --port 5173`.
6. Open `http://localhost:5173`.

No API keys, account or database is needed for this demo. An internet connection is needed to install packages; Google Fonts can fall back to the system sans-serif font offline. The development configuration uses an installed build-helper package, not a hosted service, and does not require a Lovable login. Production hosting outside this workspace has not been verified.

If port 5173 is busy, use `npm run dev -- --port 5174`. Stop the terminal with Ctrl+C. If installation fails, check your Node version and internet connection. Run `npm test -- src/test/procurement.test.ts` for domain tests.

## Editable project structure

- `src/routes/index.tsx`: first screen and Go to overview action.
- `src/routes/overview.tsx`: current inventory charts and calculated metrics.
- `src/routes/inventory.tsx`: search, filters, sorting, pagination, CSV and quantity editing.
- `src/routes/suppliers.tsx`: directory and side-by-side comparison.
- `src/routes/purchase-orders.tsx`: drafts, approval/rejection, cancellation and receiving.
- `src/routes/transfers.tsx`: safe transfer planning and approval.
- `src/routes/copilot.tsx`: deterministic evidence-based procurement answers.
- `src/components/procure/`: shared shell, state, reusable sections and stock detail dialog.
- `src/lib/procurement.ts`: editable fictional records and pure business calculations.
- `src/styles.css`: semantic neon tokens, layouts and animation.
- `src/assets/`: generated logistics artwork.
- `src/test/procurement.test.ts`: calculation tests.

## Implemented demo workflows

- Active workspace → overview with shared sidebar and working routes.
- 32 fictional inventory records across six stores and two warehouses; eight suppliers; twelve purchase orders.
- Quantity edits recalculate risks, chart values and stock totals across pages.
- Search and inventory filters; pagination; CSV exports.
- Category-aware supplier comparison.
- Purchase-order creation/editing and validated demo approval/rejection/cancellation.
- Receiving demo orders updates the destination inventory.
- Safe transfer drafts with alternative sources and reserve protection rechecked on approval.
- Notifications, profile and resource dialogs, Ctrl/Cmd+K search, Escape-to-close.
- Rule-based copilot with evidence, overdue orders, safe transfer calculations and a 20% demand scenario.

## Verification

Eight domain tests passed. Browser checks verified welcome-to-overview navigation, inventory editing, purchase-order creation, transfer draft/approval, and copilot evidence. Desktop and phone layouts were inspected; phone had no page-wide horizontal overflow. No browser page errors were observed. The source ZIP was inspected for excluded dependencies and metadata.

## Important limitations

This delivery prioritizes the requested neon interactive UI. All records are fictional and all operations are simulated in frontend memory. **Refresh resets edits.** No real ERP, supplier, email or payment system is connected. The copilot is deterministic, not a configured AI language model. There is no login, persisted database, Python/FastAPI backend or REST API. Therefore no `requirements.txt`, Python environment or backend setup is needed or included. The brief's requested Python stack and React Router were not used: this workspace uses TanStack Start and TypeScript.

The charts show current data, not invented historical trends. Advanced column visibility, bulk editing, CSV import, additional trend charts and light-theme switching are not implemented. Command search finds entities and opens their workspace page; it does not preselect an individual record. Order-history timelines are not implemented. Existing order dates are editable fictional sample dates. Draft suggestions subtract incoming ordered quantities; late delivery dates are not assumed to eliminate immediate stockout risk. External production hosting and a clean installation of the ZIP on Windows have not been tested.
