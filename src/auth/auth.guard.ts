import {CanActivate, ExecutionContext, Injectable, UnauthorizedException} from "@nestjs/common";
import {Request} from "express";
import {SupabaseService} from "../supabase/supabase.service";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private supabaseService: SupabaseService) {
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);

        if (!token) {
            return false;
        }
        const {data, error} = await this.supabaseService.getUser(token);
        return !(error || !data);
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}