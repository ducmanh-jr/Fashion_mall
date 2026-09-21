using System.Text;
using AutoMapper;
using Ecommerce.BLL.Interfaces;
using Ecommerce.BLL.Mappings;
using Ecommerce.BLL.Services;
using Ecommerce.BLL.Validators;
using Ecommerce.Common.DTOs;
using Ecommerce.DAL.Context;
using Ecommerce.DAL.Interfaces;
using Ecommerce.DAL.Repositories;
using FluentValidation;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace Ecommerce.API.Configurations;

public static class DependencyInjection
{
    public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration configuration)
    {
        // 1. Database Context
        var provider = configuration["DatabaseProvider"] ?? "SqlServer";
        services.AddDbContext<ApplicationDbContext>(options =>
        {
            if (provider.Equals("SqlServer", StringComparison.OrdinalIgnoreCase))
            {
                var sqlServerConn = configuration.GetConnectionString("SqlServerConnection")
                    ?? "Server=localhost\\SQLEXPRESS;Database=fashion_mall;Integrated Security=True;TrustServerCertificate=True;MultipleActiveResultSets=True;";
                options.UseSqlServer(sqlServerConn, b => b.MigrationsAssembly(typeof(ApplicationDbContext).Assembly.FullName));
            }
            else
            {
                var sqliteConn = configuration.GetConnectionString("DefaultConnection") 
                                 ?? "Data Source=fashion_mall.db";
                options.UseSqlite(sqliteConn);
            }
        });

        // 2. Unit Of Work & Repositories
        services.AddScoped<IUnitOfWork, UnitOfWork>();
        services.AddScoped(typeof(IGenericRepository<>), typeof(GenericRepository<>));

        // 3. Business Services
        services.AddScoped<IAuthService, AuthService>();
        services.AddScoped<IProductService, ProductService>();
        services.AddScoped<IOrderService, OrderService>();
        services.AddScoped<IInventoryService, InventoryService>();
        services.AddScoped<IStatisticsService, StatisticsService>();
        services.AddScoped<IStoreService, StoreService>();
        services.AddScoped<IAIService, AIService>();

        // 4. AutoMapper Setup
        var config = new MapperConfiguration(cfg =>
        {
            cfg.AddProfile<MappingProfile>();
        });
        services.AddSingleton<IMapper>(config.CreateMapper());

        // 5. FluentValidation
        services.AddScoped<IValidator<LoginRequestDto>, LoginRequestValidator>();
        services.AddScoped<IValidator<RegisterRequestDto>, RegisterRequestValidator>();
        services.AddScoped<IValidator<CreateProductDto>, CreateProductValidator>();

        // 6. JWT Authentication
        var jwtKey = configuration["Jwt:Key"] ?? "AethelgardSuperSecretKey2026NguyenDucManh9999!";
        var jwtIssuer = configuration["Jwt:Issuer"] ?? "AethelgardMall";
        var jwtAudience = configuration["Jwt:Audience"] ?? "AethelgardMallClients";

        services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            .AddJwtBearer(options =>
            {
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    ValidIssuer = jwtIssuer,
                    ValidAudience = jwtAudience,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey))
                };
            });

        services.AddAuthorization();

        // 7. CORS policy for Next.js Frontend
        services.AddCors(options =>
        {
            options.AddPolicy("AllowAll", policy =>
            {
                policy.AllowAnyOrigin()
                      .AllowAnyHeader()
                      .AllowAnyMethod();
            });
        });

        return services;
    }
}
