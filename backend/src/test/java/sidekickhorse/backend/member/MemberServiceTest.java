package sidekickhorse.backend.member;

import org.junit.jupiter.api.Test;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;


class MemberServiceTest {


    MemberRepository memberRepository = mock(MemberRepository.class);
    MemberUtils memberUtils = mock(MemberUtils.class);
    MemberService memberService = new MemberService(memberRepository, memberUtils);


    @Test
    void addMemberWithID() {

        //GIVEN

        NewMember newMember = new NewMember("Steven", "Lang", "Kirchweg", "86856", "Walkertshofen", "29", "abcdefghi@gmx.de", "0176 12345678", "12/22", RidingExperience.BEGINNER, true, "Steven Lang", "DE67500105173915843399", "Soparkasse Neuhausen");
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

        List<Member> members = List.of(
                new Member("2", "Steven", "Lang", "Kirchweg 6", "86856", "Hiltenfingen",
                        "25", "horsty@gmail.com", "0049", "11/22", RidingExperience.BEGINNER, true, "Steven Lang", "DE215555666", "Deutsche Bank"));

        //WHEN

        when(memberRepository.findAll()).thenReturn(members);
        List<Member> actual = memberService.getMembersList();

        //THEN

        assertEquals(members, actual);
    }

    @Test
    void updateMemberByValidId() {
        //GIVEN

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
        // GIVEN

        Member member = new Member("2", "Steven", "Lang", "Kirchweg 6", "86856", "Hiltenfingen",
                "25", "horsty@gmail.com", "0049", "11/22", RidingExperience.BEGINNER, true, "Steven Lang", "DE215555666", "Deutsche Bank");

        // WHEN

        memberService.deleteMemberById((member.id()));

        // THEN
        verify(memberRepository).deleteById((member.id()));
    }
}
