import { cookies } from "next/headers";

const SESSION_COOKIE = "fleetflow_session";

export async function setSession(userData: { id: string; email: string; name: string; role: string }) {
    const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days
    const sessionData = JSON.stringify(userData);

    const cookieStore = await cookies();
    cookieStore.set(SESSION_COOKIE, sessionData, {
        expires,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
    });
}

export async function getSession() {
    const cookieStore = await cookies();
    const session = cookieStore.get(SESSION_COOKIE);
    if (!session?.value) return null;

    try {
        return JSON.parse(session.value) as { id: string; email: string; name: string; role: string };
    } catch {
        return null;
    }
}

export async function logout() {
    const cookieStore = await cookies();
    cookieStore.delete(SESSION_COOKIE);
}
