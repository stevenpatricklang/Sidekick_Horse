package sidekickhorse.backend.member;

import org.iban4j.*;
import org.junit.Rule;
import org.junit.Test;
import org.junit.experimental.runners.Enclosed;
import org.junit.rules.ExpectedException;
import org.junit.runner.RunWith;

import static org.hamcrest.CoreMatchers.*;
import static org.junit.Assert.assertThat;


@RunWith(Enclosed.class)
public class IbanUtilTest {

    public static class DefaultIbanUtilTest {

        @Test
        public void ibanCountrySupportCheckWithNullShouldReturnFalse() {
            assertThat(IbanUtil.isSupportedCountry(null), is(equalTo(false)));
        }

        @Test
        public void ibanCountrySupportCheckWithSupportedCountryShouldReturnTrue() {
            assertThat(IbanUtil.isSupportedCountry(CountryCode.BE), is(equalTo(true)));
        }

        @Test
        public void ibanCountrySupportCheckWithUnsupportedCountryShouldReturnFalse() {
            assertThat(IbanUtil.isSupportedCountry(CountryCode.AM), is(equalTo(false)));
        }

        @Test
        public void unformattedIbanValidationWithNoneFormattingShouldNotThrowException() {
            IbanUtil.validate("AT611904300234573201", IbanFormat.None);
        }

        @Test
        public void formattedIbanValidationWithDefaultFormattingShouldNotThrowException() {
            IbanUtil.validate("AT61 1904 3002 3457 3201", IbanFormat.Default);
        }
    }

    public static class InvalidIbanValidationTest {

        @Rule
        public ExpectedException expectedException = ExpectedException.none();


        @Test
        public void ibanValidationWithInvalidCheckDigitShouldThrowException() {
            expectedException.expect(InvalidCheckDigitException.class);
            expectedException.expectMessage("invalid check digit: 62");
            expectedException.expectMessage("expected check digit is: 61");
            expectedException.expectMessage("AT621904300234573201");
            IbanUtil.validate("AT621904300234573201");
        }

        @Test
        public void ibanValidationWithSpaceShouldThrowException() {
            expectedException.expect(IbanFormatException.class);
            expectedException.expectMessage("length is 17");
            expectedException.expectMessage("expected BBAN length is: 16");
            IbanUtil.validate("AT61 1904300234573201");
        }

        @Test
        public void ibanValidationWithInvalidLengthShouldThrowException() {
            expectedException.expect(IbanFormatException.class);
            IbanUtil.validate("AT621904300");
        }

        @Test
        public void ibanValidationWithInvalidBbanLengthShouldThrowException() {
            expectedException.expect(IbanFormatException.class);
            expectedException.expectMessage(containsString("expected BBAN length is:"));
            IbanUtil.validate("AT61190430023457320");
        }

        @Test
        public void ibanValidationWithInvalidBankCodeShouldThrowException() {
            expectedException.expect(IbanFormatException.class);
            expectedException.expectMessage(containsString("must contain only digits"));
            IbanUtil.validate("AT611C04300234573201");
        }

        @Test
        public void ibanValidationWithInvalidAccountNumberShouldThrowException() {
            expectedException.expect(IbanFormatException.class);
            expectedException.expectMessage(containsString("must contain only digits"));
            IbanUtil.validate("DE8937040044053201300A");
        }

        @Test
        public void ibanValidationWithInvalidNationalCheckDigitShouldThrowException() {
            expectedException.expect(IbanFormatException.class);
            expectedException.expectMessage(containsString("must contain only upper case letters"));
            IbanUtil.validate("IT6010542811101000000123456");
        }

        @Test
        public void unformattedIbanValidationWithDefaultFormattingShouldThrowException() {
            expectedException.expect(IbanFormatException.class);
            expectedException.expectMessage(containsString("Iban must be formatted using 4 characters and space"));
            IbanUtil.validate("AT611904300234573201", IbanFormat.Default);
        }

        @Test
        public void formattedIbanValidationWithNoneFormattingShouldThrowException() {
            expectedException.expect(IbanFormatException.class);
            expectedException.expectMessage(containsString("expected BBAN length is: 16"));
            IbanUtil.validate("AT61 1904 3002 3457 3201", IbanFormat.None);
        }
    }
}
