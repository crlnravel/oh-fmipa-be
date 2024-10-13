import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Query,
    UploadedFile, UseGuards,
    UseInterceptors
} from '@nestjs/common';
import {Database, Tables} from "../types/database.types";
import {PembayaranService} from "./pembayaran.service";
import {PembayaranQuery} from "./pembayaran.types";
import {FileInterceptor} from "@nestjs/platform-express";
import {AuthGuard} from "../auth/auth.guard";

@Controller('pembayaran')
@UseGuards(AuthGuard)
export class PembayaranController {
    constructor(private readonly pembayaranService: PembayaranService) {
    }

    @Get()
    async findAll(
        @Query('page') page?: number,
        @Query('perPage') perPage?: number | undefined,
        @Query('search') search?: string,
        @Query('bundle') bundle?: PembayaranQuery['bundle'],
        @Query('paket') paket?: PembayaranQuery['paket'],
        @Query('metode') metode?: PembayaranQuery['metode'],
        @Query('status') status?: PembayaranQuery['status'],
        @Query('kodeReveal') kodeReveal?: string,
    ): Promise<Tables<'pembayaran'>[]> {
        return await this.pembayaranService.getAllPembayaran({
            page,
            perPage,
            search,
            bundle,
            paket,
            metode,
            status,
            kodeReveal,
        });
    }

    @Get(':id')
    async findByID(@Param('id') id: string): Promise<Tables<'pembayaran'>> {
        return this.pembayaranService.getPembayaranByID(id);
    }

    @Get('stok/:paket')
    async getStock(@Param('paket') paket: PembayaranQuery['paket']): Promise<number> {
        return this.pembayaranService.countStock(paket)
    }

    @Post()
    async create(@Body() pembayaran: Database['public']['Tables']['pembayaran']['Insert']): Promise<Tables<'pembayaran'>> {
        return this.pembayaranService.insertPembayaran(pembayaran);
    }

    @Post('upload')
    @UseInterceptors(FileInterceptor('bukti_pembayaran'))
    async uploadBukti(@UploadedFile() file: Express.Multer.File): Promise<string> {
        return this.pembayaranService.uploadBuktiPembayaran(file.buffer, file.mimetype)
    }

    @Put(':id')
    async update(
        @Param('id') id: string,
        @Body() pembayaran: Database['public']['Tables']['pembayaran']['Update'],
    ): Promise<Tables<'pembayaran'>> {
        return this.pembayaranService.updatePembayaran(id, pembayaran);
    }

    @Delete(':id')
    async delete(
        @Param('id') id: string,
    ): Promise<void> {
        return this.pembayaranService.deletePembayaran(id);
    }
}
