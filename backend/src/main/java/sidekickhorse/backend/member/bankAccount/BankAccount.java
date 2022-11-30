package sidekickhorse.backend.member.bankAccount;

public record BankAccount(
        String accountHolder,
        String iban,
        String bankName
        ) {
}
