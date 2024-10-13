import { CanActivate, ExecutionContext } from "@nestjs/common";
import { SupabaseService } from "../supabase/supabase.service";
export declare class AuthGuard implements CanActivate {
    private supabaseService;
    constructor(supabaseService: SupabaseService);
    canActivate(context: ExecutionContext): Promise<boolean>;
    private extractTokenFromHeader;
}
