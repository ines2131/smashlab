# 🔐 Authentication System (Iron Session)

## 📌 Overview

SmashLab uses **Iron Session** for authentication, which provides a secure, cookie-based session system without relying on JWT or external auth providers.

This approach was chosen to:

- Keep session handling simple and server-controlled
- Avoid token storage complexity
- Ensure secure HTTP-only cookies
- Maintain full control over user session lifecycle

---

## ⚙️ Tech Choice: Why Iron Session?

Instead of JWT or NextAuth, Iron Session was chosen because:

| Approach         | Reason                                                            |
| ---------------- | ----------------------------------------------------------------- |
| JWT              | Requires manual refresh handling + token storage complexity       |
| NextAuth         | Overhead for small-to-medium custom auth system                   |
| **Iron Session** | Lightweight, server-controlled session stored in encrypted cookie |

I used Iron Session because this project is built with Next.js full-stack architecture,
and I needed a simple, secure, server-controlled session layer.
Unlike JWT, it removes token management complexity, and unlike NextAuth,
it gives me full control over authentication flow, which is important for implementing
guest cart synchronization and ecommerce user journeys.

---

## 🧠 Session Structure

```ts
// Session data stored in encrypted cookie
type SessionUser = {
  id: string;
  email: string;
};
```
