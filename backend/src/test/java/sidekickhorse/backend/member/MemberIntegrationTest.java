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
                                 "email": "horsty@gmail.com"}
                                """))
                .andExpect(status().isOk())
                .andReturn().getResponse().getContentAsString();

        Member member = objectMapper.readValue(body, Member.class);

        // WHEN
        mvc.perform(MockMvcRequestBuilders.get("/api/members/"))

        // THEN
        .andExpect(status().isOk())
        .andExpect(content().json("""
                         [{"firstName": "Steven",
                         "lastName": "Lang",
                         "street": "Kirchweg 6",
                         "zipcode": "86856",
                         "city": "Hiltenfingen",
                         "email": "horsty@gmail.com",
                          "id" : "<id>"}]
                """.replace("<id>", member.id())));
    }
    
    @Test
    void getAllMembersAndExpectEmptyList() throws Exception {
        mvc.perform(MockMvcRequestBuilders.get("/api/members"))
                .andExpect(status().isOk())
                .andExpect(content().json("[]"));
    }

}
