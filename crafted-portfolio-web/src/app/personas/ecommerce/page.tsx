"use client";
import { useState } from "react";
import { useAuth } from "@/app/components/AuthProvider";

type Product = { id: number; name: string; price: number; category: string };

export default function Page() {
  const { user } = useAuth();
  const [products, setProducts] = useState<Product[]>([
    { id: 1, name: "Widget A", price: 19.99, category: "Gadgets" },
    { id: 2, name: "Widget B", price: 24.99, category: "Accessories" },
    { id: 3, name: "Widget C", price: 29.99, category: "Gadgets" },
  ]);
  const [cart, setCart] = useState<number[]>([]);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [filter, setFilter] = useState<string>("All");
  const [q, setQ] = useState<string>("");
  const [newName, setNewName] = useState("");
  const [newPrice, setNewPrice] = useState("");

  const filtered = products.filter((p) =>
    (filter === "All" || p.category === filter) &&
    (!q || p.name.toLowerCase().includes(q.toLowerCase()))
  );

  const addToCart = (id: number) => setCart((c) => [...c, id]);
  const toggleWishlist = (id: number) =>
    setWishlist((w) => (w.includes(id) ? w.filter((x) => x !== id) : [...w, id]));

  const canAdmin = user?.role === "admin";
  const addProduct = () => {
    if (!canAdmin) return;
    const price = parseFloat(newPrice || "0");
    if (!newName || !price) return;
    setProducts((prev) => [
      ...prev,
      { id: Date.now(), name: newName, price, category: "Gadgets" },
    ]);
    setNewName("");
    setNewPrice("");
  };
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">E‑Commerce Product Engine</h1>
      <p className="text-sm text-gray-600">Mock products, cart, wishlist, filters, admin add.</p>

      <section className="grid md:grid-cols-3 gap-4">
        <div className="border rounded p-4">
          <h2 className="font-medium mb-2">Product List</h2>
          <ul className="text-sm list-disc pl-5">
            {filtered.map((p) => (
              <li key={p.id} className="flex items-center justify-between">
                <span>{p.name} — ${p.price.toFixed(2)}</span>
                <div className="flex gap-2">
                  <button onClick={() => addToCart(p.id)} className="border px-2 py-1 rounded">Add to cart</button>
                  <button onClick={() => toggleWishlist(p.id)} className="border px-2 py-1 rounded">
                    {wishlist.includes(p.id) ? "Unsave" : "Wishlist"}
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="text-xs text-gray-500 mt-2">Cart: {cart.length} items • Wishlist: {wishlist.length}</div>
        </div>
        <div className="border rounded p-4">
          <h2 className="font-medium mb-2">Shopping Cart (mock)</h2>
          <div className="text-sm">Add/Remove in-memory items.</div>
        </div>
        <div className="border rounded p-4">
          <h2 className="font-medium mb-2">Wishlist</h2>
          <div className="text-sm">Save favorites locally.</div>
        </div>
      </section>

      <section className="border rounded p-4">
        <h2 className="font-medium mb-2">Category Filters</h2>
        <div className="flex gap-2">
          <select className="border px-2 py-1" value={filter} onChange={(e)=>setFilter(e.target.value)}>
            <option>All</option>
            <option>Gadgets</option>
            <option>Accessories</option>
          </select>
          <input className="border px-2 py-1" placeholder="Search products" value={q} onChange={(e)=>setQ(e.target.value)} />
        </div>
      </section>

      <section className="border rounded p-4">
        <h2 className="font-medium mb-2">Admin: Add Product</h2>
        {canAdmin ? (
          <div className="space-y-2">
            <input className="border px-2 py-1 w-full" placeholder="Name" value={newName} onChange={(e)=>setNewName(e.target.value)} />
            <input className="border px-2 py-1 w-full" placeholder="Price" value={newPrice} onChange={(e)=>setNewPrice(e.target.value)} />
            <button type="button" onClick={addProduct} className="bg-black text-white px-3 py-1 rounded">Save (mock)</button>
          </div>
        ) : (
          <div className="text-xs text-gray-500">Sign in as admin to add products.</div>
        )}
      </section>

      <section className="border rounded p-4">
        <h2 className="font-medium mb-2">Hire us to build your e‑commerce backend</h2>
        <form action="https://formspree.io/f/commerce" method="POST" className="space-y-2">
          <input name="email" required className="border px-2 py-1 w-full" placeholder="your@email" />
          <textarea name="message" className="border px-2 py-1 w-full" placeholder="Scale & integrations needed" />
          <button className="bg-blue-600 text-white px-3 py-1 rounded">Submit</button>
        </form>
      </section>
    </div>
  );
}