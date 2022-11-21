package sidekickhorse.backend.member;

import org.springframework.data.annotation.Id;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

public record Member(
        @Id
        String id,
        @NotBlank
        String firstName,
        @NotBlank
        String lastName,
        @Email
        String email,
        @NotBlank
        String street,
        @NotBlank
        String zipcode,
        @NotBlank
        String city,

) {

        Member(
                String firstName,
                String lastName,
                String email,
                String street,
                String zipcode,
                String city,

) {
                this(null, firstName, lastName, email, street, zipcode, city,);}



}
