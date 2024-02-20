import React from "react";

function HomePage() {
    return (
        <div className="homepage">
            <h1>HomePage</h1>

            <p>Rent an easy-to-drive gyrocar for your local commuting needs.
                Become a GyroGoGo member and enjoy the very best way to get around town!

                Text that can be used with optional photos on Home or About page:
                Arrive at your destination in comfort and looking professional regardless of the weather.
                Navigate city traffic with ease. Parking is a breeze.
                Five convenient locations for pick up and drop off!
                Gyrocars are authorized to park in designated motorcycle spaces.
                Save money! Renting an environmentally friendly gyrocar as needed is far more cost effective than commuting in an automobile that you own and maintain.
                The bus and the subway just aren't going to work. Light deliveries are a piece of cake with GyroGoGo!
                When the bus line is a mile away, enjoy door to door transportation to your destination.
                Yes, jogging or biking to work may be healthy, but how do you look (and smell!) on arrival?
                Do you really want to risk your high end auto in traffic like this?

                
            </p>

            <img
                src={require("../images/gyrogogomaps.png")}
                alt="test"
            />
        </div>
    );
}

export default HomePage;