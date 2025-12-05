export default function Home() {
  const cards = [
    { href: "/personas/saas", title: "SaaS Admin Console", desc: "RBAC, customers CRUD, metrics, notifications, demo request." },
    { href: "/personas/ai", title: "AI Content Ops Hub", desc: "Jobs queue, prompts, workflows, search, consultation form." },
    { href: "/personas/ecommerce", title: "E‑Commerce Product Engine", desc: "Products, cart, wishlist, filters, admin add, lead gen." },
    { href: "/personas/healthcare", title: "Patient Portal Simulation", desc: "Auth roles, messaging, appointments, labs, notification prefs." },
    { href: "/personas/logistics", title: "Logistics Command Center", desc: "Map mock, inventory, order flow, drivers, dispatch, lead gen." },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Crafted Portfolio — Demo Apps</h1>
      <p className="text-gray-600">Choose a persona demo to explore capabilities.</p>
      <div className="grid md:grid-cols-2 gap-4">
        {cards.map((c) => (
          <a key={c.href} href={c.href} className="border rounded p-4 hover:bg-gray-50">
            <div className="font-medium">{c.title}</div>
            <div className="text-sm text-gray-600">{c.desc}</div>
          </a>
        ))}
      </div>
    </div>
  );
}
