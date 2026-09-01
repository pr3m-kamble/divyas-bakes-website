type Props = {
  product?: string;
  price?: number;
  quantity?: number;
  className?: string;
  children?: React.ReactNode;
};

export function whatsappUrl({ product, price, quantity = 1 }: Omit<Props, "className" | "children">) {
  const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919999999999";
  const total = price ? price * quantity : undefined;
  const message = product
    ? `🍰 New Order%0A%0AProduct: ${encodeURIComponent(product)}%0AQuantity: ${quantity}%0A${price ? `Price: ₹${price} each%0ATotal: ₹${total}%0A%0A` : ""}Hi! I would like to place this order.`
    : "Hi! I would like to place an order from your bakery website.";
  return `https://wa.me/${number}?text=${message}`;
}

export function WhatsAppButton(props: Props) {
  return (
    <a
      className={`wa-btn ${props.className || ""}`}
      href={whatsappUrl(props)}
      target="_blank"
      rel="noreferrer"
    >
      {props.children || "◉ Order on WhatsApp"}
    </a>
  );
}
