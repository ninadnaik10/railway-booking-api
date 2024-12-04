import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { RegisterInput } from 'src/auth/types';
import { PrismaService } from 'src/prisma.service';
export type User = {
  userId: string;
  hashedPassword?: string;
  email: string;
};

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
      userId: userId.id.toString(),
      email: email,
      hashedPassword: userId.password,
    };
  }

  async createUser(input: RegisterInput): Promise<string> {
    const hashedPassword = await bcrypt.hash(input.password, 10);
    try {
      const user = await this.prisma.user.create({
        data: {
          email: input.email,
          password: hashedPassword,
          username: input.username,
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
