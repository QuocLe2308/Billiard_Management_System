using OrderService.Models;
using OrderService.Repositories.OrderRepository;
using System.Text.Json;
using System.Text.Json.Serialization;
using static OrderService.DTOs.OrderDTOs.OrderDTOs;
using static OrderService.DTOs.RequestModels.RequestModels;
using OrderService.Repositories.OrderDetailRepository;
using OrderService.Services.OrderDetailService;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using static OrderService.DTOs.OrderDetailDTOs.OrderDetailDTOs;
using System.Text;

namespace OrderService.Services.OrderService
{
    public class OrderService : IOrderService
    {
        private readonly IOrderRepository _orderRepository;
        private readonly HttpClient _httpClient;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IOrderDetailRepository _orderDetailRepository;
        private readonly IOrderDetailService _orderDetailService;

        public OrderService(IOrderRepository orderRepository, HttpClient httpClient, IHttpContextAccessor httpContextAccessor, IOrderDetailRepository orderDetailRepository, IOrderDetailService orderDetailService)
        {
            _orderRepository = orderRepository;
            _httpClient = httpClient;
            _httpContextAccessor = httpContextAccessor;
            _orderDetailRepository = orderDetailRepository;
            _orderDetailService = orderDetailService;
    }

        public async Task<IEnumerable<Order>> GetAllOrdersAsync()
        {
            return await _orderRepository.GetAllOrdersAsync();
        }

        public async Task<Order> GetOrderByIdAsync(int id)
        {
            return await _orderRepository.GetOrderByIdAsync(id);
        }

        public async Task AddOrderAsync(OrderCreateDTO orderCreateDTO)
        {
            if (orderCreateDTO == null)
                throw new ArgumentNullException(nameof(orderCreateDTO));

            // Find the table with matching ID and check its availability.
            var tables = await GetAllTablesAsync();
            var selectedTable = tables.FirstOrDefault(t =>
                t.TableId == orderCreateDTO.TableId && t.Status == "Available");

            if (selectedTable == null)
            {
                throw new Exception($"Table with ID {orderCreateDTO.TableId} is not Available.");
            }

            // Proceed with adding the order to the database.
            await _orderRepository.AddOrderAsync(orderCreateDTO);

            // Define the URL for updating the table status.
            var tableStatusUrl = $"http://172.16.6.46:5016/api/Table/update-status/{orderCreateDTO.TableId}";

            // Create the payload for updating the status to "Occupied".
            var updateStatusRequest = new UpdateStatusRequest { NewStatus = "Occupied" };
            var statusContent = new StringContent(JsonConvert.SerializeObject(updateStatusRequest), Encoding.UTF8, "application/json");

            // Send the HTTP PUT request to update the table's status.
            using (var httpClient = new HttpClient())
            {
                var tableResponse = await httpClient.PutAsync(tableStatusUrl, statusContent);

                if (!tableResponse.IsSuccessStatusCode)
                {
                    throw new Exception($"Failed to update table status. Status Code: {tableResponse.StatusCode}");
                }
            }
        }


        private async Task UpdateTableStatusAsync(int tableId, string newStatus)
        {
            var apiUrl = $"http://172.16.6.46:5016/api/Table/update-status/{tableId}";

            var content = new StringContent($"\"{newStatus}\"", System.Text.Encoding.UTF8, "application/json");

            var response = await _httpClient.PutAsync(apiUrl, content);

            if (!response.IsSuccessStatusCode)
            {
                throw new Exception($"Failed to update status for Table ID {tableId}. Status code: {response.StatusCode}");
            }
        }



        public async Task UpdateOrderAsync(int id, OrderUpdateDTO orderUpdateDTO)
        {
            if (orderUpdateDTO == null)
                throw new ArgumentNullException(nameof(orderUpdateDTO));
                orderUpdateDTO.UpdateBy = GetUserIdFromToken();
            await _orderRepository.UpdateOrderAsync(id, orderUpdateDTO);
        }

        public async Task DeleteOrderAsync(int id)
        {
            await _orderRepository.DeleteOrderAsync(id);
        }

        public async Task<IEnumerable<DrinkDto>> GetAllDrinksAsync()
        {
            var response = await _httpClient.GetAsync("http://172.16.6.46:5281/api/Drink");
            response.EnsureSuccessStatusCode();

            var jsonResponse = await response.Content.ReadAsStringAsync();
            var options = new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true,
                Converters = { new JsonStringEnumConverter() }
            };

            var drinks = System.Text.Json.JsonSerializer.Deserialize<List<DrinkDto>>(jsonResponse, options);
            return drinks?.Where(d => d.Stock > 0).ToList() ?? new List<DrinkDto>();
        }

        public async Task<IEnumerable<TableDto>> GetAllTablesAsync()
        {
            var response = await _httpClient.GetAsync("http://172.16.6.46:5016/api/Table");
            response.EnsureSuccessStatusCode();

            var jsonResponse = await response.Content.ReadAsStringAsync();
            var options = new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true,
                Converters = { new JsonStringEnumConverter() }
            };

            var tables = System.Text.Json.JsonSerializer.Deserialize<List<TableDto>>(jsonResponse, options);
            return tables?.Where(t => t.Status == "Available").ToList() ?? new List<TableDto>();
        }

        public async Task<decimal> CalculateTotalCostAsync(int orderId)
        {
            var order = await _orderRepository.GetOrderByIdAsync(orderId);
            if (order == null)
            {
                throw new Exception("Order not found.");
            }

            var updatedOrder = new OrderUpdateDTO
            {
                TimeEnd = DateTime.Now,
                UpdatedAt = DateTime.Now
            };

            await _orderRepository.UpdateOrderAsync(orderId, updatedOrder);

            var tables = await GetAllTablesAsync();
            var selectedTable = tables.FirstOrDefault(t => t.TableId == order.TableId);
            if (selectedTable == null)
            {
                throw new Exception("Table not found.");
            }

            decimal priceTable = selectedTable.Price;
            TimeSpan duration = updatedOrder.TimeEnd.Value - order.TimeStart;
            decimal playCost = (decimal)duration.TotalHours * priceTable;

            decimal drinkCost = await _orderDetailService.CalculateDrinkCostByOrderIdAsync(orderId);

            decimal totalCost = playCost + drinkCost;

            return totalCost;
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

    }
}
