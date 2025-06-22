using OrderService.Models;
using OrderService.Repositories.OrderDetailRepository;
using System.Text.Json;
using System.Text.Json.Serialization;
using static OrderService.DTOs.OrderDetailDTOs.OrderDetailDTOs;
using static OrderService.DTOs.RequestModels.RequestModels;
using static OrderService.DTOs.OrderDTOs.OrderDTOs;
using OrderService.Repositories.OrderRepository;
using System.Net.Http.Headers;
using System.Text;
using OrderService.Services.OrderService;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;
using OrderService.DTOs.OrderDTOs;
using Microsoft.Extensions.Hosting;
using System;


namespace OrderService.Services.OrderDetailService
{
    public class OrderDetailService : IOrderDetailService
    {
        private readonly IOrderDetailRepository _orderDetailRepository;
        private readonly HttpClient _httpClient;
        private readonly IOrderRepository _orderRepository;

        public OrderDetailService(IOrderDetailRepository orderDetailRepository, HttpClient httpClient, IOrderRepository orderRepository)
        {
            _orderDetailRepository = orderDetailRepository;
            _httpClient = httpClient;
            _orderRepository = orderRepository;
        }

        public async Task<IEnumerable<OrderDetail>> GetAllOrderDetailsAsync()
        {
            var orderDetails = await _orderDetailRepository.GetAllOrderDetailsAsync();
            return orderDetails.Select(detail => new OrderDetail
            {
                OrderId = detail.OrderId,
                DrinkId = detail.DrinkId,
                Quantity = detail.Quantity,
                TotalPrice = detail.TotalPrice
            }).ToList();
        }

        public async Task<OrderDetail?> GetOrderDetailByIdAsync(int id)
        {
            var detail = await _orderDetailRepository.GetOrderDetailByIdAsync(id);
            return detail == null ? null : new OrderDetail
            {
                OrderId = detail.OrderId,
                DrinkId = detail.DrinkId,
                Quantity = detail.Quantity,
                TotalPrice = detail.TotalPrice
            };
        }

        public async Task<OrderDetailCreateDTO> AddOrderDetailAsync(OrderDetailCreateDTO orderDetailCreateDTO)
        {
            if (orderDetailCreateDTO == null)
                throw new ArgumentNullException(nameof(orderDetailCreateDTO));

            var existingOrder = await _orderDetailRepository.GetOrderByIdAsync(orderDetailCreateDTO.OrderId);
            if (existingOrder == null)
            {
                throw new Exception($"Order với ID {orderDetailCreateDTO.OrderId} không tồn tại.");
            }

            var tables = await GetAllTablesAsync();
            var table = tables.FirstOrDefault(t => t.TableId == existingOrder.TableId);

            if (table == null || table.Status != "Occupied")
            {
                throw new Exception($"Bàn với ID {existingOrder.TableId} không được chiếm giữ.");
            }

            var drinks = await GetAllDrinksAsync();
            var selectedDrink = drinks.FirstOrDefault(d =>
                d.DrinkId == orderDetailCreateDTO.DrinkId && d.Stock > 0);

            if (selectedDrink == null)
            {
                throw new Exception($"Nước với ID {orderDetailCreateDTO.DrinkId} không khả dụng hoặc đã hết hàng.");
            }

            var existingOrderDetail = await _orderDetailRepository
                .GetOrderDetailByOrderAndDrinkIdAsync(orderDetailCreateDTO.OrderId, orderDetailCreateDTO.DrinkId);

            if (existingOrderDetail != null)
            {
                existingOrderDetail.Quantity += orderDetailCreateDTO.Quantity;
                existingOrderDetail.TotalPrice = existingOrderDetail.Quantity * selectedDrink.DrinkPrice;

                await _orderDetailRepository.UpdateOrderDetailAsync(existingOrderDetail.OrderDetailId,
                    new OrderDetailUpdateDTO
                    {
                        Quantity = existingOrderDetail.Quantity,
                        TotalPrice = existingOrderDetail.TotalPrice
                    });

                return orderDetailCreateDTO;
            }

            orderDetailCreateDTO.TotalPrice = orderDetailCreateDTO.Quantity * selectedDrink.DrinkPrice;
            await _orderDetailRepository.AddOrderDetailAsync(orderDetailCreateDTO);

            return orderDetailCreateDTO;
        }


        public async Task UpdateOrderDetailAsync(int id, OrderDetailUpdateDTO orderDetailUpdateDTO)
        {
            if (orderDetailUpdateDTO == null)
                throw new ArgumentNullException(nameof(orderDetailUpdateDTO));

            await _orderDetailRepository.UpdateOrderDetailAsync(id, orderDetailUpdateDTO);
        }

        public async Task DeleteOrderDetailAsync(int id)
        {
            await _orderDetailRepository.DeleteOrderDetailAsync(id);
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
            return tables?.Where(t => t.Status == "Occupied").ToList() ?? new List<TableDto>();
        }

        public async Task<IEnumerable<ViewListDrink>> GetOrderDetailsByOrderIdAsync(int orderId)
        {
            var orderDetails = await _orderDetailRepository.GetOrderDetailsByOrderIdAsync(orderId);
            var drinks = await GetAllDrinksAsync();

            // Map each OrderDetail to a ViewListDrink
            var updatedOrderDetails = orderDetails.Select(detail =>
            {
                var drink = drinks.FirstOrDefault(d => d.DrinkId == detail.DrinkId);
                return new ViewListDrink
                {
                    OrderDetailId = detail.OrderDetailId,
                    OrderId = detail.OrderId,
                    DrinkId = detail.DrinkId,
                    DrinkName = drink?.DrinkName, // Set DrinkName if drink is found
                    Quantity = detail.Quantity,
                    TotalPrice = detail.Quantity * (drink?.DrinkPrice ?? 0) // Calculate TotalPrice or set to 0 if drink is null
                };
            }).ToList();

            return updatedOrderDetails;
        }


        public async Task<decimal> CalculateDrinkCostByOrderIdAsync(int orderId)
        {
            var orderDetails = await _orderDetailRepository.GetOrderDetailsByOrderIdAsync(orderId);

            if (orderDetails == null || !orderDetails.Any())
            {
                throw new Exception($"No order details found for Order ID: {orderId}");
            }

            var drinks = await GetAllDrinksAsync();

            decimal totalDrinkCost = 0;

            foreach (var detail in orderDetails)
            {
                var drink = drinks.FirstOrDefault(d => d.DrinkId == detail.DrinkId);

                if (drink != null)
                {
                    totalDrinkCost += drink.DrinkPrice * detail.Quantity;
                }
            }

            return totalDrinkCost;
        }

        public async Task<Bill> CreateBillAsync(int tableId)
        {

            var order = await _orderRepository.GetPendingOrderByTableIdAsync(tableId);
            if (order == null)
                throw new Exception($"Không có Order nào với TableId {tableId} và trạng thái 'Pending'.");

            int orderId = order.OrderId;
            // Retrieve the order by ID
            if (order == null)
                throw new Exception($"Order với ID {orderId} không tồn tại.");

            // Check if the order is already paid
            if (order.Status == "Paid")
                throw new Exception("Order này đã được thanh toán và không thể tạo hóa đơn thêm.");

            // Update order with end time and status as "Paid"
            var updatedOrder = new OrderUpdateDTO
            {
                Status = "Paid",
                TimeEnd = DateTime.Now,
                UpdatedAt = DateTime.Now
            };
            await _orderRepository.UpdateOrderAsync(orderId, updatedOrder);
            order.TimeEnd = updatedOrder.TimeEnd.Value;

            // Calculate play time
            var timePlayed = (order.TimeEnd - order.TimeStart).TotalHours;
            if (timePlayed <= 0)
                throw new Exception("Thời gian chơi không hợp lệ.");

            // Retrieve the table and calculate table cost
            var table = (await GetAllTablesAsync()).FirstOrDefault(t => t.TableId == order.TableId);
            if (table == null)
                throw new Exception($"Bàn với ID {order.TableId} không tồn tại.");

            var tableCost = RoundToNearestHundred((decimal)timePlayed * table.Price);

            // Retrieve order details and calculate drink costs
            var orderDetails = await _orderDetailRepository.GetOrderDetailsByOrderIdAsync(orderId);
            var drinks = await GetAllDrinksAsync();

            var drinkSummaries = orderDetails.Select(od =>
            {
                var drink = drinks.FirstOrDefault(d => d.DrinkId == od.DrinkId);
                if (drink == null) throw new Exception($"Không tìm thấy đồ uống với ID {od.DrinkId}");

                return new DrinkSummary
                {
                    DrinkName = drink.DrinkName,
                    Quantity = od.Quantity,
                    DrinkPrice = drink.DrinkPrice,
                    TotalPrice = od.Quantity * drink.DrinkPrice
                };
            }).ToList();

            var totalDrinkCost = RoundToNearestHundred(drinkSummaries.Sum(ds => ds.TotalPrice));

            var totalCost = RoundToNearestHundred(tableCost + totalDrinkCost);
            order.TotalPrice = totalCost;
            await _orderRepository.UpdateOrderAsync(orderId, new OrderUpdateDTO { TotalPrice = totalCost });

            // Create the bill with table and drink costs
            var bill = new Bill
            {
                TimeStart = order.TimeStart,
                TimeEnd = order.TimeEnd,
                TableCost = tableCost,
                DrinkSummaries = drinkSummaries,
                TotalCost = totalCost
            };

            // Update the table's status to "Available"
            using (var httpClient = new HttpClient())
            {
                var tableStatusUrl = $"http://172.16.6.46:5016/api/Table/update-status/{order.TableId}";
                var updateStatusRequest = new UpdateStatusRequest { NewStatus = "Available" };
                var statusContent = new StringContent(JsonConvert.SerializeObject(updateStatusRequest), Encoding.UTF8, "application/json");

                // Send PUT request to update table status
                var tableResponse = await httpClient.PutAsync(tableStatusUrl, statusContent);
                if (!tableResponse.IsSuccessStatusCode)
                {
                    throw new Exception("Không thể cập nhật trạng thái bàn thành 'Available'.");
                }
            }

            return bill;
        }




        public async Task<string> GetQrBankAsync(int orderId)
        {
            var payment = await _orderDetailRepository.GetOrderByIdAsync(orderId);
            var cost = await _orderRepository.GetOrderByIdAsync(orderId);
            if (payment == null)
            {
                throw new Exception($"Order với ID {orderId} không tồn tại.");
            }

            var totalCost = await CalculateTotalCostAsync(orderId);


            using (var httpClient = new HttpClient())
            {
                var requestUrl = "https://api.vietqr.io/v2/generate";
                httpClient.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

                var jsonPayload = new JObject
                    {
                        { "accountNo", "0791000055332" },
                        { "accountName", "Le Tan Quoc" },
                        { "acqId", 970436 },
                        { "amount", cost.TotalPrice },
                        { "addInfo", $"Pay for {payment.OrderId}" },
                        { "format", "text" },
                        { "template", $"Pay for {payment.OrderId}" }
                    };

                var response = await httpClient.PostAsync(
                    requestUrl,
                    new StringContent(jsonPayload.ToString(), Encoding.UTF8, "application/json")
                );

                if (response.IsSuccessStatusCode)
                {
                    var jsonResponse = await response.Content.ReadAsStringAsync();
                    var dataObject = JObject.Parse(jsonResponse)?["data"];
                    string dataString = dataObject.ToString();
                    Console.WriteLine("data QR: " + dataString);

                    if (dataObject != null)
                    {
                        return dataObject["qrDataURL"]?.ToString();
                    }
                }
            }
            return null;
        }

        private decimal RoundToNearestHundred(decimal amount)
        {
            decimal remainder = amount % 100;
            if (remainder > 500)
            {
                return amount + (100 - remainder);
            }
            else
            {
                return amount - remainder;
            }
        }
        public async Task<string> CheckLsgdAsync(int orderId)
        {
            int status = 0;
            string url = "http://172.16.6.46/lsgd.php";

            var order = await _orderDetailRepository.GetOrderByIdAsync(orderId);
            if (order == null)
            {
                var response = new OrderDTOs.Response
                {
                    Success = false,
                    Message = "Order ID does not exist!"
                };
                return JsonConvert.SerializeObject(response);
            }

            if (string.IsNullOrEmpty(order.Status))
            {
                status = 1;
            }

            using (var httpClient = new HttpClient())
            {
                var jsonData = await httpClient.GetStringAsync(url);
                var jsonNode = JsonConvert.DeserializeObject<JObject>(jsonData);
                var transactionsNode = jsonNode["transactions"];

                foreach (var transactionNode in transactionsNode)
                {
                    var amountStr = transactionNode["Amount"].ToString();
                    var amount = decimal.Parse(amountStr.Replace(",", ""));
                    var description = transactionNode["Description"].ToString();

                    var contentbank = $"Pay for {order.OrderId}";

                    if (description.Contains(contentbank) && amount >= order.TotalPrice)
                    {
                        order.Status = "Paid";
                        order.UpdatedAt = DateTime.Now;

                        var orderUpdateDTO = new OrderDTOs.OrderUpdateDTO
                        {
                            Status = order.Status,
                            TotalPrice = order.TotalPrice,
                            UpdatedAt = DateTime.Now,
                            TableId = order.TableId,
                            TimeEnd = order.TimeEnd
                        };

                        await _orderRepository.UpdateOrderAsync(order.OrderId, orderUpdateDTO);

                        var tableStatusUrl = $"http://172.16.6.46:5016/api/Table/update-status/{order.TableId}";
                        var updateStatusRequest = new UpdateStatusRequest { NewStatus = "Available" };
                        var statusContent = new StringContent(JsonConvert.SerializeObject(updateStatusRequest), Encoding.UTF8, "application/json");
                        var tableResponse = await httpClient.PutAsync(tableStatusUrl, statusContent);

                        if (tableResponse.IsSuccessStatusCode)
                        {
                            status = 1;
                        }
                        else
                        {
                            return JsonConvert.SerializeObject(new OrderDTOs.Response
                            {
                                Success = false,
                                Message = $"Failed to update table status. Order {order.OrderId} is Paid, but table status was not updated."
                            });
                        }

                        break;
                    }
                }

                var response = status == 1
                    ? new OrderDTOs.Response
                    {
                        Success = true,
                        Message = $"Order {order.OrderId} Paid and table status updated to 'Available'."
                    }
                    : new OrderDTOs.Response
                    {
                        Success = false,
                        Message = "Error: Transaction not found or payment not sufficient.",
                    };

                return JsonConvert.SerializeObject(response);
            }
        }

        public async Task<decimal> CalculateTotalCostAsync(int orderId)
        {
            var order = await _orderDetailRepository.GetOrderByIdAsync(orderId);
            if (order == null)
            {
                throw new Exception("Order not found.");
            }

            var updatedOrder = new OrderUpdateDTO
            {
                TimeEnd = DateTime.Now,
                UpdatedAt = DateTime.Now,
                TotalPrice = 0
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

            decimal drinkCost = await CalculateDrinkCostByOrderIdAsync(orderId);

            decimal totalCost = playCost + drinkCost;
            var cost1 = RoundToNearestHundred(totalCost);
            updatedOrder.TotalPrice = cost1;

            await _orderRepository.UpdateOrderAsync(orderId, updatedOrder);

            return totalCost;
        }

        public async Task<OrderCostViewModel> CalculateTotalCostToShowAsync(int tableId)
        {
            var order = await _orderRepository.GetPendingOrderByTableIdAsync(tableId);
            if (order == null)
            {
                throw new Exception("Order không tồn tại hoặc đã thanh toán.");
            }

            var tables = await GetAllTablesAsync();
            var selectedTable = tables.FirstOrDefault(t => t.TableId == tableId);
            if (selectedTable == null)
            {
                throw new Exception("Bàn không tồn tại.");
            }

            decimal priceTable = selectedTable.Price;
            TimeSpan duration = DateTime.Now - order.TimeStart;
            decimal playCost = (decimal)duration.TotalHours * priceTable;

            var drinkDetails = await GetOrderDetailsByOrderIdAsync(order.OrderId);
            decimal drinkCost = drinkDetails.Sum(d => d.TotalPrice);

            decimal totalCost = playCost + drinkCost;
            decimal roundedTotalCost = RoundToNearestHundred(totalCost);

            return new OrderCostViewModel
            {
                TotalCost = roundedTotalCost,
                PlayCost = RoundToNearestHundred(playCost),
                DrinkDetails = drinkDetails
            };
        }
    }
}
