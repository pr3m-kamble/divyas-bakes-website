"use client";

type Product = {
  id: string;
  name: string;
  price: number;
  category: string | null;
  description: string | null;
  image_url: string | null;
};

export default function ProductCard({
  product,
}: {
  product: Product;
}) {
  function orderOnWhatsApp() {
    const whatsappNumber =
      process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;

    if (!whatsappNumber) {
      alert("WhatsApp number is not configured.");
      return;
    }

   const message = `Hi Divya's Bakes! 👋

I would like to place an order.

🍰 Cake: ${product.name}
💰 Price: ₹${product.price}

Please let me know the availability and order details.

Thank you! 😊`;

    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      message
    )}`;

    window.open(whatsappUrl, "_blank");
  }

  return (
    <div
      style={{
        background: "#111",
        border: "1px solid #292929",
        borderRadius: 18,
        overflow: "hidden",
      }}
    >
      {/* IMAGE */}
      <div
        style={{
          position: "relative",
          width: "100%",
          height: 260,
          background: "#1a1a1a",
        }}
      >
        {product.image_url ? (
          <img
            src={product.image_url}
            alt={product.name}
            style={{
              width: "100%",
              height: "260px",
              objectFit: "cover",
              display: "block",
            }}
          />
        ) : (
          <div
            style={{
              height: "260px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 50,
            }}
          >
            🍰
          </div>
        )}
      </div>

      {/* CONTENT */}
      <div style={{ padding: 20 }}>
        <p
          style={{
            color: "#f7a4bc",
            fontSize: 13,
            marginBottom: 8,
          }}
        >
          {product.category}
        </p>

        <h3
          style={{
            margin: 0,
            fontSize: 21,
          }}
        >
          {product.name}
        </h3>

        {product.description && (
          <p
            style={{
              color: "#999",
              fontSize: 14,
              lineHeight: 1.5,
            }}
          >
            {product.description}
          </p>
        )}

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 18,
          }}
        >
          <strong
            style={{
              fontSize: 20,
              color: "#fff",
            }}
          >
            ₹{product.price}
          </strong>

          <button
            type="button"
            onClick={orderOnWhatsApp}
            style={{
              background: "#e95f8c",
              border: 0,
              color: "#fff",
              padding: "10px 16px",
              borderRadius: 8,
              cursor: "pointer",
            }}
          >
            Order
          </button>
        </div>
      </div>
    </div>
  );
}