import { Database, Tables } from "../types/database.types";
import { PembayaranService } from "./pembayaran.service";
import { PembayaranQuery } from "./pembayaran.types";
export declare class PembayaranController {
    private readonly pembayaranService;
    constructor(pembayaranService: PembayaranService);
    findAll(page?: number, perPage?: number | undefined, search?: string, bundle?: PembayaranQuery['bundle'], paket?: PembayaranQuery['paket'], metode?: PembayaranQuery['metode'], status?: PembayaranQuery['status'], kodeReveal?: string): Promise<Tables<'pembayaran'>[]>;
    findByID(id: string): Promise<Tables<'pembayaran'>>;
    getStock(paket: PembayaranQuery['paket']): Promise<number>;
    create(pembayaran: Database['public']['Tables']['pembayaran']['Insert']): Promise<Tables<'pembayaran'>>;
    uploadBukti(file: Express.Multer.File): Promise<string>;
    update(id: string, pembayaran: Database['public']['Tables']['pembayaran']['Update']): Promise<Tables<'pembayaran'>>;
    delete(id: string): Promise<void>;
}
