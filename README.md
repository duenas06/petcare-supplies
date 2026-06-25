# Jibs Petcare Supplies & Delivery

Cat-only ecommerce storefront inspired by modern pet supply stores, built with:

- Next.js + React frontend
- Redux Toolkit state management
- Express + Node.js backend
- Shared TypeScript product/order/payment types
- Reusable CRUD service for API resources

## Run locally

```bash
npm install
npm run dev
```

Frontend: http://localhost:3000

API: http://localhost:4000/api

## Payment flow

Checkout supports GCash and bank transfer as order payment methods. This demo records the selected method and payment reference/instructions. Real payment collection still needs integration with a licensed payment provider or manual reconciliation process.
# petcare-supplies
