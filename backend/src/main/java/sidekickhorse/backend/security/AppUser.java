package sidekickhorse.backend.security;

import lombok.With;

@With
public record AppUser(
        String id,
        String username,
        String password,
        String passwordBcrypt,
        AppUserRole role
) {
}
