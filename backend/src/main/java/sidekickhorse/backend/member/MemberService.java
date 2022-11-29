package sidekickhorse.backend.member;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
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
        Member member = new Member(newMember.firstName(), newMember.lastName(), newMember.street(), newMember.zipcode(), newMember.city(), newMember.email(), uuid);
        return this.memberRepository.save(member);
    }

    public List<Member> getMembersList() {
        return this.memberRepository.findAll();
    }

    public Member updateMemberById(Member member) {
        memberRepository.findById(member.id());
        Member updatedMember = new Member(member.firstName(), member.lastName(), member.street(), member.zipcode(), member.city(), member.email(), member.id());
        memberRepository.save(updatedMember);
        return updatedMember;
    }

    public Member deleteMemberById(String id) {
        Optional<Member> memberToFind = memberRepository
                .findAll()
                .stream()
                .filter(member -> member.id().equals(id))
                .findFirst();
        if (memberToFind.isEmpty()) {
            throw new NoSuchElementException("Member with this Id could not be found");
        }
        Member member = memberToFind.get();
        memberRepository.deleteById(id);
        return member;
    }
}
