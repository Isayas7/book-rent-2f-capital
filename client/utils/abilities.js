import { UserRole } from "@/utils/schema";
import { defineAbility } from '@casl/ability';

export default function defineAbilityFor(user) {
    return defineAbility((can) => {
        if (user?.role === UserRole.bookAdmin) {
            can("view", "dashboard");
            can("view", "books");
            can("view", "other");
        }
        else if (user?.role === UserRole.userAdmin) {
            can("view", "owners");
            can("view", "roles");
            can("view", "other");
        }
        else if (user?.role === UserRole.owner) {
            can("view", "dashboard");
            can("view", "bookUpload");
            can("view", "other");
        }
        can("view", "other");
        can("view", "notification");
        can("view", "settings");
        can("view", "loginAs");
    });
}

