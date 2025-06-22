using Microsoft.EntityFrameworkCore;
using OrderService.Data;
using OrderService.Models;
using static OrderService.DTOs.OrderDetailDTOs.OrderDetailDTOs;

namespace OrderService.Repositories.OrderDetailRepository
{
    public class OrderDetailRepository : IOrderDetailRepository
    {
        private readonly AppDbContext _context;
        private readonly HttpClient _httpClient;

        public OrderDetailRepository(AppDbContext context, HttpClient httpClient)
        {
            _context = context;
            _httpClient = httpClient;
        }

        public async Task<IEnumerable<OrderDetail>> GetAllOrderDetailsAsync()
        {
            return await _context.OrderDetails.ToListAsync();
        }

        public async Task<OrderDetail> GetOrderDetailByIdAsync(int id)
        {
            return await _context.OrderDetails.FindAsync(id);
        }

        public async Task AddOrderDetailAsync(OrderDetailCreateDTO orderDetailCreateDTO)
        {
            var orderDetail = new OrderDetail
            {
                OrderId = orderDetailCreateDTO.OrderId,
                DrinkId = orderDetailCreateDTO.DrinkId,
                Quantity = orderDetailCreateDTO.Quantity,
                TotalPrice = orderDetailCreateDTO.TotalPrice
            };

            await _context.OrderDetails.AddAsync(orderDetail);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateOrderDetailAsync(int id, OrderDetailUpdateDTO orderDetailUpdateDTO)
        {
            var orderDetail = await _context.OrderDetails.FindAsync(id);
            if (orderDetail != null)
            {
                orderDetail.DrinkId = orderDetailUpdateDTO.DrinkId ?? orderDetail.DrinkId;
                orderDetail.Quantity = orderDetailUpdateDTO.Quantity ?? orderDetail.Quantity;
                orderDetail.TotalPrice = orderDetailUpdateDTO.TotalPrice ?? orderDetail.TotalPrice;

                await _context.SaveChangesAsync();
            }
        }

        public async Task DeleteOrderDetailAsync(int id)
        {
            var orderDetail = await _context.OrderDetails.FindAsync(id);
            if (orderDetail != null)
            {
                _context.OrderDetails.Remove(orderDetail);
                await _context.SaveChangesAsync();
            }
        }
        public async Task<Order> GetOrderByIdAsync(int orderId)
        {
            return await _context.Orders.FindAsync(orderId);
        }

        public async Task<IEnumerable<OrderDetail>> GetOrderDetailsByOrderIdAsync(int orderId)
        {
            return await _context.OrderDetails
                .Where(od => od.OrderId == orderId)
                .ToListAsync();
        }

        public async Task<OrderDetail> GetOrderDetailByOrderAndDrinkIdAsync(int orderId, int drinkId)
        {
            return await _context.OrderDetails
                .FirstOrDefaultAsync(od => od.OrderId == orderId && od.DrinkId == drinkId);
        }

    }
}
