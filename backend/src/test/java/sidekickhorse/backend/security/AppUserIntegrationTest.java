package sidekickhorse.backend.security;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.util.Base64;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


@SpringBootTest
@AutoConfigureMockMvc
@TestPropertySource(locations = "classpath:application.properties")
class AppUserIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    @WithMockUser
    void getLogin() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/api/app-users/login")
                        .header("Authorization", "Basic:" + Base64.getEncoder().encodeToString("user:Steven".getBytes())))
                .andExpect(status().is(200));
    }


    @Test
    @WithMockUser(username = "Steven")
    void getMe() throws Exception {
        mockMvc.perform(get("/api/app-users/me"))
                .andExpect(status().isOk())
                .andExpect(content().string("Steven"));
    }


    @Test
    @WithMockUser(roles = {"ADMIN"})
    void getRoleAdmin() throws Exception {
        mockMvc.perform(get("/api/app-users/role"))
                .andExpect(status().isOk())
                .andExpect(content().string("[ROLE_ADMIN]"));
    }

    @Test
    @WithMockUser(roles = {"MEMBER"})
    void getRoleMember() throws Exception {
        mockMvc.perform(get("/api/app-users/role"))
                .andExpect(status().isOk())
                .andExpect(content().string("[ROLE_MEMBER]"));
    }

    @Test
    @WithMockUser(roles = {"ADMIN"}, username = "Steven")
    @DirtiesContext
    void addAdmin() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.post("/api/app-users/admin")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {"username": "Steven",
                                 "password": "Password123#",
                                 "role": "ADMIN"}
                                """).with(csrf()))
                .andExpect(status().isCreated());

        mockMvc.perform(get("/api/app-users/login"))
                .andExpect(status().isOk());
        mockMvc.perform(get("/api/app-users/me"))
                .andExpect(status().isOk())
                .andExpect(content().string("Steven"));
    }

    @Test
    @DirtiesContext
    @WithMockUser(roles = {"MEMBER"}, username = "Steven")
    void addMember() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.post("/api/app-users/member")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {"username": "Steven",
                                 "password": "Password123#"}
                                """).with(csrf()))
                .andExpect(status().isCreated());

        mockMvc.perform(get("/api/app-users/login"))
                .andExpect(status().isOk());

        mockMvc.perform(get("/api/app-users/role"))
                .andExpect(status().isOk())
                .andExpect(content().string("[ROLE_MEMBER]"));
    }


    @Test
    @DirtiesContext
    @WithMockUser(roles = {"ADMIN"})
    void addAdminWithAlreadyExistingName() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.post("/api/app-users/admin")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {"username": "Steven",
                                 "password": "Password123#"}
                                """).with(csrf()))
                .andExpect(status().isCreated());
        mockMvc.perform(MockMvcRequestBuilders.post("/api/app-users/admin")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {"username": "Steven",
                                 "password": "Password123#"}
                                """).with(csrf()))
                .andExpect(status().isConflict());
    }

    @Test
    @DirtiesContext
    @WithMockUser(roles = {"MEMBER"})
    void addMemberWithAlreadyExistingName() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.post("/api/app-users/member")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {"username": "Steven",
                                 "password": "Password123#"}
                                """).with(csrf()))
                .andExpect(status().isCreated());
        mockMvc.perform(MockMvcRequestBuilders.post("/api/app-users/member")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {"username": "Steven",
                                 "password": "Password123#"}
                                """).with(csrf()))
                .andExpect(status().isConflict());
    }

    @Test
    @DirtiesContext
    @WithMockUser(username = "Steven", roles = {"MEMBER"})
    void deleteMember() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.post("/api/app-users/member")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {"username": "Steven",
                                 "password": "Password123#"}
                                """).with(csrf()))
                .andExpect(status().isCreated())
                .andReturn().getResponse().getContentAsString();

        mockMvc.perform(MockMvcRequestBuilders.delete("/api/app-users/deleteMe").with(csrf()))
                .andExpect(status().isNoContent());
    }

    @Test
    @DirtiesContext
    @WithMockUser(roles = {"ADMIN"})
    void appUserInfo() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.post("/api/app-users/admin")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {"id": "5",
                                 "username": "user",
                                 "password": "Password123#",
                                 "role": "ADMIN"}
                                """).with(csrf()))
                .andReturn().getResponse().getContentAsString();

        mockMvc.perform(get("/api/app-users/user"))
                .andExpect(status().isOk())
                .andExpect(content().json(
                        """
                                {"username": "user",
                                 "role": "ADMIN"}
                                """));
    }
}