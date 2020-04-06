using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.DataProtection;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Prayers.Controllers.Dtos;
using Prayers.Models;
using ShadySoft.ControllerErrorHelpers.Extensions.Controller;
using SignInResult = Microsoft.AspNetCore.Identity.SignInResult;

namespace Prayers.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly UserManager<ApplicationUser> _userManager;

        public AuthenticationController(SignInManager<ApplicationUser> signInManager,
                                        UserManager<ApplicationUser> userManager)
        {
            _signInManager = signInManager;
            _userManager = userManager;
        }

        [HttpPost("Login")]
        public async Task<IActionResult> Login(LoginDto credentials)
        {
            var user = await _userManager.FindByNameAsync(credentials.UserName);

            if (user is null)
                return this.SignInFailure(SignInResult.Failed);

            var result = await _signInManager.PasswordSignInAsync(user, credentials.Password, credentials.RememberMe, true);

            if (!result.Succeeded)
                return this.SignInFailure(result);

            var principal = await _signInManager.CreateUserPrincipalAsync(user);

            return Ok(GenerateReturnedUser(principal));
        }

        [HttpPost("Logout")]
        public async Task<IActionResult> Logout()
        {
            await _signInManager.SignOutAsync();

            return Ok();
        }

        [HttpGet("User")]
        public IActionResult GetCurrentUser()
        {
            if (!User.Identity.IsAuthenticated)
                return NotFound();

            return Ok(GenerateReturnedUser(User));
        }

        private IEnumerable<IEnumerable<string>> GenerateReturnedUser(ClaimsPrincipal user)
        {
            return user.Claims.Select(c => new List<string> { c.Type, c.Value });
        }
    }
}