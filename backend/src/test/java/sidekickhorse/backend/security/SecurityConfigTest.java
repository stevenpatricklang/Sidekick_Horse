package sidekickhorse.backend.security;

import org.junit.jupiter.api.Test;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import sidekickhorse.backend.SecurityConfig;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

class SecurityConfigTest {
    private final AppUserService appUserService = mock(AppUserService.class);

    @Test
    void userDetailServiceAsUser() {
        // given
        String rawPassword = "user123";
        String encodedPassword = new BCryptPasswordEncoder().encode(rawPassword);
        AppUser appUser = new AppUser(
                "id1",
                "user",
                rawPassword,
                encodedPassword,
                AppUserRole.MEMBER);


        // when
        SecurityConfig securityConfig = new SecurityConfig(appUserService);
        when(appUserService.findByUsername(appUser.username())).thenReturn(appUser);


        String actual = securityConfig.userDetailsManager()
                .loadUserByUsername(appUser.username())
                .getPassword();

        // then
        assertEquals(encodedPassword, actual);
        assertTrue(securityConfig.encoder().matches(rawPassword, actual));
    }
}
