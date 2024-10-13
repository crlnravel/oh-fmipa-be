"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PembayaranService = void 0;
const common_1 = require("@nestjs/common");
const supabase_service_1 = require("../supabase/supabase.service");
let PembayaranService = class PembayaranService {
    constructor(supabaseService) {
        this.supabaseService = supabaseService;
        this.MAXSTOCK = 40;
        this.BUNDLE_COUNT = {
            "personal": 1,
            "trio": 3,
            "penta": 5,
        };
        this.supabase = supabaseService.getClient();
    }
    async getAllPembayaran({ page = 0, perPage = 10, search, bundle, paket, metode, status, kodeReveal, } = {}) {
        if (page < 0 || perPage < 0) {
            throw new common_1.BadRequestException("page cannot be negative number");
        }
        if (perPage > 300)
            perPage = 300;
        let query = this.supabase.from('pembayaran').select('*', { count: 'exact' });
        if (search) {
            query = query.or(`nama.ilike."%${search}%", email.ilike."%${search}%"`);
        }
        if (paket) {
            query.eq('paket', paket);
        }
        if (metode) {
            query = query.eq("metode", metode);
        }
        if (status) {
            query = query.eq("status", status);
        }
        if (bundle) {
            query = query.eq("bundle", bundle);
        }
        if (kodeReveal) {
            query = query.eq("kode_reveal", kodeReveal);
        }
        const { count, error: countError } = await query;
        if (countError)
            throw new common_1.BadRequestException(countError);
        const start = page * perPage;
        const end = start + perPage - 1;
        if (start > count - 1) {
            throw new common_1.BadRequestException("Page overload");
        }
        const { data: pembayaran, error } = await query.range(start, Math.min(end, count - 1));
        if (error)
            throw new common_1.BadRequestException(error);
        return pembayaran;
    }
    async getPembayaranByID(id) {
        const { data, error } = await this.supabase.from('pembayaran').select().eq('id', id).single();
        if (error)
            throw new common_1.BadRequestException(error);
        return data;
    }
    async insertPembayaran(pembayaran) {
        const paket = pembayaran.paket;
        if ([1, 2, 3, 4, 5, 6].indexOf(paket) === -1)
            throw new common_1.BadRequestException("Paket harus berupa angka 1 - 6");
        const cnt = await this.countPembelian(paket);
        if (cnt + this.BUNDLE_COUNT[pembayaran.bundle] > this.MAXSTOCK) {
            throw new common_1.BadRequestException('Stok tidak cukup!');
        }
        const { data: result, error } = await this.supabase
            .from('pembayaran')
            .insert(pembayaran)
            .select()
            .single();
        if (error)
            throw new common_1.BadRequestException(error);
        return result;
    }
    async uploadBuktiPembayaran(file, mimetype) {
        const fileName = crypto.randomUUID();
        const { data, error } = await this.supabase.storage
            .from('bukti_pembayaran')
            .upload(fileName, file.buffer, {
            contentType: mimetype,
        });
        if (error)
            throw new common_1.BadRequestException(error);
        const { data: url } = this.supabase.storage
            .from('bukti_pembayaran')
            .getPublicUrl(fileName);
        return url.publicUrl;
    }
    async updatePembayaran(id, pembayaran) {
        const paket = pembayaran.paket;
        if ([1, 2, 3, 4, 5, 6].indexOf(paket) === -1)
            throw new common_1.BadRequestException("Paket harus berupa angka 1 - 6");
        const cnt = await this.countPembelian(paket);
        if (cnt + this.BUNDLE_COUNT[pembayaran.bundle] > this.MAXSTOCK) {
            throw new common_1.BadRequestException('Stok tidak cukup!');
        }
        const { data: result, error } = await this.supabase
            .from('pembayaran')
            .update(pembayaran)
            .eq('id', id)
            .select()
            .single();
        if (error)
            throw new common_1.BadRequestException(error);
        return result;
    }
    async deletePembayaran(id) {
        const { error } = await this.supabase.from("pembayaran").delete().eq('id', id);
        if (error)
            throw new common_1.BadRequestException(error);
        return;
    }
    async countStock(paket) {
        return this.MAXSTOCK - (await this.countPembelian(paket));
    }
    async countPembelian(paket) {
        const { data, error } = await this.supabase.from('pembayaran').select().eq('paket', paket).neq('status', 'rejected');
        let count = data.length;
        data.forEach(e => {
            if (e.bundle === 'trio')
                count += 2;
            else if (e.bundle === 'penta')
                count += 4;
        });
        if (error)
            throw new common_1.BadRequestException(error);
        return count;
    }
};
exports.PembayaranService = PembayaranService;
exports.PembayaranService = PembayaranService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [supabase_service_1.SupabaseService])
], PembayaranService);
//# sourceMappingURL=pembayaran.service.js.map