import { Test, TestingModule } from '@nestjs/testing';
import { SupabaseService } from './supabase.service';
import {ConfigModule} from "@nestjs/config";

describe('SupabaseService', () => {
  let service: SupabaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot()],
      providers: [SupabaseService],
    }).compile();

    service = module.get<SupabaseService>(SupabaseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be logged in', async () => {
    const data = await service.login(process.env.EMAIL, process.env.PASSWORD);
    console.log(data)
    expect(data).toBeDefined()
  })
});
