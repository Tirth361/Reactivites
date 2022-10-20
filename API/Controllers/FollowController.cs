using Application.Followers;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class FollowController : BAseApiController
    {
        [HttpPost("{username}")]
        public async Task<IActionResult> Follow(string username)
        {
            return HandleResult(await Mediator.Send(new Followtoggle.Command{TargetUsername = username}));
        }

        [HttpGet("{username}")]
        public async Task<IActionResult> GetFollowings(string username , string predicate)
        {
            return HandleResult(await Mediator.Send(new List.Query{Username = username , Perdicate = predicate}));
        }
    }
}