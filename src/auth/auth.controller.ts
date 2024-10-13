import {Body, Controller, Post} from '@nestjs/common';
import {LoginBody} from "./auth.types";
import {SupabaseService} from "../supabase/supabase.service";

@Controller('auth')
export class AuthController {
    constructor(private readonly supabaseService: SupabaseService) {
    }

    @Post('login')
    login(@Body() userInfo: LoginBody) {
        return this.supabaseService.login(userInfo.email, userInfo.password);
    }
}
