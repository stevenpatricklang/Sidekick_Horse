package sidekickhorse.backend.security;


import org.junit.jupiter.api.Test;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.fail;
import static org.mockito.Mockito.*;

class AppUserServiceTest {
    private final AppUserRepository mockAppUserRepository = mock(AppUserRepository.class);
    private final AppUserService appUserService = new AppUserService(mockAppUserRepository);
    private final BCryptPasswordEncoder mockPasswordEncoder = mock(BCryptPasswordEncoder.class);

    @Test
    void findByUsernameAndReturnUsername() {
        // given
        AppUser newAppUser = new AppUser("5", "Steven", "password123", "", null);
        when(mockAppUserRepository.findByUsername(newAppUser.username())).thenReturn(newAppUser);

        // when
        AppUser actual = appUserService.findByUsername("Steven");

        // then
        verify(mockAppUserRepository).findByUsername(newAppUser.username());
        assertEquals(newAppUser, actual);
    }

    @Test
    void getAppUserInfoAndReturnAppUserInfo() {
        // given
        AppUser newAppUser = new AppUser("5", "Steven", "password123", "", null);
        AppUserInfo appUserInfo = new AppUserInfo(newAppUser.username(), newAppUser.role());
        when(mockAppUserRepository.findByUsername(newAppUser.username())).thenReturn(newAppUser);

        // when
        AppUserInfo actual = appUserService.getUserInfo("Steven");

        // then
        verify(mockAppUserRepository).findByUsername(newAppUser.username());
        assertEquals(appUserInfo, actual);
    }

    @Test
    void addUserReturnsUserAlreadyExistsException() {
        //given
        String username = "Philipp";
        AppUser newAppUser = new AppUser("5", username, "password123", "", null);
        when(mockAppUserRepository.existsByUsername(username)).thenReturn(true);
        when(mockPasswordEncoder.encode("password123")).thenReturn("encodedPassword");
        //when
        try {
            appUserService.save(newAppUser, mockPasswordEncoder);
            fail();
        } catch (UserAlreadyExistsException e) {
            //then
            verify(mockAppUserRepository).existsByUsername(username);
            verify(mockAppUserRepository, never()).save(newAppUser);
            assertEquals("User with this name already exists", e.getMessage());
        }
    }

    @Test
    void saveAppUserSuccessful() {
        //given
        AppUser newAppUser = new AppUser("id-5", "Steven", "password123", "", AppUserRole.ADMIN);

        newAppUser = newAppUser.withPasswordBcrypt("encodedPassword");
        AppUser encodedAppUser = newAppUser
                .withId(newAppUser.id())
                .withUsername(newAppUser.username())
                .withPassword("")
                .withPasswordBcrypt(newAppUser.passwordBcrypt())
                .withRole(newAppUser.role());

        when(mockAppUserRepository.existsByUsername(newAppUser.username())).thenReturn(false);
        when(mockPasswordEncoder.encode(newAppUser.password())).thenReturn(newAppUser.passwordBcrypt());
        when(mockAppUserRepository.save(encodedAppUser)).thenReturn(encodedAppUser);

        //when
        AppUser actual = appUserService.save(newAppUser, mockPasswordEncoder);

        //then
        verify(mockPasswordEncoder).encode("password123");
        verify(mockAppUserRepository).existsByUsername(newAppUser.username());
        verify(mockAppUserRepository).save(encodedAppUser);
        assertEquals(encodedAppUser, actual);

    }

    @Test
    void deleteAppUserSuccessful() {
        //given
        AppUser newAppUser = new AppUser("id-5", "Steven", "password123", "", AppUserRole.ADMIN);
        String username = newAppUser.username();

        //when
        doNothing().when(mockAppUserRepository).deleteByUsername(username);
        appUserService.deleteAppUser(username);

        //then
        verify(mockAppUserRepository).deleteByUsername(username);
    }

}
