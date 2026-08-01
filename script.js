function filterDestination(type){
    let cards =
    document.querySelectorAll(".destination-card");

    cards.forEach(function(card){

        if(type === "all"){

            card.style.display = "block";

        }

        else if(
            card.getAttribute("data-type")
            === type
        ){

            card.style.display = "block";

        }

        else{

            card.style.display = "none";

        }


    });

}
const travelPackages = {

    goa: {
        price: "₹14,999",
        days: "3 Days / 2 Nights",
        hotel: "ocean breeze resort",
        rating: "4.6/5"
    },

    manali: {
        price: "₹18,999",
        days: "4 Days / 3 Nights",
        hotel: "snow peak resort",
        rating: "4.9/5"
    },

    kerala: {
        price: "₹29,999",
        days: "5 Days / 4 Nights",
        hotel: "green lagoon resort",
        rating: "4.7/5"
    },

    hyderabad: {
        price: "₹89,999",
        days: "3 Days / 2 Nights",
        hotel: "skyline grand hotel",
        rating: "4.8/5"
    },

    dubai: {
        price: "₹89,999",
        days: "6 Days / 5 Nights",
        hotel: "palm royal resort",
        rating: "4.9/5"
    },

    paris: {
        price: "₹1,49,999",
        days: "7 Days / 6 Nights",
        hotel: "eiffel view suites",
        rating: "4.8/5"
    },

    london: {
        price: "₹1,39,999",
        days: "6 Days / 5 Nights",
        hotel: "thames crown hotel",
        rating: "4.9/5"
    },

    singapore: {
        price: "₹74,999",
        days: "5 Days / 4 Nights",
        hotel: "marina bay suites",
        rating: "4.8/5"
    }

};
async function searchDestination() {

    let city = document.getElementById("searchDestination").value.trim();
    if(city===""){
        alert("Please enter a city.");
        return;
    }
document.getElementById("searchResult").innerHTML = `

<div class="card">

<h2>✈️ Finding the Best Package...</h2>

<p>Please wait while we search your destination.</p>

</div>

`;
let url="https://en.wikipedia.org/api/rest_v1/page/summary/"+encodeURIComponent(city);
    try{

        let response=await fetch(url);

        let data=await response.json();

        if(data.type==="https://mediawiki.org/wiki/HyperSwitch/errors/not_found"){

            document.getElementById("searchResult").innerHTML=
            "<h3>City Not Found</h3>";

            return;

        }

        let packageInfo = travelPackages[city.toLowerCase()];

if(!packageInfo){

    packageInfo = {

        price:"₹21,999",

        days:"4 Days / 3 Nights",

        hotel:"Elite resort",

        rating:"4.8/5"

    };

}

        document.getElementById("searchResult").innerHTML = `

<div class="card">

${data.thumbnail ?
`<img src="${data.thumbnail.source}" 
style="width:100%; height:250px; object-fit:cover; border-radius:10px;">`
: ""}

<h2>📍 ${data.title}</h2>

<p>${data.extract}</p>

<hr>

<h3>🧳 Travel Nest Package</h3>

<p>⏳ Duration : ${packageInfo.days}</p>

<p>🏨 Hotel : ${packageInfo.hotel}</p>

<p>🍽 Breakfast Included</p>

<p>💰 Estimated Price : ${packageInfo.price}</p>

<p>⭐ Rating : ${packageInfo.rating}</p>

</div>

`;

        
    }

    catch(error){

        document.getElementById("searchResult").innerHTML=
        "<h3>Unable to fetch data.</h3>";

    }

}

function bookTrip() {

    let name =
    document.getElementById("name").value;

    let email =
    document.getElementById("email").value;

    let destination =
    document.getElementById("destination").value;
    let dateValue = document.getElementById("date").value;

let date = "";

if(dateValue != ""){
    date = new Date(dateValue).toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
    });
}
let people = document.getElementById("people").value;
let bookingId = "GE" + Math.floor(Math.random()*100000);
let bookingDate = new Date().toLocaleString('en-IN', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
});
if(name=="" || email=="" || destination=="" || date=="" || people==""){

alert("Please fill all the fields.");

return;

}

    localStorage.setItem("travelerName", name);

    localStorage.setItem("travelerEmail", email);

    localStorage.setItem("travelerDestination", destination);
    localStorage.setItem("travelDate", date);

localStorage.setItem("travelPeople", people);

    document.getElementById("bookingDetails").innerHTML =

"<h2>✅ Booking Confirmed!</h2>"+
"<p><b>Booking ID:</b> <span style='color:#008080;font-size:18px;font-weight:bold;'>"+bookingId+"</span></p>"+
"<p><b>Booking Date:</b> "+bookingDate+"</p>"+
"<p><b>Name:</b> "+name+"</p>"+

"<p><b>Email:</b> "+email+"</p>"+

"<p><b>Destination:</b> "+destination+"</p>"+

"<p><b>Date:</b> "+date+"</p>"+

"<p><b>Travelers:</b> "+people+"</p>"+

"<p>🎉 Thank you for choosing Travel Nest!</p>"+
"<p>We wish you a safe, happy, and memorable journey. ✈️</p>"+
"<p>📧 A confirmation has been sent to your registered email.</p>";

    setTimeout(function(){

alert("Booking Submitted Successfully!");

},300);

}
function showPackage(){

let destination =
document.getElementById("destination").value.toLowerCase();

let packageInfo =
travelPackages[destination];


if(!packageInfo){

packageInfo = {

price:"₹21,999",

days:"4 Days / 3 Nights",

hotel:"Elite resort",

rating:"4.7/5"

};

}
document.getElementById("packagePreview").innerHTML=`

<div class="card">

<h3>Selected Package</h3>

<p>💰 ${packageInfo.price}</p>

<p>⏳ ${packageInfo.days}</p>

<p>🏨 ${packageInfo.hotel}</p>

<p>⭐ ${packageInfo.rating}</p>

<hr>

<h4>Package Includes</h4>

<p>✔ Hotel Stay</p>

<p>✔ Breakfast</p>

<p>✔ Airport Pickup</p>

<p>✔ Local Sightseeing</p>

<p>✔ Tour Guide</p>

</div>

`;

}
