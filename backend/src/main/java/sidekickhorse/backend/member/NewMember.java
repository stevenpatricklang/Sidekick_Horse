package sidekickhorse.backend.member;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

public record NewMember(

        @NotBlank @NotNull
        String firstName,
        @NotBlank @NotNull
        String lastName,
        @NotBlank @NotNull
        String street,
        @NotBlank @NotNull
        String zipcode,
        @NotBlank @NotNull
        String city,
        @NotBlank @NotNull
        String beginMembership,

        Boolean membershipActive,
        @Email
        String email
) {
    public Member withId(String id) {
        return new Member(this.firstName(), this.lastName(), this.street(), this.zipcode(), this.city(), this.beginMembership(), this.membershipActive(), this.email(), id);
    }
}
