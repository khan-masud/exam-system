import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { Role } from './role.entity';
import { UserRole } from './user-role.entity';
import { UserBlock } from './user-block.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepo: Repository<User>,
    @InjectRepository(Role) private readonly rolesRepo: Repository<Role>,
    @InjectRepository(UserRole) private readonly userRoleRepo: Repository<UserRole>,
    @InjectRepository(UserBlock) private readonly blocksRepo: Repository<UserBlock>,
  ) {}

  async findById(id: string): Promise<User> {
    return this.usersRepo.findOneOrFail({ where: { id } });
  }

  async assignDefaultRoles(userId: string): Promise<void> {
    const defaultRole = await this.rolesRepo.findOne({ where: { name: 'candidate' } });
    if (!defaultRole) {
      const role = this.rolesRepo.create({ name: 'candidate', permissions: { exams: true } });
      await this.rolesRepo.save(role);
    }
    const roleEntity = await this.rolesRepo.findOneOrFail({ where: { name: 'candidate' } });
    const relation = this.userRoleRepo.create({ user: { id: userId } as User, role: roleEntity, isPrimary: true });
    await this.userRoleRepo.save(relation);
  }

  async listSessions(userId: string): Promise<Array<Record<string, unknown>>> {
    // placeholder for session store integration
    return [{ device: 'Web', lastActive: new Date().toISOString() }];
  }

  async blockUser(userId: string, scope: string, reason: string, expiresAt?: Date) {
    const block = this.blocksRepo.create({ user: { id: userId } as User, scope, reason, expiresAt });
    await this.blocksRepo.save(block);
    return block;
  }

  async unblockUser(blockId: string) {
    await this.blocksRepo.delete(blockId);
  }

  async assignRole(userId: string, roleName: string) {
    let role = await this.rolesRepo.findOne({ where: { name: roleName } });
    if (!role) {
      role = this.rolesRepo.create({ name: roleName, permissions: {} });
      await this.rolesRepo.save(role);
    }
    const relation = this.userRoleRepo.create({ user: { id: userId } as User, role });
    await this.userRoleRepo.save(relation);
    return relation;
  }

  async getPublicProfile(userId: string) {
    const user = await this.usersRepo.findOne({ where: { id: userId } });
    if (!user || !user.isProfilePublic) {
      throw new NotFoundException('Profile not found');
    }
    return {
      id: user.id,
      email: user.email,
      badges: ['consistent-candidate'],
    };
  }
}
