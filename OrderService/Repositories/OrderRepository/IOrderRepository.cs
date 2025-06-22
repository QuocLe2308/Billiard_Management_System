using OrderService.Models;
using static OrderService.DTOs.OrderDTOs.OrderDTOs;

namespace OrderService.Repositories.OrderRepository
{
    public interface IOrderRepository
    {
        Task<IEnumerable<Order>> GetAllOrdersAsync();
        Task<Order> GetOrderByIdAsync(int id);
        Task AddOrderAsync(OrderCreateDTO orderCreateDTO);
        Task UpdateOrderAsync(int id, OrderUpdateDTO orderUpdateDTO);
        Task DeleteOrderAsync(int id);
        int GetUserIdFromToken();
        Task<Order> GetPendingOrderByTableIdAsync(int tableId);
    }
}
