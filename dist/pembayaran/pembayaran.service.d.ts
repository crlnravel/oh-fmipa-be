import { Database, Tables } from "../types/database.types";
import { SupabaseService } from "../supabase/supabase.service";
import { PembayaranQuery } from "./pembayaran.types";
export declare class PembayaranService {
    private supabaseService;
    MAXSTOCK: number;
    BUNDLE_COUNT: {
        personal: number;
        trio: number;
        penta: number;
    };
    private supabase;
    constructor(supabaseService: SupabaseService);
    getAllPembayaran({ page, perPage, search, bundle, paket, metode, status, kodeReveal, }?: PembayaranQuery): Promise<Tables<'pembayaran'>[]>;
    getPembayaranByID(id: string): Promise<Tables<'pembayaran'>>;
    insertPembayaran(pembayaran: Database['public']['Tables']['pembayaran']['Insert']): Promise<Tables<'pembayaran'>>;
    uploadBuktiPembayaran(file: Buffer, mimetype: string): Promise<string>;
    updatePembayaran(id: string, pembayaran: Database['public']['Tables']['pembayaran']['Update']): Promise<Tables<'pembayaran'>>;
    deletePembayaran(id: string): Promise<void>;
    countStock(paket: PembayaranQuery['paket']): Promise<number>;
    countPembelian(paket: PembayaranQuery['paket']): Promise<number>;
}
