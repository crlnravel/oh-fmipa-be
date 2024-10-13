"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PembayaranModule = void 0;
const common_1 = require("@nestjs/common");
const pembayaran_service_1 = require("./pembayaran.service");
const pembayaran_controller_1 = require("./pembayaran.controller");
const supabase_module_1 = require("../supabase/supabase.module");
const auth_module_1 = require("../auth/auth.module");
let PembayaranModule = class PembayaranModule {
};
exports.PembayaranModule = PembayaranModule;
exports.PembayaranModule = PembayaranModule = __decorate([
    (0, common_1.Module)({
        imports: [supabase_module_1.SupabaseModule, auth_module_1.AuthModule],
        providers: [pembayaran_service_1.PembayaranService],
        controllers: [pembayaran_controller_1.PembayaranController]
    })
], PembayaranModule);
//# sourceMappingURL=pembayaran.module.js.map