import { useState, useEffect, useCallback } from "react";
export function useAuth() {
    const [user, setUser] = useState(null);
    const [session, setSession] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        // Dynamic import to avoid SSR issues with supabase client
        import("@/integrations/supabase/client").then(({ supabase }) => {
            const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
                setSession(session);
                setUser(session?.user ?? null);
                setIsLoading(false);
            });
            supabase.auth.getSession().then(({ data: { session } }) => {
                setSession(session);
                setUser(session?.user ?? null);
                setIsLoading(false);
            });
            return () => subscription.unsubscribe();
        });
    }, []);
    const signOut = useCallback(async () => {
        const { supabase } = await import("@/integrations/supabase/client");
        await supabase.auth.signOut();
    }, []);
    return { user, session, isLoading, signOut };
}
