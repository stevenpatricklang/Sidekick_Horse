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

        NewMember newMember = new NewMember("Steven", "Lang", "Kirchweg 6", "86856", "Hiltenfingen", "25", "horsty@gmail.com", "017612345678", "09/22", RidingExperience.BEGINNER, true, "Steven Lang", "DE12345678901234567890", "Sparkasse Oberhausem");
        Member testMember = newMember.withId("1234");

        when(memberUtils.generateUUID()).thenReturn("1234");
        when(memberRepository.save(testMember)).thenReturn(testMember);

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
                new Member("2", "Steven", "Lang", "Kirchweg 6", "86856", "Hiltenfingen",
                        "25", "horsty@gmail.com", "0049", "11/22", RidingExperience.BEGINNER, true, "Steven Lang", "DE215555666", "Deutsche Bank"));

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

        Member member = new Member("2", "Steven", "Lang", "Kirchweg 6", "86856", "Hiltenfingen",
                "25", "horsty@gmail.com", "0049", "11/22", RidingExperience.BEGINNER, true, "Steven Lang", "DE215555666", "Deutsche Bank");
        Member updatedMember = new Member("2", "Philipp", "Lang", "Kirchweg 6", "86856", "Hiltenfingen",
                "25", "horsty@gmail.com", "0049", "11/22", RidingExperience.BEGINNER, true, "Steven Lang", "DE215555666", "Deutsche Bank");

        //WHEN

        when(memberRepository.findById(member.id())).thenReturn(Optional.of(member));
        when(memberRepository.save(updatedMember)).thenReturn(updatedMember);
        Member actual = memberService.updateMemberById(updatedMember);

        //THEN

        assertEquals(updatedMember, actual);
    }

    @Test
    void deleteMemberByExistingId() {
        // given
        MemberUtils memberId = mock(MemberUtils.class);
        MemberRepository memberRepository = mock(MemberRepository.class);
        MemberService memberService = new MemberService(memberRepository, memberId);

        Member member = new Member("2", "Steven", "Lang", "Kirchweg 6", "86856", "Hiltenfingen",
                "25", "horsty@gmail.com", "0049", "11/22", RidingExperience.BEGINNER, true, "Steven Lang", "DE215555666", "Deutsche Bank");

        // when

        memberService.deleteMemberById((member.id()));

        // then
        verify(memberRepository).deleteById((member.id()));
    }
}
