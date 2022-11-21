package sidekickhorse.backend.member;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

public record NewMember(

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
) {


    public Member withId(String id) {
        return new Member(id, firstName, lastName, street, zipcode, city, email);}

}
