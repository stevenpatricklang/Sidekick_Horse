package sidekickhorse.backend.member;

import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class MemberUtils {
    public String generateUUID() {
        return UUID.randomUUID().toString();
    }

}
