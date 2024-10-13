import { Test, TestingModule } from '@nestjs/testing';
import { PembayaranController } from './pembayaran.controller';
import {PembayaranService} from "./pembayaran.service";
import {SupabaseModule} from "../supabase/supabase.module";
import {ConfigModule} from "@nestjs/config";
import {Tables} from "../types/database.types";

describe('PembayaranController', () => {
  let controller: PembayaranController;
  let service: PembayaranService;

  const result: Tables<'pembayaran'>[] = [
    {
      id: 'asdfasdfasdfasdf',
      created_at: '',
      nama: 'TEST',
      asal_sekolah: 'SMA Muhammadiyah 4 Jakarta',
      kelas: 12,
      email: 'auliab652@gmail.com',
      kontak: '089505024508',
      kode_reveal: '-',
      bukti_transaksi_url: 'https://odyhttpbetixqciqwtmy.supabase.co/storage/v1/object/public/bukti_pembayaran/79b2d0a3-d0a1-4ec3-94be-006ad06321f2',
      paket: 6,
      metode: 'e-wallet',
      status: 'verified',
      bundle: 'trio'
    }
  ]

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [SupabaseModule, ConfigModule.forRoot()],
      controllers: [PembayaranController],
      providers: [PembayaranService]
    }).compile();

    service = module.get<PembayaranService>(PembayaranService);
    controller = module.get<PembayaranController>(PembayaranController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  })

  describe('findAll', () => {
    it('should return whole database', async () => {
      jest.spyOn(service, 'getAllPembayaran').mockImplementation(async () => result)
      expect(await controller.findAll()).toBe(result)
    })

    it('should return a single instance', async () => {
      jest.spyOn(service, 'getPembayaranByID').mockImplementation(async (id) => result[0]);
      expect(await controller.findByID('blablabla')).toBe(result[0])
    })
  })
});
