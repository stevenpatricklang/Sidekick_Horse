package sidekickhorse.backend.member;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

public record NewMember(

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


    public Member withId(String id) {
        return new Member(id, firstName, lastName, email, street, zipcode, city,);}

}
