using OrderService.DTOs.OrderDetailDTOs;
using OrderService.Models;
using static OrderService.DTOs.OrderDetailDTOs.OrderDetailDTOs;
using static OrderService.DTOs.RequestModels.RequestModels;

namespace OrderService.Services.OrderDetailService
{
    public interface IOrderDetailService
    {
        Task<IEnumerable<OrderDetail>> GetAllOrderDetailsAsync();
        Task<OrderDetail?> GetOrderDetailByIdAsync(int id);
        Task<OrderDetailCreateDTO> AddOrderDetailAsync(OrderDetailCreateDTO orderDetailCreateDTO);
        Task UpdateOrderDetailAsync(int id, OrderDetailUpdateDTO orderDetailUpdateDTO);
        Task DeleteOrderDetailAsync(int id);
        Task<IEnumerable<DrinkDto>> GetAllDrinksAsync();
        Task<IEnumerable<TableDto>> GetAllTablesAsync();
        Task<IEnumerable<ViewListDrink>> GetOrderDetailsByOrderIdAsync(int orderId);
        Task<decimal> CalculateDrinkCostByOrderIdAsync(int orderId);
        Task<Bill> CreateBillAsync(int orderId);
        Task<string> CheckLsgdAsync(int orderId);
        Task<string> GetQrBankAsync(int orderId);
        Task<decimal> CalculateTotalCostAsync(int orderId);
        Task<OrderCostViewModel> CalculateTotalCostToShowAsync(int tableId);
    }
}
