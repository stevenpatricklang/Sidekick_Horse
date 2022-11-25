package sidekickhorse.backend.member;

import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;


class MemberServiceTest {

    @Test
    void addMemberWithID() {

        //GIVEN

        MemberRepository memberRepository = mock(MemberRepository.class);
        MemberUtils memberUtils = mock(MemberUtils.class);
        MemberService memberService = new MemberService(memberRepository, memberUtils);

        NewMember newMember = new NewMember("Steven", "Lang", "Kirchweg 6", "86856", "Hiltenfingen", "horsty@gmail.com");
        Member testMember = newMember.withId("2");

        Member expected = testMember;
        when(memberRepository.save(testMember)).thenReturn(testMember);
        when(memberUtils.generateUUID()).thenReturn("2");

        //WHEN

        Member actual = memberService.addMemberData(newMember);

        //THEN

        verify(memberUtils).generateUUID();
        assertEquals(expected, actual);
    }

    @Test
    void getMembersList() {

        //GIVEN

        MemberService memberService;
        MemberRepository memberRepository = mock(MemberRepository.class);
        List<Member> members = List.of(
                new Member("Steven", "Lang", "Kirchweg 6", "86856",
                        "Hiltenfingen", "horsty@gmail.com", "1"));

        //WHEN

        when(memberRepository.findAll()).thenReturn(members);
        List<Member> actual = memberRepository.findAll();

        //THEN

        assertEquals(members, actual);
    }

    @Test
    void updateMemberByValidId() {
        //GIVEN
        MemberUtils memberId = mock(MemberUtils.class);
        MemberRepository memberRepository = mock(MemberRepository.class);
        MemberService memberService = new MemberService(memberRepository, memberId);

        List<Member> members = new ArrayList<>();
        Member member = new Member("Steven", "Lang", "Kirchweg 6", "86856",
                "Hiltenfingen", "horsty@gmail.com", "1");
        Member updatedMember = new Member("Horst", "Lang", "Kirchweg 6", "86856",
                "Hiltenfingen", "horsty@gmail.com", "1");
        members.add(member);

        //WHEN

        when(memberRepository.findAll()).thenReturn(members);
        Member actual = memberService.updateMemberById("1", updatedMember);

        //THEN

        assertEquals(updatedMember, actual);
    }

}
