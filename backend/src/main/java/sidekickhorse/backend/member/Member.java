package sidekickhorse.backend.member;

import org.springframework.data.annotation.Id;

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
        @Email
        String email,
        @Id
        String id
)
{}
