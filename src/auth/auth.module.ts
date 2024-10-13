import { Module } from '@nestjs/common';
import {SupabaseModule} from "../supabase/supabase.module";
import {AuthGuard} from "./auth.guard";
import { AuthController } from './auth.controller';

@Module({
    imports: [SupabaseModule],
    providers: [AuthGuard],
    exports: [AuthGuard],
    controllers: [AuthController],
})
export class AuthModule {}
