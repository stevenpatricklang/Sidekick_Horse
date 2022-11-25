package sidekickhorse.backend.member;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
public class MemberService {

    private final MemberRepository memberRepository;

    private MemberUtils memberUtils;

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

    public Member updateMemberById(String id, Member member) {
        List<Member> members = memberRepository.findAll();
        for (Member person : members) {
            if (person.id().equals(id)) {
                memberRepository.save(person);
                return member;
            }
        }
        throw new NoSuchElementException("There is no Member active with this ID");
    }
}


