export declare class PembayaranQuery {
    page?: number;
    perPage?: number;
    search?: string;
    bundle?: "personal" | "trio" | "penta";
    paket?: 1 | 2 | 3 | 4 | 5 | 6;
    metode?: "bank" | "e-wallet" | "cash";
    status?: "pending" | "verified" | "rejected";
    kodeReveal?: string;
}
