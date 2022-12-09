package sidekickhorse.backend.security;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
