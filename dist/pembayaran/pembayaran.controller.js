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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PembayaranController = void 0;
const common_1 = require("@nestjs/common");
const pembayaran_service_1 = require("./pembayaran.service");
const platform_express_1 = require("@nestjs/platform-express");
const auth_guard_1 = require("../auth/auth.guard");
let PembayaranController = class PembayaranController {
    constructor(pembayaranService) {
        this.pembayaranService = pembayaranService;
    }
    async findAll(page, perPage, search, bundle, paket, metode, status, kodeReveal) {
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
    async findByID(id) {
        return this.pembayaranService.getPembayaranByID(id);
    }
    async getStock(paket) {
        return this.pembayaranService.countStock(paket);
    }
    async create(pembayaran) {
        return this.pembayaranService.insertPembayaran(pembayaran);
    }
    async uploadBukti(file) {
        console.log(file.mimetype);
        return this.pembayaranService.uploadBuktiPembayaran(file.buffer, file.mimetype);
    }
    async update(id, pembayaran) {
        return this.pembayaranService.updatePembayaran(id, pembayaran);
    }
    async delete(id) {
        return this.pembayaranService.deletePembayaran(id);
    }
};
exports.PembayaranController = PembayaranController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('perPage')),
    __param(2, (0, common_1.Query)('search')),
    __param(3, (0, common_1.Query)('bundle')),
    __param(4, (0, common_1.Query)('paket')),
    __param(5, (0, common_1.Query)('metode')),
    __param(6, (0, common_1.Query)('status')),
    __param(7, (0, common_1.Query)('kodeReveal')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String, Object, Object, Object, Object, String]),
    __metadata("design:returntype", Promise)
], PembayaranController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PembayaranController.prototype, "findByID", null);
__decorate([
    (0, common_1.Get)('stok/:paket'),
    __param(0, (0, common_1.Param)('paket')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PembayaranController.prototype, "getStock", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PembayaranController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('upload'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('bukti_pembayaran')),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PembayaranController.prototype, "uploadBukti", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], PembayaranController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PembayaranController.prototype, "delete", null);
exports.PembayaranController = PembayaranController = __decorate([
    (0, common_1.Controller)('pembayaran'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __metadata("design:paramtypes", [pembayaran_service_1.PembayaranService])
], PembayaranController);
//# sourceMappingURL=pembayaran.controller.js.map