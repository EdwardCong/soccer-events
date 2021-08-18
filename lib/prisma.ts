import { PrismaClient } from '@prisma/client';

// declare keyword used here to declare this constant without a variable
declare const global: NodeJS.Global & { prisma?: PrismaClient }

const prisma = global.prisma || new PrismaClient();

// ensure that the PrismaClient is global in development mode, 
// this stops us from having too many Prisma Clients running
if (process.env.NODE_ENV === 'development') global.prisma = prisma

export default prisma