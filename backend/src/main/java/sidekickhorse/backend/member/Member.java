package sidekickhorse.backend.member;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

public record Member(

        @NotBlank
        String firstName,
        @NotBlank
        String lastName,
        @NotBlank
        String street,
        @NotBlank
        String zipcode,
        @NotBlank
        String city,
        @NotBlank
        String beginMembership,
        Boolean membershipActive,
        @Email
        String email,
        String id


) {
}

