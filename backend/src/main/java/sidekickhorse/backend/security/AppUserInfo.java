package sidekickhorse.backend.security;

import lombok.With;

@With
public record AppUserInfo(
        String username,
        AppUserRole role
) {
}