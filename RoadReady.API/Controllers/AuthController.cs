using Microsoft.AspNetCore.Mvc;
using RoadReady.API.DTOs;
using RoadReady.API.Services.Interfaces;

namespace RoadReady.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly ITokenService _tokenService;

        public AuthController(IUserService userService,ITokenService tokenService)
        {
            _userService = userService;
            _tokenService = tokenService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var result = await _userService.RegisterUserAsync(dto);
            if (!result)
                return BadRequest("Registration failed");

            return Ok("User registered successfully");
        }




        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var tokenResponse = await _tokenService.LoginAsync(dto);

            if (tokenResponse == null)
            {
                return Unauthorized("Invalid email or password");
            }

            return Ok(tokenResponse);
        }

        [HttpPost("refresh-token")]
        public async Task<IActionResult> RefreshToken(
            RefreshTokenDto dto)
        {
            var response = await _tokenService.RefreshTokenAsync(dto);

            if (response == null)
            {
                return Unauthorized("Invalid refresh token");
            }

            return Ok(response);
        }


        [HttpPost("logout")]
        public async Task<IActionResult> Logout(
            RefreshTokenDto dto)
        {
            await _tokenService.RevokeRefreshTokenAsync(
                dto.RefreshToken);

            return Ok(new
            {
                Message = "Logged out successfully"
            });
        }
    }
}