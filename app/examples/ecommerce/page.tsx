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
        <div className="jun-edgeContent bg-white dark:bg-gray-900">
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
        <div className="h-8 w-20 rounded-md bg-gray-300 dark:bg-gray-700" />
        <nav className="hidden space-x-4 md:flex">
          <div className="h-4 w-12 rounded-md bg-gray-200 dark:bg-gray-800" />
          <div className="h-4 w-16 rounded-md bg-gray-200 dark:bg-gray-800" />
          <div className="h-4 w-20 rounded-md bg-gray-200 dark:bg-gray-800" />
        </nav>
      </div>
      <div className="flex items-center space-x-4">
        <div className="h-10 w-32 rounded-md bg-neutral-100 dark:bg-gray-800" />
        <div className="h-10 w-20 rounded-md bg-gray-200 dark:bg-gray-800" />
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

const CartItem = () => {
  return (
    <div className="flex items-center justify-between border-b dark:border-gray-700 p-4">
      <div className="flex items-center space-x-4">
        <div className="h-16 w-16 rounded-md bg-gray-200 dark:bg-gray-800" />
        <div>
          <div className="h-5 w-24 rounded-md bg-gray-300 dark:bg-gray-700" />
          <div className="h-4 w-16 mt-1 rounded-md bg-gray-200 dark:bg-gray-800" />
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <div className="h-8 w-8 rounded-md bg-gray-200 dark:bg-gray-800" />
        <div className="h-4 w-4 rounded-md bg-gray-300 dark:bg-gray-700" />
        <div className="h-8 w-8 rounded-md bg-gray-200 dark:bg-gray-800" />
      </div>
    </div>
  );
};

const CartList = () => {
  return (
    <div className="space-y-4">
      <div className="h-7 w-36 rounded-md bg-gray-300 dark:bg-gray-700" />
      {[...Array(24)].map((_, i) => (
        <CartItem key={i} />
      ))}
    </div>
  );
};

const CheckoutForm = () => {
  return (
    <form className="space-y-6 p-4 flex flex-col h-full">
      <div className="h-7 w-28 rounded-md bg-gray-300 dark:bg-gray-700" />

      <div className="min-h-0 overflow-auto overscroll-contain flex flex-col gap-4">
        {/* Contact Information */}
        <div className="space-y-4">
          <div className="h-6 w-40 rounded-md bg-gray-300 dark:bg-gray-700" />
          <div className="space-y-2">
            <div className="h-4 w-12 rounded-md bg-gray-200 dark:bg-gray-800" />
            <div className="h-10 w-full rounded-md bg-gray-100 dark:bg-gray-800" />
          </div>
          <div className="space-y-2">
            <div className="h-4 w-12 rounded-md bg-gray-200 dark:bg-gray-800" />
            <div className="h-10 w-full rounded-md bg-gray-100 dark:bg-gray-800" />
          </div>
        </div>

        {/* Shipping Address */}
        <div className="space-y-4">
          <div className="h-6 w-36 rounded-md bg-gray-300 dark:bg-gray-700" />
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="h-4 w-20 rounded-md bg-gray-200 dark:bg-gray-800" />
              <div className="h-10 w-full rounded-md bg-gray-100 dark:bg-gray-800" />
            </div>
            <div className="space-y-2">
              <div className="h-4 w-20 rounded-md bg-gray-200 dark:bg-gray-800" />
              <div className="h-10 w-full rounded-md bg-gray-100 dark:bg-gray-800" />
            </div>
          </div>
          <div className="space-y-2">
            <div className="h-4 w-16 rounded-md bg-gray-200 dark:bg-gray-800" />
            <div className="h-10 w-full rounded-md bg-gray-100 dark:bg-gray-800" />
          </div>
          <div className="space-y-2">
            <div className="h-4 w-40 rounded-md bg-gray-200 dark:bg-gray-800" />
            <div className="h-10 w-full rounded-md bg-gray-100 dark:bg-gray-800" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="h-4 w-8 rounded-md bg-gray-200 dark:bg-gray-800" />
              <div className="h-10 w-full rounded-md bg-gray-100 dark:bg-gray-800" />
            </div>
            <div className="space-y-2">
              <div className="h-4 w-12 rounded-md bg-gray-200 dark:bg-gray-800" />
              <div className="h-10 w-full rounded-md bg-gray-100 dark:bg-gray-800" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="h-4 w-20 rounded-md bg-gray-200 dark:bg-gray-800" />
              <div className="h-10 w-full rounded-md bg-gray-100 dark:bg-gray-800" />
            </div>
            <div className="space-y-2">
              <div className="h-4 w-16 rounded-md bg-gray-200 dark:bg-gray-800" />
              <div className="h-10 w-full rounded-md bg-gray-100 dark:bg-gray-800" />
            </div>
          </div>
        </div>

        {/* Payment Information */}
        <div className="space-y-4">
          <div className="h-6 w-32 rounded-md bg-gray-300 dark:bg-gray-700" />
          <div className="space-y-2">
            <div className="h-4 w-24 rounded-md bg-gray-200 dark:bg-gray-800" />
            <div className="h-10 w-full rounded-md bg-gray-100 dark:bg-gray-800" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="h-4 w-28 rounded-md bg-gray-200 dark:bg-gray-800" />
              <div className="h-10 w-full rounded-md bg-gray-100 dark:bg-gray-800" />
            </div>
            <div className="space-y-2">
              <div className="h-4 w-8 rounded-md bg-gray-200 dark:bg-gray-800" />
              <div className="h-10 w-full rounded-md bg-gray-100 dark:bg-gray-800" />
            </div>
          </div>
        </div>
      </div>

      {/* Order Summary */}
      <div className="space-y-4 rounded-lg bg-gray-50 dark:bg-gray-800 p-4">
        <div className="h-6 w-32 rounded-md bg-gray-300 dark:bg-gray-700" />
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <div className="h-4 w-16 rounded-md bg-gray-200 dark:bg-gray-700" />
            <div className="h-4 w-16 rounded-md bg-gray-200 dark:bg-gray-700" />
          </div>
          <div className="flex justify-between">
            <div className="h-4 w-16 rounded-md bg-gray-200 dark:bg-gray-700" />
            <div className="h-4 w-12 rounded-md bg-gray-200 dark:bg-gray-700" />
          </div>
          <div className="flex justify-between">
            <div className="h-4 w-8 rounded-md bg-gray-200 dark:bg-gray-700" />
            <div className="h-4 w-14 rounded-md bg-gray-200 dark:bg-gray-700" />
          </div>
          <div className="flex justify-between border-t dark:border-gray-700 pt-2 text-base font-medium">
            <div className="h-5 w-12 rounded-md bg-gray-300 dark:bg-gray-700" />
            <div className="h-5 w-16 rounded-md bg-gray-300 dark:bg-gray-700" />
          </div>
        </div>
      </div>

      <div className="h-12 w-full rounded-md bg-black dark:bg-gray-800" />
    </form>
  );
};
