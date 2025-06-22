using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OrderService.Models;
using OrderService.Services.OrderDetailService;
using static OrderService.DTOs.OrderDetailDTOs.OrderDetailDTOs;
using static OrderService.DTOs.RequestModels.RequestModels;

namespace OrderService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderDetailController : ControllerBase
    {
        private readonly IOrderDetailService _orderDetailService;

        public OrderDetailController(IOrderDetailService orderDetailService)
        {
            _orderDetailService = orderDetailService;
        }

        // GET: api/orderdetail
        [HttpGet]
        public async Task<ActionResult<IEnumerable<OrderDetail>>> GetAllOrderDetails()
        {
            var orderDetails = await _orderDetailService.GetAllOrderDetailsAsync();
            return Ok(orderDetails);
        }

        // GET: api/orderdetail/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<OrderDetail>> GetOrderDetailById(int id)
        {
            var orderDetail = await _orderDetailService.GetOrderDetailByIdAsync(id);
            if (orderDetail == null)
            {
                return NotFound();
            }
            return Ok(orderDetail);
        }

        // POST: api/orderdetail
        [HttpPost]
        public async Task<ActionResult<OrderDetailCreateDTO>> AddOrderDetail([FromBody] OrderDetailCreateDTO orderDetailCreateDTO)
        {
            if (orderDetailCreateDTO == null)
            {
                return BadRequest("Invalid order detail data.");
            }

            // Nhận lại DTO từ service
            var createdOrderDetailDTO = await _orderDetailService.AddOrderDetailAsync(orderDetailCreateDTO);

            // Trả về mã 201 với dữ liệu DTO đã tạo
            return CreatedAtAction(
                nameof(GetOrderDetailById),
                new { id = createdOrderDetailDTO.OrderId },
                createdOrderDetailDTO
            );
        }




        // PUT: api/orderdetail/{id}
        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateOrderDetail(int id, [FromBody] OrderDetailUpdateDTO orderDetailUpdateDTO)
        {
            if (orderDetailUpdateDTO == null)
            {
                return BadRequest("Invalid order detail data.");
            }

            await _orderDetailService.UpdateOrderDetailAsync(id, orderDetailUpdateDTO);
            return NoContent();
        }

        // DELETE: api/orderdetail/{id}
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteOrderDetail(int id)
        {
            await _orderDetailService.DeleteOrderDetailAsync(id);
            return NoContent();
        }

        [HttpGet("cost-ech/{id}")]
        public async Task<ActionResult> Cost(int id)
        {
            await _orderDetailService.CalculateDrinkCostByOrderIdAsync(id);
            return NoContent();
        }

        [HttpGet("order/{orderId}")]
        public async Task<IActionResult> GetOrderDetails(int orderId)
        {
            var orderDetails = await _orderDetailService.GetOrderDetailsByOrderIdAsync(orderId);
            return Ok(orderDetails);
        }


        [HttpGet("drinks")]
        public async Task<IActionResult> GetAllDrinks()
        {
            var drinks = await _orderDetailService.GetAllDrinksAsync();
            return Ok(drinks);
        }

        [HttpGet("tables")]
        public async Task<IActionResult> GetAllTabless()
        {
            var drinks = await _orderDetailService.GetAllTablesAsync();
            return Ok(drinks);
        }

        [HttpGet("bill/{tabelId}")]
        public async Task<IActionResult> CreateBill(int tabelId)
        {
            try
            {
                var bill = await _orderDetailService.CreateBillAsync(tabelId);
                return Ok(bill);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpGet("generate-qr/{orderId}")]
        public async Task<IActionResult> GenerateQrBank(int orderId)
        {
            try
            {
                var qrDataUrl = await _orderDetailService.GetQrBankAsync(orderId);
                if (string.IsNullOrEmpty(qrDataUrl))
                {
                    return NotFound(new { Success = false, Message = "Không tìm thấy dữ liệu QR." });
                }

                return Ok(new { Success = true, QrDataUrl = qrDataUrl });
            }
            catch (Exception ex)
            {
                return BadRequest(new { Success = false, Message = ex.Message });
            }
        }

        [HttpGet("check-lsgd/{orderId}")]
        public async Task<IActionResult> CheckLsgd(int orderId)
        {
            var result = await _orderDetailService.CheckLsgdAsync(orderId);
            return Content(result, "application/json");
        }

        [HttpGet("calculate-total/{orderId}")]
        public async Task<IActionResult> CalculateTotal(int orderId)
        {
            try
            {
                var totalCost = await _orderDetailService.CalculateTotalCostAsync(orderId);
                return Ok(new { Success = true, TotalCost = totalCost });
            }
            catch (Exception ex)
            {
                return BadRequest(new { Success = false, Message = ex.Message });
            }
        }

        [HttpGet("{tableId}/calculate-total-cost-to-show")]
        public async Task<IActionResult> CalculateTotalCostToShow(int tableId)
        {
            try
            {
                var orderCostViewModel = await _orderDetailService.CalculateTotalCostToShowAsync(tableId);

                return Ok(orderCostViewModel);
            }
            catch (Exception ex)
            {
                return BadRequest(new { Message = ex.Message });
            }
        }



    }
}
