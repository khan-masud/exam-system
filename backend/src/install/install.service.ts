import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class InstallService {
  private readonly envPath = path.resolve(process.cwd(), '.env');

  runChecks() {
    return {
      nodeVersion: process.version,
      envWritable: this.canWriteEnv(),
    };
  }

  writeEnv(config: Record<string, string>) {
    const contents = Object.entries(config)
      .map(([key, value]) => `${key}=${value}`)
      .join('\n');
    fs.writeFileSync(this.envPath, contents);
    return { success: true };
  }

  private canWriteEnv() {
    try {
      fs.accessSync(path.dirname(this.envPath), fs.constants.W_OK);
      return true;
    } catch (error) {
      return false;
    }
  }
}
