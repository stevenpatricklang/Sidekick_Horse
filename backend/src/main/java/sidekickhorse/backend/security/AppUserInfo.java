package sidekickhorse.backend.security;

import lombok.With;

import javax.validation.constraints.NotBlank;

@With
public record AppUserInfo(
        @NotBlank(message = "Name can`t be empty.")
        String username,
        AppUserRole role
) {
}