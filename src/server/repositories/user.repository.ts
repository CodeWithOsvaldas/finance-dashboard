import { UserProfile } from '@auth0/nextjs-auth0/client';
import { prisma } from '../db';

export const createIfNotExists = async (user: UserProfile) => {
  const userId = user.sub!;
  const userInDb = await prisma.user.findFirst({
    where: {
      id: userId,
    },
  });
  if (!userInDb) {
    await prisma.user.create({
      data: {
        id: userId,
      },
    });
  }
};
