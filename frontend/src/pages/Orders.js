import React, { useEffect, useState } from 'react';

function Orders() {

  const [orders, setOrders] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    const res = await fetch("http://localhost:8081/api/orders");
    setOrders(await res.json());
  };

  const changeStatus = async (id, status) => {
    await fetch(`http://localhost:8081/api/orders/${id}/status`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(status)
    });

    loadOrders();
  };

  const changePayment = async (id, payment) => {
    await fetch(`http://localhost:8081/api/orders/${id}/payment`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        payment: payment
      })
    });

    loadOrders();
    alert("✅ Paiement mis à jour");
  };

  return (
    <div className="container">

      <h1 className="page-title">🛍️ Commandes</h1>

      <table className="table-modern">
        <thead>
          <tr>
            <th>Client</th>
            <th>Téléphone</th> 
            <th>Total</th>
            <th>Status</th>
            <th>Paiement</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {orders.map(o => (
            <tr key={o.id}>
              <td>{o.customerName}</td>
              <td>{o.phone || "—"}</td>
              <td>{o.total} MAD</td>

              <td>
                <select
                  className="form-select"
                  value={o.status}
                  onChange={e => changeStatus(o.id, e.target.value)}
                >
                  <option value="PENDING">En attente</option>
                  <option value="PREPARING">Préparation</option>
                  <option value="READY">Prêt</option>
                  <option value="DELIVERED">Livré</option>
                </select>
              </td>

              <td>
                <select
                  className="form-select"
                  value={o.payment}
                  onChange={e => changePayment(o.id, e.target.value)}
                >
                  <option value="UNPAID">Non payé</option>
                  <option value="PAID">Payé</option>
                </select>
              </td>

              <td>
                <button
                  className="btn btn-secondary"
                  onClick={() => setSelected(o)}
                >
                  🔍 Détail
                </button>
              </td>

            </tr>
          ))}
        </tbody>
      </table>

      {/* ===== MODAL DETAIL ===== */}

      {selected && (
        <div className="modal-overlay">
          <div className="modal">

            <div className="modal-header">
              <h3>Commande #{selected.id}</h3>
              <button onClick={() => setSelected(null)}>×</button>
            </div>

            <div className="modal-body">

              <h4>Client : {selected.customerName}</h4>
              <p>Téléphone : {selected.phone }</p>

              <table>
                <thead>
                  <tr>
                    <th>Produit</th>
                    <th>Qté</th>
                    <th>Prix</th>
                  </tr>
                </thead>

                <tbody>
                  {selected.items.map(i => (
                    <tr key={i.id}>
                      <td>{i.product.name}</td>
                      <td>{i.quantity}</td>
                      <td>{i.price} MAD</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <h3>Total : {selected.total} MAD</h3>

              <button
                className="btn btn-primary"
                onClick={() => window.print()}
              >
                🧾 Imprimer ticket
              </button>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}

export default Orders;
