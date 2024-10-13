import {BadRequestException, Injectable} from '@nestjs/common';
import {createClient, SupabaseClient} from "@supabase/supabase-js";
import {Database} from "../types/database.types";

@Injectable()
export class SupabaseService {
    private supabase: SupabaseClient;

    constructor() {
        this.supabase = createClient<Database>(
            process.env.SUPABASE_URL,
            process.env.SUPABASE_KEY,
        );
    }

    getClient() {
        return this.supabase;
    }

    async login(email: string, password: string) {
        const {data, error} = await this.supabase.auth.signInWithPassword({
            email,
            password,
        })
        if (error) throw new BadRequestException(error);
        return data.session;
    }

    getUser(token: string) {
        return this.supabase.auth.getUser(token);
    }
}
