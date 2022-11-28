package sidekickhorse.backend.member;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;

public record Member(

        @NotBlank @NotEmpty
        String firstName,
        @NotBlank @NotEmpty
        String lastName,
        @NotBlank @NotEmpty
        String street,
        @NotBlank @NotEmpty
        String zipcode,
        @NotBlank @NotEmpty
        String city,
        @Email
        String email,
        String id
)
{}
