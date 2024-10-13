import { Test, TestingModule } from '@nestjs/testing';
import { PembayaranService } from './pembayaran.service';
import {ConfigModule} from "@nestjs/config";
import {Database} from "../types/database.types";
import {SupabaseService} from "../supabase/supabase.service";
import {SupabaseModule} from "../supabase/supabase.module";
import {BadRequestException} from "@nestjs/common";
import * as fs from "node:fs";

describe('PembayaranService', () => {
  let service: PembayaranService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot(), SupabaseModule],
      providers: [PembayaranService],
    }).compile();

    service = module.get<PembayaranService>(PembayaranService);

    await module.get<SupabaseService>(SupabaseService).login(process.env.EMAIL, process.env.PASSWORD);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should output ok', async () => {
    const data = await service.getAllPembayaran()
    expect(data).toBeDefined()
  })

  it('should insert fine', async () => {
    const data: Database['public']['Tables']['pembayaran']['Insert'] = {
      nama: 'TEST',
      asal_sekolah: 'SMA Muhammadiyah 4 Jakarta',
      kelas: 12,
      email: 'auliab652@gmail.com',
      kontak: '089505024508',
      kode_reveal: '-',
      bukti_transaksi_url: 'https://odyhttpbetixqciqwtmy.supabase.co/storage/v1/object/public/bukti_pembayaran/79b2d0a3-d0a1-4ec3-94be-006ad06321f2',
      paket: 5,
      metode: 'e-wallet',
      status: 'verified',
      bundle: 'personal'
    }

    const fetched = await service.insertPembayaran(data)

    expect(fetched).toBeDefined()
  })

  it('should delete successfully', async () => {
    const data: Database['public']['Tables']['pembayaran']['Insert'] = {
      nama: 'TEST',
      asal_sekolah: 'SMA Muhammadiyah 4 Jakarta',
      kelas: 12,
      email: 'auliab652@gmail.com',
      kontak: '089505024508',
      kode_reveal: '-',
      bukti_transaksi_url: 'https://odyhttpbetixqciqwtmy.supabase.co/storage/v1/object/public/bukti_pembayaran/79b2d0a3-d0a1-4ec3-94be-006ad06321f2',
      paket: 5,
      metode: 'e-wallet',
      status: 'verified',
      bundle: 'personal'
    }
    const fetched = await service.insertPembayaran(data)

    await service.deletePembayaran(fetched.id)

    await expect(service.getPembayaranByID(fetched.id)).rejects.toThrow(BadRequestException);
  })

  it('should count trio and penta successfully', async () => {
    const data: Database['public']['Tables']['pembayaran']['Insert'] = {
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

    const {id} = await service.insertPembayaran(data)

    const paket = 6
    const fetched = await service.getAllPembayaran({perPage: 300, paket})
    expect(fetched.length).toBeLessThan(await service.countPembelian(paket));
    await service.deletePembayaran(id)
  })

  it("should return more bcs it's trio", async () => {
    const paket = 6

    const data: Database['public']['Tables']['pembayaran']['Insert'] = {
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

    const cnt1 = await service.countPembelian(paket);

    const {id} = await service.insertPembayaran(data);

    const cnt = await service.countPembelian(paket);
    console.log(cnt - cnt1);
    expect(cnt - cnt1).toEqual(3)

    await service.deletePembayaran(id)
  })

  it('test', async () => {
    const paket = 1
    console.log(await service.getAllPembayaran({paket}))
  })

  it('test upload file', async () => {
    const pathToFile = 'C:\\Users\\USER\\WebstormProjects\\oh-fmipa-be\\testimg/line-graph.png'
    const file = fs.readFileSync(pathToFile)
    const url = await service.uploadBuktiPembayaran(file, 'image/png')
    expect(url).toBeDefined()
    console.log(url)
  })
});
