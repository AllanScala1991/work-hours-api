import { PrismaClient } from '@prisma/client';
import prisma from './Prisma';

describe('Prisma instance', () => {
  it('should be an instance of PrismaClient', () => {
    expect(prisma).toBeInstanceOf(PrismaClient);
  });
});