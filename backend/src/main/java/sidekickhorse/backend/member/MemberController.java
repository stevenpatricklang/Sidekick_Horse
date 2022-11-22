package sidekickhorse.backend.member;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

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
}
