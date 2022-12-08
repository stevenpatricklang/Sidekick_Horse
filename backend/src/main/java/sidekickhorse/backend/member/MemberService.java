package sidekickhorse.backend.member;


import org.iban4j.IbanUtil;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MemberService {

    private final MemberRepository memberRepository;

    private final MemberUtils memberUtils;

    public MemberService(MemberRepository memberRepository, MemberUtils memberUtils) {
        this.memberRepository = memberRepository;
        this.memberUtils = memberUtils;
    }

    public Member addMemberData(NewMember newMember) {
        Member member = newMember.withId(memberUtils.generateUUID());

        try {
            IbanUtil.validate(newMember.iban());
            return memberRepository.save(member);
        } catch (Exception e) {
            throw new IllegalArgumentException("IBAN is not valid");
        }

    }


    public List<Member> getMembersList() {
        return this.memberRepository.findAll();
    }

    public Member updateMemberById(Member member) {
        memberRepository.findById(member.id());
        Member updatedMember = new Member(member.id(), member.firstName(), member.lastName(), member.street(), member.zipcode(), member.city(), member.age(), member.email(),
                member.phoneNumber(), member.beginMembership(), member.ridingExperience(), member.membershipActive(), member.accountHolder(), member.iban(), member.bankName());
        memberRepository.save(updatedMember);
        return updatedMember;
    }

    public Optional<Member> deleteMemberById(String id) {
        Optional<Member> deleteMember = memberRepository.findById(id);
        memberRepository.deleteById(id);
        return deleteMember;
    }
}
