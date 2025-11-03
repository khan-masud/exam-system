import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { License } from './license.entity';
import axios from 'axios';

@Injectable()
export class LicenseService {
  constructor(@InjectRepository(License) private readonly licensesRepo: Repository<License>) {}

  async activate(purchaseCode: string, domain: string) {
    const handshake = await axios.post((process.env.LICENSE_SERVER_URL || 'https://license.example.com') + '/verify', {
      purchaseCode,
      domain,
    });
    const license = this.licensesRepo.create({ purchaseCode, domain, status: handshake.data.status, meta: handshake.data });
    return this.licensesRepo.save(license);
  }

  async verify(purchaseCode: string) {
    return this.licensesRepo.findOneOrFail({ where: { purchaseCode } });
  }

  async deactivate(purchaseCode: string) {
    const license = await this.licensesRepo.findOneOrFail({ where: { purchaseCode } });
    license.status = 'revoked';
    return this.licensesRepo.save(license);
  }
}
