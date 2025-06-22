using OrderService.Models;
using static OrderService.DTOs.OrderDTOs.OrderDTOs;
using static OrderService.DTOs.RequestModels.RequestModels;

namespace OrderService.Services.OrderService
{
    public interface IOrderService
    {
        Task<IEnumerable<Order>> GetAllOrdersAsync();
        Task<Order> GetOrderByIdAsync(int id);
        Task AddOrderAsync(OrderCreateDTO orderCreateDTO);
        Task UpdateOrderAsync(int id, OrderUpdateDTO orderUpdateDTO);
        Task DeleteOrderAsync(int id);
        Task<IEnumerable<DrinkDto>> GetAllDrinksAsync();
        Task<IEnumerable<TableDto>> GetAllTablesAsync();
        Task<decimal> CalculateTotalCostAsync(int orderId);
        int GetUserIdFromToken();
    }
}
