"use client";
import { triggerEdgeDrawerRight } from "@/packages/tailwindcss-jun-layout";
import { ShoppingCart } from "lucide-react";

export default function EcommerceExample() {
  return (
    <div className="jun-layout">
      <header className="jun-header">
        <Header />
      </header>
      <main className="jun-content container">
        <button
          className="fixed top-4 right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-black text-white shadow-lg lg:hidden"
          aria-label="Open Cart"
          onClick={() => triggerEdgeDrawerRight()}
        >
          <ShoppingCart />
        </button>
        <div className="p-4 pl-0 hidden lg:block">
          <CartList />
        </div>
        <aside className="jun-insetSidebar jun-insetSidebar-fixed jun-insetSidebar-w-[calc(100vw-2rem)] sm:jun-insetSidebar-w-[calc(100vw-4rem)] lg:jun-insetSidebar-w-[400px]">
          <div className="jun-insetContent">
            <CheckoutForm />
          </div>
        </aside>
      </main>
      <div className="jun-edgeSidebar jun-edgeSidebarR jun-edgeSidebarR-drawer jun-edgeSidebarR-w-[370px] lg:jun-edgeSidebarR-permanent lg:jun-edgeSidebarR-permanent-hidden">
        <div className="jun-edgeContent bg-white">
          <div className="p-4">
            <CartList />
          </div>
        </div>
      </div>
    </div>
  );
}

const Header = () => {
  return (
    <div className="container flex justify-between">
      <div className="flex items-center space-x-4 px-4">
        <h1 className="text-2xl font-bold">Shop</h1>
        <nav className="hidden space-x-4 md:flex">
          <a href="#" className="hover:text-gray-600">
            Home
          </a>
          <a href="#" className="hover:text-gray-600">
            Products
          </a>
          <a href="#" className="hover:text-gray-600">
            Categories
          </a>
        </nav>
      </div>
      <div className="flex items-center space-x-4">
        <input
          type="search"
          placeholder="Search"
          className="p-2 rounded bg-neutral-100"
        />
        <button className="p-2">Cart (3)</button>
      </div>
    </div>
  );
};

interface CartItemProps {
  name: string;
  price: number;
  quantity: number;
  image: string;
}

const CartItem = ({ name, price, quantity, image }: CartItemProps) => {
  return (
    <div className="flex items-center justify-between border-b p-4">
      <div className="flex items-center space-x-4">
        <img
          src={image}
          alt={name}
          className="h-16 w-16 rounded-md object-cover"
        />
        <div>
          <h3 className="font-medium">{name}</h3>
          <p className="text-gray-600">${price}</p>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <button className="px-2">-</button>
        <span>{quantity}</span>
        <button className="px-2">+</button>
      </div>
    </div>
  );
};

const CartList = () => {
  const items = [
    {
      name: "Product 1",
      price: 99.99,
      quantity: 1,
      image: "https://picsum.photos/seed/prod1/200",
    },
    {
      name: "Product 2",
      price: 149.99,
      quantity: 2,
      image: "https://picsum.photos/seed/prod2/200",
    },
    {
      name: "Product 3",
      price: 79.99,
      quantity: 1,
      image: "https://picsum.photos/seed/prod3/200",
    },
    {
      name: "Product 4",
      price: 199.99,
      quantity: 1,
      image: "https://picsum.photos/seed/prod4/200",
    },
    {
      name: "Product 5",
      price: 49.99,
      quantity: 3,
      image: "https://picsum.photos/seed/prod5/200",
    },
    {
      name: "Product 6",
      price: 299.99,
      quantity: 1,
      image: "https://picsum.photos/seed/prod6/200",
    },
    {
      name: "Product 7",
      price: 129.99,
      quantity: 2,
      image: "https://picsum.photos/seed/prod7/200",
    },
    {
      name: "Product 8",
      price: 89.99,
      quantity: 1,
      image: "https://picsum.photos/seed/prod8/200",
    },
    {
      name: "Product 9",
      price: 159.99,
      quantity: 1,
      image: "https://picsum.photos/seed/prod9/200",
    },
    {
      name: "Product 10",
      price: 249.99,
      quantity: 1,
      image: "https://picsum.photos/seed/prod10/200",
    },
    {
      name: "Product 11",
      price: 69.99,
      quantity: 2,
      image: "https://picsum.photos/seed/prod11/200",
    },
    {
      name: "Product 12",
      price: 179.99,
      quantity: 1,
      image: "https://picsum.photos/seed/prod12/200",
    },
    {
      name: "Product 13",
      price: 139.99,
      quantity: 1,
      image: "https://picsum.photos/seed/prod13/200",
    },
    {
      name: "Product 14",
      price: 219.99,
      quantity: 1,
      image: "https://picsum.photos/seed/prod14/200",
    },
    {
      name: "Product 15",
      price: 59.99,
      quantity: 3,
      image: "https://picsum.photos/seed/prod15/200",
    },
    {
      name: "Product 16",
      price: 169.99,
      quantity: 1,
      image: "https://picsum.photos/seed/prod16/200",
    },
    {
      name: "Product 17",
      price: 109.99,
      quantity: 2,
      image: "https://picsum.photos/seed/prod17/200",
    },
    {
      name: "Product 18",
      price: 239.99,
      quantity: 1,
      image: "https://picsum.photos/seed/prod18/200",
    },
    {
      name: "Product 19",
      price: 189.99,
      quantity: 1,
      image: "https://picsum.photos/seed/prod19/200",
    },
    {
      name: "Product 20",
      price: 149.99,
      quantity: 1,
      image: "https://picsum.photos/seed/prod20/200",
    },
    {
      name: "Product 21",
      price: 119.99,
      quantity: 2,
      image: "https://picsum.photos/seed/prod21/200",
    },
    {
      name: "Product 22",
      price: 259.99,
      quantity: 1,
      image: "https://picsum.photos/seed/prod22/200",
    },
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Shopping Cart</h2>
      {items.map((item, i) => (
        <CartItem key={i} {...item} />
      ))}
    </div>
  );
};

const CheckoutForm = () => {
  return (
    <form className="space-y-6 p-4 flex flex-col h-full">
      <h2 className="text-xl font-semibold">Checkout</h2>

      <div className="min-h-0 overflow-auto overscroll-contain flex flex-col gap-4">
        {/* Contact Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Contact Information</h3>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              className="w-full rounded border p-2"
              placeholder="your@email.com"
              required
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Phone
            </label>
            <input
              type="tel"
              className="w-full rounded border p-2"
              placeholder="+1 (555) 000-0000"
              required
            />
          </div>
        </div>

        {/* Shipping Address */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Shipping Address</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                First Name
              </label>
              <input
                type="text"
                className="w-full rounded border p-2"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Last Name
              </label>
              <input
                type="text"
                className="w-full rounded border p-2"
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Address
            </label>
            <input
              type="text"
              className="w-full rounded border p-2"
              placeholder="Street address"
              required
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Apartment, suite, etc.
            </label>
            <input type="text" className="w-full rounded border p-2" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                City
              </label>
              <input
                type="text"
                className="w-full rounded border p-2"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                State
              </label>
              <input
                type="text"
                className="w-full rounded border p-2"
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                ZIP Code
              </label>
              <input
                type="text"
                className="w-full rounded border p-2"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Country
              </label>
              <select className="w-full rounded border p-2" required>
                <option value="US">United States</option>
                <option value="CA">Canada</option>
                <option value="UK">United Kingdom</option>
              </select>
            </div>
          </div>
        </div>

        {/* Payment Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Payment Details</h3>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Card Number
            </label>
            <input
              type="text"
              className="w-full rounded border p-2"
              placeholder="1234 5678 9012 3456"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Expiration Date
              </label>
              <input
                type="text"
                className="w-full rounded border p-2"
                placeholder="MM/YY"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                CVV
              </label>
              <input
                type="text"
                className="w-full rounded border p-2"
                placeholder="123"
                required
              />
            </div>
          </div>
        </div>
      </div>

      {/* Order Summary */}
      <div className="space-y-4 rounded-lg bg-gray-50 p-4">
        <h3 className="text-lg font-medium">Order Summary</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>$899.94</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span>$9.99</span>
          </div>
          <div className="flex justify-between">
            <span>Tax</span>
            <span>$89.99</span>
          </div>
          <div className="flex justify-between border-t pt-2 text-base font-medium">
            <span>Total</span>
            <span>$999.92</span>
          </div>
        </div>
      </div>

      <button className="w-full rounded bg-black p-3 text-white transition-colors hover:bg-gray-800">
        Place Order
      </button>
    </form>
  );
};
