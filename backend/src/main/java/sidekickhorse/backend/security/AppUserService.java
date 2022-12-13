package sidekickhorse.backend.security;

import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class AppUserService {

    private final AppUserRepository appUserRepository;

    public AppUser findByUsername(String username) {
        return appUserRepository.findByUsername(username);
    }

    public AppUserInfo getUserInfo(String username) {
        AppUser appUser = appUserRepository.findByUsername(username);
        return new AppUserInfo(appUser.username(), appUser.role());
    }

    public AppUser save(AppUser newAppUser, PasswordEncoder passwordEncoder) {
        if (appUserRepository.existsByUsername(newAppUser.username())) {
            throw new UserAlreadyExistsException("User with this name already exists");
        }

        AppUser appUser = newAppUser
                .withUsername(newAppUser.username())
                .withPassword("")
                .withPasswordBcrypt(passwordEncoder.encode(newAppUser.password()))
                .withRole(newAppUser.role());
        return appUserRepository.save(appUser);
    }

    public void deleteAppUser(String username) {
        appUserRepository.deleteByUsername(username);
    }
}