
import React from 'react';

const page = () => {
  return (
    <main className="contain mx-auto my-8 p-4">
      <section className="mb-8">
        <h1 className="text-3xl font-bold mb-4">About Kedvis Mart</h1>
        <p className="text-lg">
          Welcome to Kedvis Mart, an innovative AI-assisted e-commerce platform designed to make your online shopping experience seamless and efficient. Built with the latest technologies like Next.js for the front-end and Commerce.js for the backend, Kedvis Mart leverages the power of AI to provide a unique voice-command feature that allows users to interact with the platform effortlessly.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">How It Works</h2>
        <h3 className="text-xl font-semibold mb-2">Voice Command Integration</h3>
        <p className="text-lg mb-4">
          The standout feature of Kedvis Mart is the Conversational AI integration, which brings voice command capabilities to the platform. This means you can use your voice to search for products, add items to your cart, proceed to checkout, and inquire about various aspects of the platform. This hands-free approach makes shopping easier and more accessible.
        </p>

        <h3 className="text-xl font-semibold mb-2">Searching for Products</h3>
        <p className="text-lg mb-4">
          With the AI, you can simply speak your search queries. For example, say "Search for wrist watch" and Kedvis Mart will display the relevant products. This feature eliminates the need for typing and makes product discovery faster and more convenient.
        </p>

        <h3 className="text-xl font-semibold mb-2">Adding Items to Cart</h3>
        <p className="text-lg mb-4">
          Adding products to your cart is as easy as saying "Add to my cart". The app will confirm the addition and you can continue browsing or proceed to checkout.
        </p>

        <h3 className="text-xl font-semibold mb-2">Checkout Process</h3>
        <p className="text-lg mb-4">
          When you're ready to purchase, you can use voice commands to initiate the checkout process. Commands like "Checkout my cart" will guide you through the steps needed to complete your purchase, making the process smooth and efficient.
        </p>

        <h3 className="text-xl font-semibold mb-2">Platform Inquiries</h3>
        <p className="text-lg mb-4">
          If you have any questions about Kedvis Mart, such as how it works or what features are available, just ask the AI. For example, you can say "What is Kedvis Mart?" or "How does this platform work?" and receive immediate answers.
        </p>
      </section>
    </main>
  );
};

export default page;
