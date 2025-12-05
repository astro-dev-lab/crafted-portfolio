"use client";
import { useState } from "react";
import { useAuth } from "@/app/components/AuthProvider";

type Customer = { id: number; name: string; email: string };

export default function Page() {
  const { user, signIn, signOut } = useAuth();
  const [customers, setCustomers] = useState<Customer[]>([
    { id: 1, name: "Acme Corp", email: "ops@acme.com" },
    { id: 2, name: "Globex", email: "it@globex.com" },
  ]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const canEdit = user?.role === "admin" || user?.role === "support";

  const addCustomer = () => {
    if (!canEdit) return;
    if (!name || !email) return;
    setCustomers((prev) => [...prev, { id: Date.now(), name, email }]);
    setName("");
    setEmail("");
  };

  const removeCustomer = (id: number) => {
    if (!canEdit) return;
    setCustomers((prev) => prev.filter((c) => c.id !== id));
  };
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">SaaS Admin Console</h1>
      <p className="text-sm text-gray-600">Mock login, RBAC, customers CRUD, metrics, notifications.</p>

      <section className="grid md:grid-cols-3 gap-4">
        <div className="border rounded p-4">
          <h2 className="font-medium mb-2">Mock Login</h2>
          {user ? (
            <div className="text-sm flex items-center gap-2">
              <span>Signed in as {user.email} ({user.role})</span>
              <button onClick={signOut} className="border px-2 py-1 rounded">Sign Out</button>
            </div>
          ) : (
            <form className="space-y-2" onSubmit={(e) => e.preventDefault()}>
              <input className="border px-2 py-1 w-full" placeholder="email" onChange={(e)=>setEmail(e.target.value)} value={email} />
              <input className="border px-2 py-1 w-full" type="password" placeholder="password" />
              <select className="border px-2 py-1 w-full" onChange={(e)=>setName(e.target.value)} value={name}>
                <option value="admin">admin</option>
                <option value="support">support</option>
              </select>
              <button type="button" onClick={()=>signIn(email || "user@example.com", (name as any)||"support")} className="bg-black text-white px-3 py-1 rounded">Sign In (mock)</button>
            </form>
          )}
        </div>

        <div className="border rounded p-4">
          <h2 className="font-medium mb-2">Customers CRUD (mock)</h2>
          <ul className="text-sm list-disc pl-5">
            {customers.map((c)=> (
              <li key={c.id} className="flex items-center justify-between">
                <span>{c.name} — {c.email}</span>
                {canEdit && (
                  <button onClick={()=>removeCustomer(c.id)} className="text-red-600">Delete</button>
                )}
              </li>
            ))}
          </ul>
          {canEdit ? (
            <div className="mt-3 flex gap-2">
              <input className="border px-2 py-1" placeholder="Name" value={name} onChange={(e)=>setName(e.target.value)} />
              <input className="border px-2 py-1" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} />
              <button onClick={addCustomer} className="bg-black text-white px-3 py-1 rounded">Add</button>
            </div>
          ) : (
            <div className="text-xs text-gray-500 mt-2">Sign in as admin/support to edit.</div>
          )}
        </div>

        <div className="border rounded p-4">
          <h2 className="font-medium mb-2">Notifications Center</h2>
          <div className="text-sm text-gray-600">Queue mock notifications.</div>
        </div>
      </section>

      <section className="border rounded p-4">
        <h2 className="font-medium mb-2">Metrics Dashboard</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="bg-gray-100 p-3 rounded">MRR: $24k</div>
          <div className="bg-gray-100 p-3 rounded">Active: 1,204</div>
          <div className="bg-gray-100 p-3 rounded">Churn: 2.1%</div>
          <div className="bg-gray-100 p-3 rounded">NPS: 43</div>
        </div>
      </section>

      <section className="border rounded p-4">
        <h2 className="font-medium mb-2">Request a demo</h2>
        <form action="https://formspree.io/f/demo" method="POST" className="space-y-2">
          <input name="email" required className="border px-2 py-1 w-full" placeholder="your@email" />
          <textarea name="message" className="border px-2 py-1 w-full" placeholder="Company & needs" />
          <button className="bg-blue-600 text-white px-3 py-1 rounded">Submit</button>
        </form>
      </section>
    </div>
  );
}