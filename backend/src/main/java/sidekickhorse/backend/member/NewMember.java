package sidekickhorse.backend.member;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

public record NewMember(

        @NotBlank @NotEmpty @NotNull
        String firstName,
        @NotBlank @NotEmpty @NotNull
        String lastName,
        @NotBlank @NotEmpty @NotNull
        String street,
        @NotBlank @NotEmpty @NotNull
        String zipcode,
        @NotBlank @NotEmpty @NotNull
        String city,
        @Email
        String email
) {
    public Member withId(String id) {
        Member member = new Member (firstName(), lastName(), street(), zipcode(), city(), email(), id);
        return member;
    }
}
