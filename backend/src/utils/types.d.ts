import 'express-session';

declare module 'express-session' {
    interface SessionData {
        redirectUri?: string; // Add your custom property here
    }
}
