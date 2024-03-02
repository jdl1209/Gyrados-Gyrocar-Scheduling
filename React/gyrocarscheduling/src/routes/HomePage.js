import React from "react";

function HomePage() {
    return (
        <div className="homepage">
            <section class="header">

                <nav>
                    <a href="homepage.js"><img src={require("../images/logo.png")} alt="test" id="logo"/></a>

                </nav>
                <div class="text-box">

                    <h1>It's easy.</h1>
                    <h1>It's convenient.</h1>
                    <h1>It's cost effective.</h1>
                    <h1>It's GyroGoGo!.</h1>
                        <br></br>
                        <br></br> <br></br>
                       
                        <br></br>
            
                <a href="" class="join-btn">Apply Now</a>
                </div>

            </section>

        <section class="services">
            <h1>Why a Gyrocar?</h1>
            <p>
                Arrive at your destination in comfort and looking professional regardless of the weather.
                Navigate city traffic with ease. Parking is a breeze.
            </p>

            <div class="row">
                <div class="services-col">
                    <h3>Convenient Transportation Solutions</h3>
                    <p>
                    Five convenient locations for pick up and drop off!
                    The bus and the subway just aren't going to work. Light deliveries are a piece of cake with GyroGoGo!
                    When the bus line is a mile away, enjoy door to door transportation to your destination.
                    </p>
                </div>   

                <div class="services-col">
                    <h3>Affordable and Environmentally Friendly</h3>
                    <p>
                    Gyrocars are authorized to park in designated motorcycle spaces.
                    Save money! Renting an environmentally friendly gyrocar as needed is far more cost-effective than commuting in 
                    an automobile that you own and maintain.
                    </p>
                </div>   

                <div class="services-col">
                    <h3>Luxurious and Hassle-Free Commuting</h3>
                    <p>
                    Yes, jogging or biking to work may be healthy, but how do you look (and smell!) on arrival?
                    Do you really want to risk your high-end auto in traffic like this?.
                    </p>
                </div>   



            </div>

        </section>
            

        </div>
    );
}

export default HomePage;