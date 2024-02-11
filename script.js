function fetchApiData(selectedOption) {
    return new Promise((resolve, reject) => {
        fetch(`https://date.nager.at/api/v3/PublicHolidays/2024/${selectedOption}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => resolve(data))
            .catch(error => reject(error));
    });
}

function callApi() {
    var selectedOption = document.getElementById("options").value;

    fetchApiData(selectedOption)
        .then(data => {
            var tableBody = document.getElementById("holidayTableBody");

            data.forEach(function (holiday) {
                var row = tableBody.insertRow();
                row.insertCell(0).innerHTML = holiday.date;
                row.insertCell(1).innerHTML = holiday.localName;
                row.insertCell(2).innerHTML = holiday.name;
                row.insertCell(3).innerHTML = holiday.countryCode;
                row.insertCell(4).innerHTML = holiday.fixed;
                row.insertCell(5).innerHTML = holiday.global;
                row.insertCell(6).innerHTML = holiday.types.join(", ");
            });
        })
        .catch(error => {
            console.error('Error fetching API data:', error);
            document.getElementById("response-container").innerHTML = '<p>Error: ' + error.message + '</p>';
        });
}

