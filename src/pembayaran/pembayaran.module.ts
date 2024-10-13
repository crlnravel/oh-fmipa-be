import { Module } from '@nestjs/common';
import { PembayaranService } from './pembayaran.service';
import { PembayaranController } from './pembayaran.controller';
import {ConfigModule} from "@nestjs/config";
import {SupabaseModule} from "../supabase/supabase.module";
import {AuthModule} from "../auth/auth.module";

@Module({
  imports: [SupabaseModule, AuthModule],
  providers: [PembayaranService],
  controllers: [PembayaranController]
})
export class PembayaranModule {}
