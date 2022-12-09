package sidekickhorse.backend.security;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import sidekickhorse.backend.SecurityConfig;

import javax.servlet.http.HttpSession;
import javax.validation.Valid;

@RestController
@RequestMapping("/api/app-users")
@RequiredArgsConstructor
public class AppUserController {

    private final AppUserService appUserService;

    @GetMapping("/login")
    public HttpStatus login() {
        return HttpStatus.OK;

    }

    @GetMapping("/me")
    public String me() {
        return SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();
    }

    @GetMapping("/user")
    public AppUserInfo getAppUser() {
        String name = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();
        return appUserService.getUserInfo(name);
    }

    @GetMapping("/role")
    public String getRole() {
        return SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getAuthorities()
                .toString();
    }

    @PostMapping("/member")
    @ResponseStatus(code = HttpStatus.CREATED)
    public AppUser registerMember(@Valid @RequestBody AppUser newAppUser) {
        AppUser appUser = newAppUser.withRole(AppUserRole.MEMBER);
        return saveAppUser(appUser);

    }

    @PostMapping("/admin")
    @ResponseStatus(code = HttpStatus.CREATED)
    public AppUser registerLibrarian(@Valid @RequestBody AppUser newAppUser) {
        AppUser appUser = newAppUser.withRole(AppUserRole.ADMIN);
        return saveAppUser(appUser);

    }

    private AppUser saveAppUser(AppUser appUser) {
        try {
            return appUserService.save(appUser, SecurityConfig.passwordEncoder);
        } catch (UserAlreadyExistsException e) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, e.getMessage());
        }
    }

    @GetMapping("/logout")
    public void logout(HttpSession httpSession) {
        httpSession.invalidate();
    }

    @DeleteMapping("/deleteMe")
    @ResponseStatus(code = HttpStatus.NO_CONTENT)
    public void deleteUser() {
        String name = SecurityContextHolder.getContext().getAuthentication().getName();
        appUserService.deleteAppUser(name);
    }
}
