using TableService.Data;
using TableService.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using static TableService.DTOs.TableDTO;

namespace TableService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TableController : ControllerBase
    {
        private readonly AppDbContext _context;

        public TableController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/employee
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Table>>> GetTables()
        {
            return await _context.Tables.ToListAsync();
        }

        // GET: api/employee/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Table>> GetTables(int id)
        {
            var table = await _context.Tables.FindAsync(id);

            if (table == null)
            {
                return NotFound();
            }

            return table;
        }

        // POST: api/employee
        [HttpPost]
        public async Task<ActionResult<Table>> PostTable(Table table)
        {
            _context.Tables.Add(table);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetTables), new { id = table.TableId }, table);
        }

        // PUT: api/employee/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTable(int id, Table table)
        {
            if (id != table.TableId)
            {
                return BadRequest();
            }

            _context.Entry(table).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!tableExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // DELETE: api/employee/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTable(int id)
        {
            var table = await _context.Tables.FindAsync(id);
            if (table == null)
            {
                return NotFound();
            }

            _context.Tables.Remove(table);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool tableExists(int id)
        {
            return _context.Tables.Any(e => e.TableId == id);
        }

        // PUT: api/table/update-status/5
        [HttpPut("update-status/{id}")]
        public async Task<IActionResult> UpdateTableStatus(int id, [FromBody] UpdateStatusRequest updateStatusRequest)
        {
            var table = await _context.Tables.FindAsync(id);

            if (table == null)
            {
                return NotFound(new { Message = $"Table with ID {id} not found." });
            }

            table.Status = updateStatusRequest.NewStatus;

            try
            {
                await _context.SaveChangesAsync();
            }   
            catch (DbUpdateConcurrencyException)
            {
                if (!TableExists(id))
                {
                    return NotFound(new { Message = $"Table with ID {id} no longer exists." });
                }
                else
                {
                    throw;
                }
            }

            return Ok(new { Message = $"Table status updated to '{updateStatusRequest.NewStatus}' successfully." });
        }

        private bool TableExists(int id)
        {
            return _context.Tables.Any(t => t.TableId == id);
        }

    }
}
