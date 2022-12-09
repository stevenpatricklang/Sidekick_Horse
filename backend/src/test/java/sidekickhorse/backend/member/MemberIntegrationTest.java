package sidekickhorse.backend.member;

import com.fasterxml.jackson.databind.ObjectMapper;
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

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@TestPropertySource(locations = "classpath:application.properties")
class MemberIntegrationTest {

    @Autowired
    private MockMvc mvc;

    @Autowired
    private ObjectMapper objectMapper;

    @DirtiesContext
    @WithMockUser(roles = "ADMIN")
    @Test
    void addMemberData() throws Exception {

        // GIVEN
        String body = mvc.perform(MockMvcRequestBuilders.post("/api/members")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {"firstName": "Steven",
                                 "lastName": "Lang",
                                 "street": "Kirchweg 6",
                                 "zipcode": "86856",
                                 "city": "Hiltenfingen",
                                 "age": "25",
                                 "email": "horsty@gmail.com",
                                 "phoneNumber": "017612345678",
                                 "beginMembership": "09/22",
                                 "ridingExperience": "BEGINNER",
                                 "membershipActive": true,
                                 "accountHolder": "Steven Lang",
                                 "iban": "DE67500105173915843399",
                                 "bankName": "Sparkasse Oberhausen"}
                                """).with(csrf()))
                .andExpect(status().isOk())
                .andReturn().getResponse().getContentAsString();

        Member member = objectMapper.readValue(body, Member.class);

        // WHEN
        mvc.perform(MockMvcRequestBuilders.get("/api/members"))

                // THEN
                .andExpect(status().isOk())
                .andExpect(content().json("""
                                 [{"id" : "<id>",
                                 "firstName": "Steven",
                                 "lastName": "Lang",
                                 "street": "Kirchweg 6",
                                 "zipcode": "86856",
                                 "city": "Hiltenfingen",
                                 "age": "25",
                                 "email": "horsty@gmail.com",
                                 "phoneNumber": "017612345678",
                                 "beginMembership": "09/22",
                                 "ridingExperience": "BEGINNER",
                                 "membershipActive": true,
                                 "accountHolder": "Steven Lang",
                                 "iban": "DE67500105173915843399",
                                 "bankName": "Sparkasse Oberhausen"}]
                        """.replace("<id>", member.id())));
    }

    @Test
    @DirtiesContext
    void addMemberDataWithNotValidIban() throws Exception {
        mvc.perform(MockMvcRequestBuilders.post("/api/members")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {"firstName": "Steven",
                                 "lastName": "Lang",
                                 "street": "Kirchweg 6",
                                 "zipcode": "86856",
                                 "city": "Hiltenfingen",
                                 "age": "25",
                                 "email": "horsty@gmail.com",
                                 "phoneNumber": "017612345678",
                                 "beginMembership": "09/22",
                                 "ridingExperience": "BEGINNER",
                                 "membershipActive": true,
                                 "accountHolder": "Steven Lang",
                                 "iban": "DE675001051739158",
                                 "bankName": "Sparkasse Oberhausen"}
                                """))
                .andExpect(status().is(400))
                .andExpect(status().reason("IBAN is not valid"));

    }


    @Test
    void getAllMembersAndExpectEmptyList() throws Exception {
        mvc.perform(MockMvcRequestBuilders.get("/api/members"))
                .andExpect(status().isOk())
                .andExpect(content().json("[]"));
    }

    @Test
    @DirtiesContext
    @WithMockUser(roles = "ADMIN")
    void putRequestUpdateMemberData() throws Exception {

        // GIVEN
        String body = mvc.perform(MockMvcRequestBuilders.post("/api/members")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {"id" : "<id>",
                                 "firstName": "Steven",
                                 "lastName": "Lang",
                                 "street": "Kirchweg 6",
                                 "zipcode": "86856",
                                 "city": "Hiltenfingen",
                                 "age": "25",
                                 "email": "horsty@gmail.com",
                                 "phoneNumber": "017612345678",
                                 "beginMembership": "09/22",
                                 "ridingExperience": "INTERMEDIATE",
                                 "membershipActive": true,
                                 "accountHolder": "Steven Lang",
                                 "iban": "DE67500105173915843399",
                                 "bankName": "Sparkasse Oberhausen"}
                                """).with(csrf()))
                .andExpect(status().isOk())
                .andReturn().getResponse().getContentAsString();

        Member member = objectMapper.readValue(body, Member.class);

        // WHEN
        mvc.perform(MockMvcRequestBuilders.put("/api/members/" + member.id())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                 {"id" : "<id>",
                                 "firstName": "Philipp",
                                 "lastName": "Lang",
                                 "street": "Kirchweg 6",
                                 "zipcode": "86856",
                                 "city": "Hiltenfingen",
                                 "age": "25",
                                 "email": "horsty@gmail.com",
                                 "phoneNumber": "017612345678",
                                 "beginMembership": "09/22",
                                 "ridingExperience": "INTERMEDIATE",
                                 "membershipActive": true,
                                 "accountHolder": "Steven Lang",
                                 "iban": "DE67500105173915843399",
                                 "bankName": "Sparkasse Oberhausen"}
                                """.replace("<id>", member.id())).with(csrf()))
                // THEN
                .andExpect(status().isOk())
                .andExpect(content().json("""
                                 {"id" : "<id>",
                                 "firstName": "Philipp",
                                 "lastName": "Lang",
                                 "street": "Kirchweg 6",
                                 "zipcode": "86856",
                                 "city": "Hiltenfingen",
                                 "age": "25",
                                 "email": "horsty@gmail.com",
                                 "phoneNumber": "017612345678",
                                 "beginMembership": "09/22",
                                 "ridingExperience": "INTERMEDIATE",
                                 "membershipActive": true,
                                 "accountHolder": "Steven Lang",
                                 "iban": "DE67500105173915843399",
                                 "bankName": "Sparkasse Oberhausen"}
                        """.replace("<id>", member.id())));
    }

    @Test
    @DirtiesContext
    @WithMockUser(roles = "ADMIN")
    void putRequestUpdateMemberDataNotFound() throws Exception {
        mvc.perform(MockMvcRequestBuilders.put("/api/members/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {"id" : "<id>",
                                 "firstName": "Steven",
                                 "lastName": "Lang",
                                 "street": "Kirchweg 6",
                                 "zipcode": "86856",
                                 "city": "Hiltenfingen",
                                 "age": "25",
                                 "email": "horsty@gmail.com",
                                 "phoneNumber": "017612345678",
                                 "beginMembership": "09/22",
                                 "ridingExperience": "ADVANCED",
                                 "membershipActive": true,
                                 "accountHolder": "Steven Lang",
                                 "iban": "DE67500105173915843399",
                                 "bankName": "Sparkasse Oberhausen"}
                                    """).with(csrf()))
                .andExpect(status().isNotFound());
    }

    @Test
    @DirtiesContext
    @WithMockUser(roles = "ADMIN")
    void putRequestUpdateMemberMethodNotAllowed() throws Exception {
        mvc.perform(MockMvcRequestBuilders.put("/api/members/")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {"id" : "<id>",
                                 "firstName": "Steven",
                                 "lastName": "Lang",
                                 "street": "Kirchweg 6",
                                 "zipcode": "86856",
                                 "city": "Hiltenfingen",
                                 "age": "25",
                                 "email": "horsty@gmail.com",
                                 "phoneNumber": "017612345678",
                                 "beginMembership": "09/22",
                                 "ridingExperience": "BEGINNER",
                                 "membershipActive": true,
                                 "accountHolder": "Steven Lang",
                                 "iban": "DE67500105173915843399",
                                 "bankName": "Sparkasse Oberhausen"}
                                    """).with(csrf()))
                .andExpect(status().isMethodNotAllowed());
    }

    @Test
    @DirtiesContext
    @WithMockUser(roles = "ADMIN")
    void putRequestUpdateMemberNotFound() throws Exception {
        mvc.perform(MockMvcRequestBuilders.put("/api/members/1510")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {"id" : "1511",
                                 "firstName": "Steven",
                                 "lastName": "Lang",
                                 "street": "Kirchweg 6",
                                 "zipcode": "86856",
                                 "city": "Hiltenfingen",
                                 "age": "25",
                                 "email": "horsty@gmail.com",
                                 "phoneNumber": "017612345678",
                                 "beginMembership": "09/22",
                                 "ridingExperience": "INTERMEDIATE",
                                 "membershipActive": true,
                                 "accountHolder": "Steven Lang",
                                 "iban": "DE67500105173915843399",
                                 "bankName": "Sparkasse Oberhausen"}
                                    """).with(csrf()))
                .andExpect(status().isNotFound());
    }

    @Test
    @DirtiesContext
    @WithMockUser(roles = "ADMIN")
    void deleteMemberByIdIsSuccessful() throws Exception {

        String body = mvc.perform(MockMvcRequestBuilders.post("/api/members")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {"id" : "1511",
                                 "firstName": "Steven",
                                 "lastName": "Lang",
                                 "street": "Kirchweg 6",
                                 "zipcode": "86856",
                                 "city": "Hiltenfingen",
                                 "age": "25",
                                 "email": "horsty@gmail.com",
                                 "phoneNumber": "017612345678",
                                 "beginMembership": "09/22",
                                 "ridingExperience": "ADVANCED",
                                 "membershipActive": true,
                                 "accountHolder": "Steven Lang",
                                 "iban": "DE67500105173915843399",
                                 "bankName": "Sparkasse Oberhausen"}
                                """).with(csrf()))
                .andExpect(status().isOk())
                .andReturn().getResponse().getContentAsString();

        Member member = objectMapper.readValue(body, Member.class);

        mvc
                .perform(MockMvcRequestBuilders.delete("/api/members/" + member.id()).with(csrf()))
                .andExpect(status().isOk())
                .andExpect(content().json(body));
    }

    @Test
    @DirtiesContext
    @WithMockUser(roles = "ADMIN")
    void deleteMemberByIdNotFound() throws Exception {

        mvc.perform(MockMvcRequestBuilders.delete("/api/members/954ujfew90ru30rfi033").with(csrf()))
                .andExpect(status().isNotFound());
    }

}
