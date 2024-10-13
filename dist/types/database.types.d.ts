export type Json = string | number | boolean | null | {
    [key: string]: Json | undefined;
} | Json[];
export type Database = {
    public: {
        Tables: {
            pembayaran: {
                Row: {
                    asal_sekolah: string;
                    bukti_transaksi_url: string | null;
                    bundle: Database["public"]["Enums"]["bundle_type"];
                    created_at: string;
                    email: string;
                    id: string;
                    kelas: number;
                    kode_reveal: string | null;
                    kontak: string;
                    metode: Database["public"]["Enums"]["metode"];
                    nama: string;
                    paket: number;
                    status: Database["public"]["Enums"]["payment_status"];
                };
                Insert: {
                    asal_sekolah: string;
                    bukti_transaksi_url?: string | null;
                    bundle?: Database["public"]["Enums"]["bundle_type"];
                    created_at?: string;
                    email: string;
                    id?: string;
                    kelas: number;
                    kode_reveal?: string | null;
                    kontak: string;
                    metode: Database["public"]["Enums"]["metode"];
                    nama: string;
                    paket: number;
                    status?: Database["public"]["Enums"]["payment_status"];
                };
                Update: {
                    asal_sekolah?: string;
                    bukti_transaksi_url?: string | null;
                    bundle?: Database["public"]["Enums"]["bundle_type"];
                    created_at?: string;
                    email?: string;
                    id?: string;
                    kelas?: number;
                    kode_reveal?: string | null;
                    kontak?: string;
                    metode?: Database["public"]["Enums"]["metode"];
                    nama?: string;
                    paket?: number;
                    status?: Database["public"]["Enums"]["payment_status"];
                };
                Relationships: [];
            };
        };
        Views: {
            [_ in never]: never;
        };
        Functions: {
            [_ in never]: never;
        };
        Enums: {
            bundle_type: "personal" | "trio" | "penta";
            metode: "bank" | "e-wallet" | "cash";
            payment_status: "verified" | "pending" | "rejected";
        };
        CompositeTypes: {
            [_ in never]: never;
        };
    };
};
type PublicSchema = Database[Extract<keyof Database, "public">];
export type Tables<PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] & PublicSchema["Views"]) | {
    schema: keyof Database;
}, TableName extends PublicTableNameOrOptions extends {
    schema: keyof Database;
} ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] & Database[PublicTableNameOrOptions["schema"]]["Views"]) : never = never> = PublicTableNameOrOptions extends {
    schema: keyof Database;
} ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] & Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
    Row: infer R;
} ? R : never : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] & PublicSchema["Views"]) ? (PublicSchema["Tables"] & PublicSchema["Views"])[PublicTableNameOrOptions] extends {
    Row: infer R;
} ? R : never : never;
export type TablesInsert<PublicTableNameOrOptions extends keyof PublicSchema["Tables"] | {
    schema: keyof Database;
}, TableName extends PublicTableNameOrOptions extends {
    schema: keyof Database;
} ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"] : never = never> = PublicTableNameOrOptions extends {
    schema: keyof Database;
} ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
    Insert: infer I;
} ? I : never : PublicTableNameOrOptions extends keyof PublicSchema["Tables"] ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
    Insert: infer I;
} ? I : never : never;
export type TablesUpdate<PublicTableNameOrOptions extends keyof PublicSchema["Tables"] | {
    schema: keyof Database;
}, TableName extends PublicTableNameOrOptions extends {
    schema: keyof Database;
} ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"] : never = never> = PublicTableNameOrOptions extends {
    schema: keyof Database;
} ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
    Update: infer U;
} ? U : never : PublicTableNameOrOptions extends keyof PublicSchema["Tables"] ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
    Update: infer U;
} ? U : never : never;
export type Enums<PublicEnumNameOrOptions extends keyof PublicSchema["Enums"] | {
    schema: keyof Database;
}, EnumName extends PublicEnumNameOrOptions extends {
    schema: keyof Database;
} ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"] : never = never> = PublicEnumNameOrOptions extends {
    schema: keyof Database;
} ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName] : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"] ? PublicSchema["Enums"][PublicEnumNameOrOptions] : never;
export {};
