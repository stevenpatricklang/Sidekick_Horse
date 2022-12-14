package sidekickhorse.backend.security;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface AppUserRepository extends MongoRepository<AppUser, String> {
    AppUser findByUsername(String username);

    boolean existsByUsername(String username);

    void deleteByUsername(String username);
}
