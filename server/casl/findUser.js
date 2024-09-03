import prisma from "../utils/connect.js";
import { interpolate } from './interpolate.js';

export async function findBy(where) {
  const user = await prisma.user.findUnique({
    where,
    include: {
      role: {
        include: {
          permissions: {
            include: {
              permission: true,
            },
          },
        },
      },
    },
  });

  // Interpolate each permission in the user's role
  const interpolatedPermissions = user.role.permissions.map(rp =>
    interpolate(rp.permission, { user })
  );

  return {
    id: user.id,
    email: user.email,
    role: user.role.name,
    permissions: interpolatedPermissions,
  };
}

