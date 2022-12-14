package sidekickhorse.backend.member;

import org.iban4j.IbanUtil;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/members")

public class MemberController {

    private final MemberService memberService;

    public MemberController(MemberService memberService) {this.memberService = memberService;}


    @PostMapping
    Member addMember(@RequestBody @Valid NewMember member) {
        try {
            IbanUtil.validate(member.iban());
            return memberService.addMemberData(member);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "IBAN is not valid");
        }
    }

    @GetMapping
    List<Member> getMembersList() {
        return memberService.getMembersList();
    }

    @PutMapping("{id}")
    public Member updateMemberById(@PathVariable String id, @RequestBody Member member) {
        if (member.id().equals(id)) {
            return memberService.updateMemberById(member);
        }
        throw new ResponseStatusException(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("{id}")
    public Member deleteMember(@PathVariable @Valid String id) {
        return memberService.deleteMemberById(id).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));
    }

}
