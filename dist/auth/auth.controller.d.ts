import { LoginBody } from "./auth.types";
import { SupabaseService } from "../supabase/supabase.service";
export declare class AuthController {
    private readonly supabaseService;
    constructor(supabaseService: SupabaseService);
    login(userInfo: LoginBody): Promise<import("@supabase/supabase-js").AuthSession>;
}
