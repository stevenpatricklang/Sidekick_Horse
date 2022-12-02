package sidekickhorse.backend.member;

import lombok.With;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@With
public record Member(

        String id,
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
        String age,
        @Email
        String email,

        @NotBlank @NotNull
        String phoneNumber,

        @NotBlank @NotNull
        String beginMembership,

        RidingExperience ridingExperience,
        Boolean membershipActive,

        @NotBlank @NotNull
        String accountHolder,

        @NotBlank @NotNull
        String iban,

        @NotBlank @NotNull
        String bankName

) {
}

