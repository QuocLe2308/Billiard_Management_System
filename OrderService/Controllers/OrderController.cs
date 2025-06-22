using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OrderService.Models;
using OrderService.Services.OrderService;
using static OrderService.DTOs.OrderDTOs.OrderDTOs;

namespace OrderService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly IOrderService _orderService;

        public OrderController(IOrderService orderService)
        {
            _orderService = orderService;
        }

        // GET: api/Order
        [HttpGet]
        public async Task<IActionResult> GetAllOrders()
        {
            var orders = await _orderService.GetAllOrdersAsync();
            return Ok(orders);
        }

        // GET: api/Order/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetOrderById(int id)
        {
            var order = await _orderService.GetOrderByIdAsync(id);
            if (order == null)
            {
                return NotFound($"Order with ID {id} not found.");
            }
            return Ok(order);
        }

        // POST: api/Order
        [HttpPost]
        public async Task<IActionResult> AddOrder([FromBody] OrderCreateDTO orderCreateDTO)
        {
           
                await _orderService.AddOrderAsync(orderCreateDTO);
                return Ok("Order created successfully.");
            
            
        }

        // PUT: api/Order/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateOrder(int id, [FromBody] OrderUpdateDTO orderUpdateDTO)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                await _orderService.UpdateOrderAsync(id, orderUpdateDTO);
                return Ok("Order updated successfully.");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // DELETE: api/Order/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOrder(int id)
        {
            try
            {
                await _orderService.DeleteOrderAsync(id);
                return Ok("Order deleted successfully.");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // GET: api/Order/calculate-total-cost/{orderId}
        [HttpGet("calculate-total-cost/{orderId}")]
        public async Task<IActionResult> CalculateTotalCost(int orderId)
        {
            try
            {
                var totalCost = await _orderService.CalculateTotalCostAsync(orderId);
                return Ok(new { TotalCost = totalCost });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("tables")]
        public async Task<IActionResult> GetAllTabless()
        {
            var drinks = await _orderService.GetAllTablesAsync();
            return Ok(drinks);
        }
    }
}
