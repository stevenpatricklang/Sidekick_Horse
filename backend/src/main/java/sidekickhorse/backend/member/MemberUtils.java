package sidekickhorse.backend.member;

import java.util.UUID;

public class MemberUtils {
    public String generateUUID() {
        return UUID.randomUUID().toString();
    }

}
