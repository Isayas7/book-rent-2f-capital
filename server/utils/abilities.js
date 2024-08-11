
import { defineAbility } from '@casl/ability';
import { UserRole } from '@prisma/client';

export default function defineAbilityFor(user) {
  return defineAbility((can) => {
    if (user.role === UserRole.ADMIN) {
      can("get", "Owners");
      can("change", "OwnerStatus");
      can("get", "Books");
      can("change", "bookStatus");

    } else if (user.role === UserRole.OWNER) {
      can("upload", "Book");
      can("update", "Book", { ownerId: user.id });
      can("delete", "Book", { ownerId: user.id });
      can("get", "OwnBook");
    }
  });
}