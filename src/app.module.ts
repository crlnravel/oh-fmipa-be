import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PembayaranModule } from './pembayaran/pembayaran.module';
import {ConfigModule} from "@nestjs/config";
import { SupabaseModule } from './supabase/supabase.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [PembayaranModule, ConfigModule.forRoot({
    isGlobal: true,
  }), SupabaseModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
