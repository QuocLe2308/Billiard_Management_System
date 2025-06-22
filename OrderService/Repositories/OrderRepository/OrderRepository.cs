using OrderService.Models;
using OrderService.Data;
using Microsoft.EntityFrameworkCore;
using static OrderService.DTOs.OrderDTOs.OrderDTOs;
using Microsoft.AspNetCore.Http;
namespace OrderService.Repositories.OrderRepository
{
    public class OrderRepository : IOrderRepository
    {
        private readonly AppDbContext _context;
        private readonly HttpClient _httpClient;
        private readonly IHttpContextAccessor _httpContextAccessor;
        public OrderRepository(AppDbContext context, HttpClient httpClient, IHttpContextAccessor httpContextAccessor)
        {
            _context = context;
            _httpClient = httpClient;
            _httpContextAccessor = httpContextAccessor;
        }

        public async Task<IEnumerable<Order>> GetAllOrdersAsync()
        {
            return await _context.Orders.ToListAsync();
        }

        public async Task<Order> GetOrderByIdAsync(int id)
        {
            return await _context.Orders.FindAsync(id);
        }

        public async Task AddOrderAsync(OrderCreateDTO orderCreateDTO)
        {
            var order = new Order
            {
                CreatedBy = GetUserIdFromToken(),
                TableId = orderCreateDTO.TableId,
                Status = "Pending",
                OrderDate = DateTime.Now,
                CreatedAt = DateTime.Now,
                UpdatedAt = DateTime.Now,
                TimeStart = DateTime.Now,

            };

            await _context.Orders.AddAsync(order);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateOrderAsync(int id, OrderUpdateDTO orderUpdateDTO)
        {
            var order = await _context.Orders.FindAsync(id);
            if (order != null)
            {
                order.OrderDate = orderUpdateDTO.OrderDate ?? order.OrderDate;
                order.UpdatedBy = orderUpdateDTO.UpdateBy ?? order.UpdatedBy;
                order.Status = orderUpdateDTO.Status ?? order.Status;
                order.TableId = orderUpdateDTO.TableId ?? order.TableId;
                order.TotalPrice = orderUpdateDTO.TotalPrice ?? order.TotalPrice;
                order.UpdatedAt = DateTime.Now;
                order.TimeEnd = orderUpdateDTO.TimeEnd ?? order.TimeEnd;

                await _context.SaveChangesAsync();
            }
        }

        public async Task DeleteOrderAsync(int id)
        {
            var order = await _context.Orders.FindAsync(id);
            if (order != null)
            {
                _context.Orders.Remove(order);
                await _context.SaveChangesAsync();
            }
        }

        public int GetUserIdFromToken()
        {
            var token = _httpContextAccessor.HttpContext.Request.Headers["Authorization"]
                .ToString().Replace("Bearer ", "");

            var handler = new System.IdentityModel.Tokens.Jwt.JwtSecurityTokenHandler();
            var jwtToken = handler.ReadJwtToken(token);
            var userIdClaim = jwtToken.Claims.FirstOrDefault(c => c.Type == "userId");

            return userIdClaim != null ? int.Parse(userIdClaim.Value) : 0;
        }

        public async Task<Order> GetPendingOrderByTableIdAsync(int tableId)
        {
            return await _context.Orders
                .FirstOrDefaultAsync(o => o.TableId == tableId && o.Status == "Pending");
        }
    }
}
