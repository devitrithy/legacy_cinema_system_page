<script>
  import { onMount } from "svelte";

  // Define the selected seats state
  let selectedSeats = [];

  // Sample data of available seats (replace with API data)
  let availableSeats = [
    { id: 1, row: "A", seatNumber: 1, isAvailable: true },
    { id: 2, row: "A", seatNumber: 2, isAvailable: true },
    // Add more seats here...
  ];

  // Function to handle seat selection
  function selectSeat(seat) {
    if (seat.isAvailable) {
      if (selectedSeats.includes(seat)) {
        // Deselect the seat if it's already selected
        selectedSeats = selectedSeats.filter((s) => s !== seat);
      } else {
        // Select the seat if it's available
        selectedSeats = [...selectedSeats, seat];
      }
    }
  }

  // Function to check if a seat is selected
  function isSelected(seat) {
    return selectedSeats.includes(seat);
  }

  // Function to render the seat color based on availability and selection
  function getSeatColor(seat) {
    if (!seat.isAvailable) return "gray";
    return isSelected(seat) ? "blue" : "green";
  }
</script>

<!-- Render the seats -->
<div class="mx-auto mt-32 ml-5">
  {#each availableSeats as seat}
    <div
      class="seat"
      style="background-color: {getSeatColor(seat)}"
      on:click={() => selectSeat(seat)}
    >
      {seat.row}{seat.seatNumber}
    </div>
  {/each}
</div>

<!-- Display the selected seats -->
<h3>Selected Seats:</h3>
{#if selectedSeats.length === 0}
  <p>No seats selected.</p>
{:else}
  <ul>
    {#each selectedSeats as seat}
      <li>{seat.row}{seat.seatNumber}</li>
    {/each}
  </ul>
{/if}

<style>
  .seat {
    width: 40px;
    height: 40px;
    margin: 5px;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    font-weight: bold;
  }
</style>
