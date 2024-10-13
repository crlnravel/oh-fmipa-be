import {BadRequestException, Injectable} from '@nestjs/common';
import {
    createClient,
    PostgrestError,
    PostgrestResponse,
    PostgrestSingleResponse,
    SupabaseClient
} from "@supabase/supabase-js";
import {Database, Tables} from "../types/database.types";
import {SupabaseService} from "../supabase/supabase.service";
import {PembayaranQuery} from "./pembayaran.types";

@Injectable()
export class PembayaranService {
    MAXSTOCK: number = 40;
    BUNDLE_COUNT = {
        "personal": 1,
        "trio": 3,
        "penta": 5,
    }

    private supabase: SupabaseClient;

    constructor(private supabaseService: SupabaseService) {
        this.supabase = supabaseService.getClient();
    }

    async getAllPembayaran(
        {
            page = 0,
            perPage = 10,
            search,
            bundle,
            paket,
            metode,
            status,
            kodeReveal,
        }: PembayaranQuery = {}): Promise<Tables<'pembayaran'>[]> {
        if (page < 0 || perPage < 0) {
            throw new BadRequestException("page cannot be negative number");
        }

        if (perPage > 300) perPage = 300;

        let query = this.supabase.from('pembayaran').select('*', {count: 'exact'});

        if (search) {
            query = query.or(`nama.ilike."%${search}%", email.ilike."%${search}%"`);
        }

        if (paket) {
            query.eq('paket', paket)
        }

        if (metode) {
            query = query.eq("metode", metode);
        }

        if (status) {
            query = query.eq("status", status);
        }

        if (bundle) {
            query = query.eq("bundle", bundle)
        }

        if (kodeReveal) {
            query = query.eq("kode_reveal", kodeReveal);
        }

        const { count, error: countError } = await query;
        if (countError) throw new BadRequestException(countError);

        const start = page * perPage;
        const end = start + perPage - 1;

        if (start > count - 1) {
            throw new BadRequestException("Page overload")
        }

        const { data: pembayaran, error } = await query.range(
            start,
            Math.min(end, count - 1),
        );
        if (error) throw new BadRequestException(error);

        return pembayaran;
    }
    
    async getPembayaranByID(id: string): Promise<Tables<'pembayaran'>> {
        const { data, error} = await this.supabase.from('pembayaran').select().eq('id', id).single();
        if (error) throw new BadRequestException(error);
        return data;
}

    async insertPembayaran(pembayaran: Database['public']['Tables']['pembayaran']['Insert']): Promise<Tables<'pembayaran'>> {
        const paket = pembayaran.paket as PembayaranQuery['paket']

        if ([1, 2, 3, 4, 5, 6].indexOf(paket) === -1) throw new BadRequestException("Paket harus berupa angka 1 - 6");

        const cnt = await this.countPembelian(paket)

        if (cnt + this.BUNDLE_COUNT[pembayaran.bundle] > this.MAXSTOCK) {
            throw new BadRequestException('Stok tidak cukup!')
        }

        const {data: result, error} = await this.supabase
            .from('pembayaran')
            .insert(pembayaran)
            .select()
            .single()
        if (error) throw new BadRequestException(error);
        return result;
    }

    async uploadBuktiPembayaran(file: Buffer, mimetype: string): Promise<string> {
        const fileName = crypto.randomUUID();
        const {data, error} = await this.supabase.storage
            .from('bukti_pembayaran')
            .upload(fileName, file.buffer, {
                contentType: mimetype,
            })
        if (error) throw new BadRequestException(error);

        const {data: url } = this.supabase.storage
            .from('bukti_pembayaran')
            .getPublicUrl(fileName)

        return url.publicUrl
    }

    async updatePembayaran(id: string, pembayaran: Database['public']['Tables']['pembayaran']['Update']): Promise<Tables<'pembayaran'>> {
        const paket = pembayaran.paket as PembayaranQuery['paket']

        if ([1, 2, 3, 4, 5, 6].indexOf(paket) === -1) throw new BadRequestException("Paket harus berupa angka 1 - 6");

        const cnt = await this.countPembelian(paket)

        if (cnt + this.BUNDLE_COUNT[pembayaran.bundle] > this.MAXSTOCK) {
            throw new BadRequestException('Stok tidak cukup!')
        }

        const {data: result, error} = await this.supabase
            .from('pembayaran')
            .update(pembayaran)
            .eq('id', id)
            .select()
            .single()
        if (error) throw new BadRequestException(error);
        return result;
    }

    async deletePembayaran(id: string) {
        const {error} = await this.supabase.from("pembayaran").delete().eq('id', id);
        if (error) throw new BadRequestException(error);
        return
    }

    async countStock(paket: PembayaranQuery['paket']) {
        return this.MAXSTOCK - (await this.countPembelian(paket));
    }

    async countPembelian(paket: PembayaranQuery['paket']) {
        const {data, error}: PostgrestSingleResponse<Tables<'pembayaran'>[]> = await this.supabase.from('pembayaran').select().eq('paket', paket).neq('status', 'rejected');
        let count = data.length;
        data.forEach(e => {
            if (e.bundle === 'trio') count += 2;
            else if (e.bundle === 'penta') count += 4;
        })
        if (error) throw new BadRequestException(error);
        return count;
    }
}
