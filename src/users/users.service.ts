import { Injectable } from '@nestjs/common';
import { User, UserRole } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { RegisterInput } from 'src/auth/types';
import { PrismaService } from 'src/prisma.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  async findOne(email: string): Promise<User | undefined> {
    const userId = await this.prisma.user.findUnique({
      where: { email },
    });
    console.log(userId);
    if (!userId) {
      return undefined;
    }
    return {
      id: userId.id,
      email: email,
      password: userId.password,
      role: userId.role,
      username: userId.username,
      createdAt: userId.createdAt,
      updatedAt: userId.updatedAt,
    };
  }

  async findOneById(userId: string): Promise<User | undefined> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });
    console.log(user);
    if (!user) {
      return undefined;
    }
    return {
      id: user.id,
      email: user.email,
      password: user.password,
      role: user.role,
      username: user.username,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  async createUser(input: RegisterInput, isAdmin = false): Promise<string> {
    const hashedPassword = await bcrypt.hash(input.password, 10);
    try {
      const user = await this.prisma.user.create({
        data: {
          id: uuidv4(),
          email: input.email,
          password: hashedPassword,
          username: input.username,
          role: isAdmin ? UserRole.ADMIN : UserRole.USER,
        },
      });
      console.log('reached here');
      console.log(user);
      return user.id.toString();
    } catch (error) {
      console.log(error);
      throw new Error('Failed to create user');
    }
  }
}
