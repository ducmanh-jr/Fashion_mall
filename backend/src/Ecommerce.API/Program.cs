using Ecommerce.API.Configurations;
using Ecommerce.API.Middlewares;
using Ecommerce.DAL.Context;
using Ecommerce.DAL.Seed;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container
builder.Services.AddControllers();
builder.Services.AddApplicationServices(builder.Configuration);
builder.Services.AddSwaggerDocumentation();

var app = builder.Build();

// Configure the HTTP request pipeline
app.UseMiddleware<GlobalExceptionMiddleware>();

if (app.Environment.IsDevelopment() || true)
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "Aethelgard Mall API v1");
        c.RoutePrefix = "swagger";
    });
}

app.UseCors("AllowAll");

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

// Auto-seed database on application startup
using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
    var logger = scope.ServiceProvider.GetRequiredService<ILogger<Program>>();
    try
    {
        logger.LogInformation("Đang kiểm tra và khởi tạo dữ liệu CSDL tự động...");
        await DatabaseSeeder.SeedAsync(context);
        logger.LogInformation("Khởi tạo dữ liệu CSDL hoàn tất thành công!");
    }
    catch (Exception ex)
    {
        logger.LogError(ex, "Lỗi xảy ra trong quá trình nạp dữ liệu: {Message}", ex.Message);
    }
}

app.Run();

// Needed for WebApplicationFactory in Integration Tests
public partial class Program { }
