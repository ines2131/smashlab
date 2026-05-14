import { SessionOptions } from "iron-session";

export interface SessionData {
  user?: {
    id: string;
    email: string;
  };
}

export const sessionOptions: SessionOptions = {
  password: process.env.SESSION_PASSWORD!,
  cookieName: "smashlab-session",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
};
