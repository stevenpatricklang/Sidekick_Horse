package sidekickhorse.backend.member;

import org.junit.jupiter.api.Test;

import java.util.List;
import java.util.Optional;

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

        when(memberRepository.save(testMember)).thenReturn(testMember);
        when(memberUtils.generateUUID()).thenReturn("2");

        //WHEN

        Member actual = memberService.addMemberData(newMember);

        //THEN

        verify(memberUtils).generateUUID();
        assertEquals(testMember, actual);
    }

    @Test
    void getMembersList() {

        //GIVEN

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

        Member member = new Member("Steven", "Lang", "Kirchweg 6", "86856",
                "Hiltenfingen", "horsty@gmail.com", "1");
        Member updatedMember = new Member("Horst", "Lang", "Kirchweg 6", "86856",
                "Hiltenfingen", "horsty@gmail.com", "1");

        //WHEN

        when(memberRepository.findById(member.id())).thenReturn(Optional.of(member));
        when(memberRepository.save(updatedMember)).thenReturn(updatedMember);
        Member actual = memberService.updateMemberById(updatedMember);

        //THEN

        assertEquals(updatedMember, actual);
    }

    @Test
    void deleteMemberById() {
        // given
        MemberUtils memberId = mock(MemberUtils.class);
        MemberRepository memberRepository = mock(MemberRepository.class);
        MemberService memberService = new MemberService(memberRepository, memberId);

        Member member = new Member("Florian", "Wurst", "Hosenstraße 4", "89784", "Mittelneufnach", "12345@gmail.com", "12345");

        // when

        memberService.deleteMemberById((member.id()));

        // then
        verify(memberRepository).deleteById((member.id()));
    }
}
