document.addEventListener('DOMContentLoaded', () => {
    const fetchButton = document.getElementById('fetchButton');
    const stationInput = document.getElementById('station');
    const arrivalsDiv = document.getElementById('arrivals');
    const loadingIndicator = document.getElementById('loading');
  
    fetchButton.addEventListener('click', () => {
      const stationCode = stationInput.value.toUpperCase();
      if (!stationCode) return;

      loadingIndicator.style.display = 'block';
      arrivalsDiv.innerHTML = '';
  

      fetch(`/api/arrivals/${stationCode}`)
        .then((response) => response.json())
        .then((data) => {
          loadingIndicator.style.display = 'none';
          arrivalsDiv.innerHTML = formatArrivals(data);
        })
        .catch((error) => {
          loadingIndicator.style.display = 'none';
          arrivalsDiv.innerHTML = 'an error occurred while fetching data from the server.';
          console.error(error);
        });
    });

    function formatArrivals(data) {
      let html = '<h2>Train Arrivals</h2>';
      
      if (!data || !data.etd) {
        return '<p>No arrivals at this time.</p>';
      }
    
      if (Array.isArray(data.etd)) {
        data.etd.forEach((destination) => {
          html += `<div class="arrival">
                      <strong>destination:</strong> ${destination.destination}
                      <br>
                      <strong>estimated arrival:</strong> ${destination.estimate[0].minutes} minutes
                   </div>`;
        });
      } else if (data.etd.error) {
        html += `<p>${data.etd.error}</p>`;
      } else {
        html += '<p>unexpected data received from the BART API.</p>';
      }
    
      return html;
    }
    
  });
  