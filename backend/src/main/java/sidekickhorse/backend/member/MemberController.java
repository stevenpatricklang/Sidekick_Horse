package sidekickhorse.backend.member;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.validation.Valid;
import java.util.List;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/api/members")

public class MemberController {

    private final MemberService memberService;

    public MemberController(MemberService memberService) {this.memberService = memberService;}

    @PostMapping
    Member addMember(@RequestBody @Valid NewMember member) {
        return memberService.addMemberData(member);
    }

    @GetMapping
    List<Member> getMembersList() {
        return memberService.getMembersList();
    }

    @PutMapping("{id}")
    public Member updateMemberById(@PathVariable String id, @RequestBody Member member) {
        try {
            if (member.id().equals(id)) {
                return memberService.updateMemberById(id, member);
            }
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        } catch (NoSuchElementException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
    }
}
