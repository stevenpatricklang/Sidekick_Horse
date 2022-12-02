package sidekickhorse.backend.member;

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
        String uuid = this.memberUtils.generateUUID();
        Member member = new Member(uuid, newMember.firstName(), newMember.lastName(), newMember.street(), newMember.zipcode(), newMember.city(), newMember.age(),
                newMember.email(), newMember.phoneNumber(), newMember.beginMembership(), newMember.ridingExperience(), newMember.membershipActive(), newMember.accountHolder(),
                newMember.iban(), newMember.bankName());
        return this.memberRepository.save(member);
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
