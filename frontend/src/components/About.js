import React from 'react';
import aboutImage from "../assest/store.jpg";
import dress from '../assest/dress.jpg'
export default function About() {
  return (
    <div>
      <section className="bg-gray-100 text-justify">
        <div className="container mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8">
            <div className="max-w-lg">
              <h2 className="text-3xl font-extrabold text-blue-950 sm:text-4xl">
                About Us
              </h2>
              <p className="mt-4 text-gray-600 text-lg justify-between">
                Welcome to Orange Garments, located in the vibrant town of Komarapalayam in Namakkal, Tamil Nadu. We are dedicated to bringing you the best in style and comfort at unbeatable prices.
              </p>
            </div>
            <div className="mt-0 md:mt-0">
              <img
                src={aboutImage}
                alt="About Us Image"
                className="object-cover rounded-lg shadow-md"
              />
            </div>
          </div>
        </div>
        <article className="container mx-auto py-16 px-4 sm:px-6 lg:px-0">
          <header className="page-masthead"></header>
          <div className="page-content rte text-gray-600 text-lg">
            <div className="container mx-auto py-16 px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8">
                <div className="max-w-lg">
                  <h2 className="text-3xl font-extrabold text-blue-950 sm:text-4xl">
                    Our Story
                  </h2>
                  <p className="mt-4 text-gray-600 text-lg">
                    Established with a vision to revolutionize the local fashion market, Orange Garments has grown from a small family-owned shop to a beloved brand known for its diverse range of clothing. Our founder's passion for fashion and commitment to quality has driven us to continuously improve and expand our offerings.
                  </p>
                </div>
                <div className="mt-12 md:mt-0">
                  <img
                    src={dress}
                    alt="About Us Image"
                    className="object-cover rounded-lg shadow-md"
                  />
                </div>
              </div>
            </div>

            <div className="mb-8 text-justify mx-7 space-y-5">
              <p>
                <strong className=" text-blue-950">
                  <em>Our Offerings:</em>
                </strong>{" "}
                At Orange Garments, we believe that everyone deserves to look and feel their best, regardless of budget. Our collections are thoughtfully curated to provide stylish, high-quality clothing options for the entire family. Our product range includes shirts, pants, T-shirts, chudidhar, sarees, and wedding dresses.
              </p>
              <p>
                <strong className=" text-blue-950">
                  <em>Quality and Affordability:</em>
                </strong>{" "}
                Quality is at the heart of everything we do. Each piece of clothing at Orange Garments undergoes strict quality checks to ensure it meets our high standards. We source the finest fabrics and employ skilled artisans to create clothing that not only looks good but feels good to wear. Our commitment to affordability means that you can enjoy premium quality without the premium price tag.
              </p>
              <p>
                <strong className=" text-blue-950">
                  <em>Our Vision:</em>
                </strong>{" "}
                We aim to continue growing and evolving, bringing new styles and collections to our customers. Our vision is to become a household name in the fashion industry, known for our dedication to quality, affordability, and customer satisfaction.
              </p>
              <p>
                <strong className=" text-blue-950">
                  <em>Customer Satisfaction:</em>
                </strong>{" "}
                Our customers are our greatest asset, and their satisfaction is our top priority. We strive to provide an exceptional shopping experience, both in-store and online. Our friendly and knowledgeable staff are always ready to assist you with your fashion needs and ensure you find exactly what you're looking for.
              </p>
            </div>
            <p className="mb-8 mx-7">
              <strong className=" text-blue-950">Visit Us:</strong>
            </p>
            <div className="mb-8 mx-7 space-y-4">
              <p>
                Come visit us at Orange Garments in Komarapalayam, Namakkal, Tamil Nadu. Discover our latest collections and experience the best in fashion at unbeatable prices. We look forward to welcoming you and helping you find your perfect outfit.
              </p>
              <p>
                <strong className=" text-blue-950">
                  <em>Connect With Us:</em>
                </strong>{" "}
                Stay connected with us on social media and be the first to know about our new arrivals, special offers, and events. Follow us on <a href="#" className="text-blue-500">Facebook</a>, <a href="#" className="text-blue-500">Instagram</a>, and <a href="#" className="text-blue-500">Twitter</a>.
              </p>
            </div>
            <div className="mb-8  mx-7 space-y-4">
              <p>Thank you for choosing Orange Garments. We are excited to be a part of your fashion journey!</p>
            </div>
          </div>
        </article>
      </section>
    </div>
  );
}