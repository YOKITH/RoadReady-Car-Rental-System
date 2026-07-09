using System.Text;
using System.Text.Json.Serialization;
using AutoMapper;
using FluentValidation;
using FluentValidation.AspNetCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using RoadReady.API.Data;
using RoadReady.API.Mappings;
using RoadReady.API.Middleware;
using RoadReady.API.Repositories;
using RoadReady.API.Repositories.Implementations;
using RoadReady.API.Repositories.Interfaces;
using RoadReady.API.Services;
using RoadReady.API.Services.Interfaces;
using RoadReady.API.Validators;

var builder = WebApplication.CreateBuilder(args);

// ==========================================================
// Database
// ==========================================================

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(
        builder.Configuration.GetConnectionString("DefaultConnection")));

// ==========================================================
// AutoMapper
// ==========================================================

builder.Services.AddAutoMapper(typeof(MappingProfile));

// ==========================================================
// Controllers
// ==========================================================

builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.ReferenceHandler =
            ReferenceHandler.IgnoreCycles;
    });

// ==========================================================
// Fluent Validation
// ==========================================================

builder.Services.AddFluentValidationAutoValidation();

builder.Services.AddValidatorsFromAssemblyContaining<RegisterDtoValidator>();

// ==========================================================
// Repository Registration
// ==========================================================

// User

builder.Services.AddScoped<IUserRepository, UserRepository>();

// Car

builder.Services.AddScoped<ICarRepository, CarRepository>();

// Reservation

builder.Services.AddScoped<IReservationRepository, ReservationRepository>();

// Payment

builder.Services.AddScoped<IPaymentRepository, PaymentRepository>();

// Review

builder.Services.AddScoped<IReviewRepository, ReviewRepository>();

// Dashboard

builder.Services.AddScoped<IDashboardRepository, DashboardRepository>();

// Reports

builder.Services.AddScoped<IReportRepository, ReportRepository>();

// Rental Agent Module

builder.Services.AddScoped<ICheckInRepository, CheckInRepository>();

builder.Services.AddScoped<ICheckOutRepository, CheckOutRepository>();

builder.Services.AddScoped<IMaintenanceRepository, MaintenanceRepository>();

builder.Services.AddScoped<IRentalAgentRepository, RentalAgentRepository>();

// ==========================================================
// Service Registration
// ==========================================================

// Authentication

builder.Services.AddScoped<IUserService, UserService>();

builder.Services.AddScoped<ITokenService, TokenService>();

// Car

builder.Services.AddScoped<ICarService, CarService>();

// Reservation

builder.Services.AddScoped<IReservationService, ReservationService>();

// Payment

builder.Services.AddScoped<IPaymentService, PaymentService>();

// Review

builder.Services.AddScoped<IReviewService, ReviewService>();

// Dashboard

builder.Services.AddScoped<IDashboardService, DashboardService>();

// Reports

builder.Services.AddScoped<IReportService, ReportService>();

// Rental Agent Module

builder.Services.AddScoped<ICheckInService, CheckInService>();

builder.Services.AddScoped<ICheckOutService, CheckOutService>();

builder.Services.AddScoped<IMaintenanceService, MaintenanceService>();

builder.Services.AddScoped<IRentalAgentService, RentalAgentService>();
// ==========================================================
// CORS
// ==========================================================

builder.Services.AddCors(options =>
{
    options.AddPolicy("ReactPolicy", policy =>
    {
        policy.WithOrigins("http://localhost:5173")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

// ==========================================================
// JWT Authentication
// ==========================================================

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme =
        JwtBearerDefaults.AuthenticationScheme;

    options.DefaultChallengeScheme =
        JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.RequireHttpsMetadata = false;

    options.SaveToken = true;

    options.TokenValidationParameters =
        new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,

            ValidIssuer =
                builder.Configuration["Jwt:Issuer"],

            ValidAudience =
                builder.Configuration["Jwt:Audience"],

            IssuerSigningKey =
                new SymmetricSecurityKey(
                    Encoding.UTF8.GetBytes(
                        builder.Configuration["Jwt:Key"]!))
        };
});

// ==========================================================
// Authorization
// ==========================================================

builder.Services.AddAuthorization();

// ==========================================================
// Swagger
// ==========================================================

builder.Services.AddEndpointsApiExplorer();

builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc(
        "v1",
        new OpenApiInfo
        {
            Title = "RoadReady API",
            Version = "v1",
            Description = "RoadReady Car Rental Management System API"
        });

    options.AddSecurityDefinition(
        "Bearer",
        new OpenApiSecurityScheme
        {
            Name = "Authorization",
            Type = SecuritySchemeType.Http,
            Scheme = "bearer",
            BearerFormat = "JWT",
            In = ParameterLocation.Header,
            Description = "Enter JWT Token"
        });

    options.AddSecurityRequirement(
        new OpenApiSecurityRequirement
        {
            {
                new OpenApiSecurityScheme
                {
                    Reference = new OpenApiReference
                    {
                        Type = ReferenceType.SecurityScheme,
                        Id = "Bearer"
                    }
                },
                Array.Empty<string>()
            }
        });
});

// ==========================================================
// Build Application
// ==========================================================

var app = builder.Build();

// ==========================================================
// Development
// ==========================================================

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(options =>
    {
        options.DocumentTitle = "RoadReady API";
        options.SwaggerEndpoint("/swagger/v1/swagger.json", "RoadReady API v1");
    });
}

// ==========================================================
// Middleware Pipeline
// ==========================================================

app.UseHttpsRedirection();

// Serve static files (car images, future uploads)
app.UseStaticFiles();

// Global exception handling
app.UseMiddleware<ExceptionMiddleware>();

// Enable CORS
app.UseCors("ReactPolicy");

// Authentication & Authorization
app.UseAuthentication();
app.UseAuthorization();

// Map Controllers
app.MapControllers();

// ==========================================================
// Run Application
// ==========================================================

app.Run();