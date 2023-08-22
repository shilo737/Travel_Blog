import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaPlaneDeparture } from "react-icons/fa";
const SendEmail = () => {

  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [open4, setOpen4] = useState(false);
  const [open5, setOpen5] = useState(false);
  const [open6, setOpen6] = useState(false);
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();
    emailjs
      .sendForm(
        "service_sg14fys",
        "template_040uear",
        form.current,
        "-IYulyV6uMc7Y5qy4"
      )
      .then(
        (result) => {
          console.log(result.text);
          console.log("message send");
          toast.success("The email has been sent!", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: true,
            theme: "colored",
          });
        },
        (error) => {
          console.log(error.text);
        }
      );
  };


  return (
    <div className="container mt-10">
      <div className="Questions">
      <div>
        <img
          src="https://i.ibb.co/DQ4FZhL/pattern-bg.png"
          alt="blue pattern background"
          className="absolute h-64 md:h-96 w-5/6 object-center object-fit z-0"
        />
        <div className="relative flex flex-col items-center justify-center sm:px-0 px-6 z-20 pb-32">
          <div className="md:py-36 py-20">
            <h1
              role="heading"
              className="xl:text-6xl md:text-5xl text-xl font-bold leading-10 text-white"
            >
              Frequently asked questions
            </h1>
          </div>
        </div>
      </div>
        <div>
          <div className="w-full mx-auto ">
          
            <hr className=" w-full lg:mt-2 md:mt-12 md:mb-8 my-8" />

            <div className="w-full md:px-6 text-white ">
              <div
                id="mainHeading"
                className="flex justify-between items-center w-full"
              >
                <div className=" ">
                  <p className="flex justify-center items-center font-medium text-base leading-6 md:leading-4">
                    {" "}
                    <span className="  lg:mr-6 mr-4 lg:text-2xl md:text-xl text-lg leading-6 md:leading-5 lg:leading-4 font-semibold">
                      Q1.
                    </span>{" "}
                    What’s your favorite place to travel?
                  </p>
                </div>
                <button
                  aria-label="toggler"
                  className=" focus:outline-none focus:ring-2  focus:ring-gray-200"
                  onClick={() => setOpen(!open)}
                >
                  <svg
                    className={
                      "transform " + (open ? "rotate-180" : "rotate-0")
                    }
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6 9L12 15L18 9"
                      stroke="white"
                      strokeWidth="1.33333"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
              <div
                id="menu"
                className={"mt-6 w-full " + (open ? "block" : "hidden")}
              >
                <p className="text-base leading-6  font-normal">
                  {" "}
                  South America is a diverse continent with attractions like
                  Machu Picchu in Peru, the Amazon Rainforest, the Iguazu Falls
                  on the Argentina-Brazil border, and vibrant cities like Buenos
                  Aires and Rio de Janeiro. It offers adventure, cultural
                  experiences, and stunning natural beauty. Don't miss trying
                  ceviche in Peru or feijoada in Brazil, two delicious local
                  dishes. South America is a destination that will leave you
                  with unforgettable memories.
                </p>
              </div>
            </div>

            {/* <!-- Question 2 --> */}

            <hr className=" w-full lg:mt-10 my-8 " />

            <div className="w-full md:px-6 text-white">
              <div
                id="mainHeading"
                className="flex justify-between items-center w-full"
              >
                <div className="">
                  <p className="flex justify-center items-center font-medium text-base leading-6 lg:leading-4 ">
                    {" "}
                    <span className="  lg:mr-6 mr-4 lg:text-2xl md:text-xl text-lg leading-6 md:leading-5 lg:leading-4 font-semibold ">
                      Q2.
                    </span>{" "}
                    How can I find the best deals on flights and accommodations
                    for my vacation?
                  </p>
                </div>
                <button
                  aria-label="toggler"
                  className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800"
                  onClick={() => setOpen2(!open2)}
                >
                  <svg
                    className={
                      "transform " + (open2 ? "rotate-180" : "rotate-0")
                    }
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6 9L12 15L18 9"
                      stroke="white"
                      strokeWidth="1.33333"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
              <div
                id="menu"
                className={"mt-6 w-full " + (open2 ? "block" : "hidden")}
              >
                <div className="text-base leading-6  font-normal">
                  <ul>
                    <li>Be flexible with travel dates.</li>
                    <li>Use flight and hotel comparison websites.</li>
                    <li>Set up fare alerts</li>
                    <li>Consider alternative airports and accommodations.</li>
                    <li>Book in advance or look for last-minute deals</li>
                    <li>
                      Take advantage of loyalty programs and travel rewards.
                    </li>
                    <li>
                      Bundle flights and accommodations for potential savings.
                    </li>
                    <li>
                      Explore different booking channels and compare prices
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* <!-- Question 3 --> */}

            <hr className=" w-full lg:mt-10 my-8" />

            <div className="w-full md:px-6 text-white">
              <div
                id="mainHeading"
                className="flex justify-between items-center w-full"
              >
                <div className="">
                  <p className="flex justify-center items-center font-medium text-base leading-6 lg:leading-4 ">
                    {" "}
                    <span className="  lg:mr-6 mr-4 lg:text-2xl md:text-xl text-lg leading-6 md:leading-5 lg:leading-4 font-semibold ">
                      Q3.
                    </span>
                    Is it safe to travel the world?
                  </p>
                </div>
                <button
                  aria-label="toggler"
                  className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800"
                  onClick={() => setOpen3(!open3)}
                >
                  <svg
                    className={
                      "transform " + (open ? "rotate-180" : "rotate-0")
                    }
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6 9L12 15L18 9"
                      stroke="white"
                      strokeWidth="1.33333"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
              <div
                id="menu"
                className={"mt-6 w-full " + (open3 ? "block" : "hidden")}
              >
                <p className="text-base leading-6  font-normal">
                  {" "}
                  Nowadays, the thought doesn't really cross my mind. I don't
                  think a life of world travel is as risky as it may sound on
                  the outside, but even if it is, I'm still okay with that. I've
                  had plenty of questionable moments in my travels, but I know
                  this: life is meant to be lived. I could never spend my days
                  in an office cubicle. I was given a body, a mind, and a thirst
                  for adventure, and I can't not use it. If you're afraid to
                  live your life because you might die, then you've already
                  died.
                </p>
              </div>
            </div>

            {/* <!-- Question 4 --> */}

            <hr className=" w-full lg:mt-10 my-8" />

            <div className="w-full md:px-6 text-white ">
              <div
                id="mainHeading"
                className="flex justify-between items-center w-full"
              >
                <div className="">
                  <p className="flex justify-center items-center font-medium text-base leading-6 lg:leading-4 ">
                    {" "}
                    <span className="  lg:mr-6 mr-4 lg:text-2xl md:text-xl text-lg leading-6 md:leading-5 lg:leading-4 font-semibold ">
                      Q4.
                    </span>
                    Where do you book hotels?
                  </p>
                </div>
                <button
                  aria-label="toggler"
                  className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800"
                  onClick={() => setOpen4(!open4)}
                >
                  <svg
                    className={
                      "transform " + (open4 ? "rotate-180" : "rotate-0")
                    }
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6 9L12 15L18 9"
                      stroke="white"
                      strokeWidth="1.33333"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
              <div
                id="menu"
                className={"mt-6 w-full " + (open4 ? "block" : "hidden")}
              >
                <div className="text-base leading-6  font-normal">
                  <ul>
                    <li>Booking.com , Hotels.com , Agoda , TripAdvisor .</li>
                    <li>
                      Airbnb (offers various types of accommodations,including
                      hotels)
                    </li>
                    <li>
                      These platforms provide a wide range of options, including
                      different hotel types, price ranges, and user reviews to
                      help you make informed decisions. It's a good practice to
                      compare prices and read reviews from multiple sources
                      before making a booking. Additionally, some hotel chains
                      have their own websites where you can directly book
                      accommodations if you have a preference for a specific
                      brand.
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* <!-- Question 5 --> */}

            <hr className=" w-full lg:mt-10 my-8" />

            <div className="w-full md:px-6 text-white">
              <div
                id="mainHeading"
                className="flex justify-between items-center w-full"
              >
                <div className="">
                  <p className="flex justify-center items-center font-medium text-base leading-6 lg:leading-4 ">
                    {" "}
                    <span className="  lg:mr-6 mr-4 lg:text-2xl md:text-xl text-lg leading-6 md:leading-5 lg:leading-4 font-semibold ">
                      Q5.
                    </span>
                    Are there any guided tours or travel packages available for
                    exploring?
                  </p>
                </div>
                <button
                  aria-label="toggler"
                  className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800"
                  onClick={() => setOpen5(!open5)}
                >
                  <svg
                    className={
                      "transform " + (open5 ? "rotate-180" : "rotate-0")
                    }
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6 9L12 15L18 9"
                      stroke="white"
                      strokeWidth="1.33333"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
              <div
                id="menu"
                className={"mt-6 w-full " + (open5 ? "block" : "hidden")}
              >
                <p className="text-base leading-6  font-normal">
                  Yes, there are numerous guided tours and travel packages
                  available for exploring various destinations around the world.
                  These tours and packages can offer convenient and organized
                  travel experiences, often including transportation,
                  accommodations, meals, and guided activities. To find guided
                  tours and travel packages, you can search on travel agency
                  websites, tour operator websites, or use specialized platforms
                  that offer a wide range of tour options.
                </p>
              </div>
            </div>

            <hr className=" w-full lg:mt-10 my-8" />

            <div className="w-full md:px-6 text-white ">
              <div
                id="mainHeading"
                className="flex justify-between items-center w-full"
              >
                <div className="">
                  <p className="flex justify-center items-center font-medium text-base leading-6 lg:leading-4 ">
                    {" "}
                    <span className="  lg:mr-6 mr-4 lg:text-2xl md:text-xl text-lg leading-6 md:leading-5 lg:leading-4 font-semibold ">
                      Q6.
                    </span>
                    How can I find cheap flights?
                  </p>
                </div>
                <button
                  aria-label="toggler"
                  className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800"
                  onClick={() => setOpen6(!open6)}
                >
                  <svg
                    className={
                      "transform " + (open6 ? "rotate-180" : "rotate-0")
                    }
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6 9L12 15L18 9"
                      stroke="white"
                      strokeWidth="1.33333"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
              <div
                id="menu"
                className={"mt-6 w-full " + (open6 ? "block" : "hidden")}
              >
                <div className="text-base leading-6  font-normal">
                  Be flexible with your travel dates: Prices can vary
                  significantly depending on the day and time of your departure.
                  Consider flying during weekdays or off-peak seasons when
                  prices tend to be lower , Use flight comparison websites:
                  Utilize flight search engines such as Skyscanner, Kayak,
                  Google Flights, or Momondo. These platforms compare prices
                  across multiple airlines and provide options to find the best
                  deals <br />
                  Remember, prices are subject to change, and it's important to
                  compare options and read the terms and conditions before
                  making any bookings. Additionally, consider factors such as
                  baggage fees, travel insurance, and the overall convenience
                  and comfort of the flight when evaluating the value of a fare.
                </div>
              </div>
            </div>

            <hr className=" w-full lg:mt-10 my-8" />
          </div>
        </div>
      </div>
      <main id="content" role="main" className="w-full  mx-auto p-8">
        
        <div className="mt-7 bg-white rounded-xl shadow-lg mt-24 bg-gradient-to-br from-cyan-700 to-indigo-700">
          <div className="p-4 sm:p-7">
            <div className="text-center">
              <h1 className="block text-2xl font-bold  dark:text-white">
              Send an email
              </h1>
              <p className="mt-2 text-sm  dark:text-gray-400">
                We will be happy to help you with any questions
              </p>
            </div>

            <div className="mt-5 text-black font-bold">
              <form ref={form} onSubmit={sendEmail}>
                <div className="grid gap-y-4">
                  <div>
                    <label className="block text-sm font-bold ml-1 mb-2 dark:text-white">
                      Full name
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="user_name"
                        name="user_name"
                        className="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm bg-white shadow-sm"
                        required
                        aria-describedby="email-error"
                      />
                    </div>
                    <p
                      className="hidden text-xs text-red-600 mt-2"
                      id="user_name"
                    >
                      Please include a valid full name so we can get back to you
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-bold ml-1 mb-2 dark:text-white">
                      Email address
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm  bg-white shadow-sm"
                        required
                        aria-describedby="email-error"
                      />
                    </div>
                    <p
                      className="hidden text-xs text-red-600 mt-2"
                      id="email-error"
                    >
                      Please include a valid email address so we can get back to
                      you
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-bold ml-1 mb-2 dark:text-white">
                      Message
                    </label>
                    <div className="relative">
                      <textarea
                        rows="6"
                        type="text"
                        id="message"
                        name="message"
                        className="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm bg-white shadow-sm"
                        required
                        aria-describedby="email-error"
                      ></textarea>
                    </div>
                    <p
                      className="hidden text-xs text-red-600 mt-2"
                      id="Message"
                    >
                      Please include a valid Message so we can get back to you
                    </p>
                  </div>

                  <button
                    type="submit"
                    value="Send"
                    className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
                  >
                    Send Email
                  </button>
                </div>
              </form>
              <ToastContainer />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SendEmail;
