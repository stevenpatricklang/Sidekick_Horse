package sidekickhorse.backend.member;

import org.springframework.data.annotation.Id;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

public record Member(
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

        MemberStatus status
) {

        Member(
                String firstName,
                String lastName,
                String email,
                String street,
                String zipcode,
                String city,
                MemberStatus status
        ) {
                this(null, firstName, lastName, email, street, zipcode, city, status);
}


        public Member withId(String id) {
                        return new Member(id, firstName, lastName, email, street, zipcode, city, status);}

}
