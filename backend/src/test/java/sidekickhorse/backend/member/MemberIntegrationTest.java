package sidekickhorse.backend.member;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class MemberIntegrationTest {

    @Autowired
    private MockMvc mvc;

    @Autowired
    private ObjectMapper objectMapper;

    @DirtiesContext
    @Test
    void addMember() throws Exception {

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
                                """))
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

    @DirtiesContext
    @Test
    void addMemberDataWithNotValidIban() throws Exception {
        mvc.perform(MockMvcRequestBuilders.post("/api/members"))
                .andExpect(status().isBadRequest());
    }


    @Test
    void getAllMembersAndExpectEmptyList() throws Exception {
        mvc.perform(MockMvcRequestBuilders.get("/api/members"))
                .andExpect(status().isOk())
                .andExpect(content().json("[]"));
    }

    @Test
    @DirtiesContext
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
                                """))
                .andExpect(status().isOk())
                .andReturn().getResponse().getContentAsString();

        Member member = objectMapper.readValue(body, Member.class);

        // WHEN
        mvc.perform(MockMvcRequestBuilders.put("/api/members/" + member.id())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(("""
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
                                """.replace("<id>", member.id()))))
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
                                    """))
                .andExpect(status().isNotFound());
    }

    @Test
    @DirtiesContext
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
                                    """))
                .andExpect(status().isMethodNotAllowed());
    }

    @Test
    @DirtiesContext
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
                                    """))
                .andExpect(status().isNotFound());
    }

    @Test
    @DirtiesContext
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
                                """))
                .andExpect(status().isOk())
                .andReturn().getResponse().getContentAsString();

        Member member = objectMapper.readValue(body, Member.class);

        mvc
                .perform(MockMvcRequestBuilders.delete("/api/members/" + member.id()))
                .andExpect(status().isOk())
                .andExpect(content().json(body));
    }

    @Test
    @DirtiesContext
    void deleteMemberByIdNotFound() throws Exception {

        mvc.perform(MockMvcRequestBuilders.delete("/api/members/954ujfew90ru30rfi033"))
                .andExpect(status().isNotFound());
    }

}
