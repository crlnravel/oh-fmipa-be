import { SupabaseClient } from "@supabase/supabase-js";
export declare class SupabaseService {
    private supabase;
    constructor();
    getClient(): SupabaseClient<any, "public", any>;
    login(email: string, password: string): Promise<import("@supabase/supabase-js").AuthSession>;
    getUser(token: string): Promise<import("@supabase/supabase-js").UserResponse>;
}
