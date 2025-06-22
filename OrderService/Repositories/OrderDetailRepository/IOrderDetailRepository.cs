using OrderService.Models;
using static OrderService.DTOs.OrderDetailDTOs.OrderDetailDTOs;

namespace OrderService.Repositories.OrderDetailRepository
{
    public interface IOrderDetailRepository
    {
        Task<IEnumerable<OrderDetail>> GetAllOrderDetailsAsync();
        Task<OrderDetail> GetOrderDetailByIdAsync(int id);
        Task AddOrderDetailAsync(OrderDetailCreateDTO orderDetailCreateDTO);
        Task UpdateOrderDetailAsync(int id, OrderDetailUpdateDTO orderDetailUpdateDTO);
        Task DeleteOrderDetailAsync(int id);
        Task<Order> GetOrderByIdAsync(int orderId);
        Task<IEnumerable<OrderDetail>> GetOrderDetailsByOrderIdAsync(int orderId);
        Task<OrderDetail> GetOrderDetailByOrderAndDrinkIdAsync(int orderId, int drinkId);

    }
}
