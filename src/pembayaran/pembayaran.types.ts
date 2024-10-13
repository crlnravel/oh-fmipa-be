import {IsIn, IsInt, IsString} from "class-validator";

export class PembayaranQuery {
    @IsInt()
    page?: number;

    @IsInt()
    perPage?: number;

    @IsString()
    search?: string;

    @IsIn(['personal', 'trio', 'penta'])
    bundle?: "personal" | "trio" | "penta";

    @IsIn([1, 2, 3, 4, 5, 6])
    paket?: 1 | 2 | 3 | 4 | 5 | 6;

    @IsIn(["bank", 'e-wallet', 'cash'])
    metode?: "bank" | "e-wallet" | "cash";

    @IsIn(["pending", "verified", "rejected"])
    status?: "pending" | "verified" | "rejected";

    @IsString()
    kodeReveal?: string;
}
