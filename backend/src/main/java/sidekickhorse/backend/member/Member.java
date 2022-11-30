package sidekickhorse.backend.member;

import sidekickhorse.backend.membership.Membership;

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
        @Email
        String email,
        String id


) implements Membership {
    public boolean startMembership() {
        return true;
    }

    public boolean endMembership() {
        return false;
    }
}

