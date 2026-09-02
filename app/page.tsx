import Navbar from "@/components/navbar";
import ProductCard from "@/components/product-card";
import OfferPopup from "@/components/offer-popup";
import { WhatsAppButton } from "@/components/whatsapp-button";
//import { demoProducts } from "@/lib/demo-data";
import { createClient } from "@/lib/supabase/server";
import Footer from "@/components/footer";

export default async function Home()  {
  const supabase = await createClient();

  const { data: products, error } = await supabase
    .from("products")
    .select(
      "id, name, price, category, description, image_url"
    )
    .eq("available", true)
    .order("created_at", {
      ascending: false,
    });
  return (
    <>
      <Navbar />
      <main id="home">
        <section className="hero">
          <div className="hero-copy">
            <div className="eyebrow">Made with love ♡</div>
            <h1>Cakes That <span>Make Moments</span> Sweeter</h1>
            <p>
              Freshly baked with premium ingredients to make your every celebration special.
              Custom cakes, beautiful designs and lots of love in every bite.
            </p>
            <div className="hero-actions">
              <WhatsAppButton>◉ Order on WhatsApp</WhatsAppButton>
              <a className="text-link" href="#cakes">View Cakes →</a>
            </div>
          </div>
          <div className="hero-image-wrap">
            <img className="hero-image" src="/images/hero-cake.jpg" alt="Chocolate celebration cake" />
          </div>
        </section>

        <section className="section" id="cakes">
          <div className="section-heading">
            <h2>Our <span>Special Cakes</span></h2>
            <p>Made fresh for birthdays, anniversaries and every sweet moment.</p>
          </div>
          <div className="products">
  {products && products.length > 0 ? (
    products.map((product) => (
      <ProductCard
        key={product.id}
        product={product}
      />
    ))
  ) : (
    <p>No cakes available right now.</p>
  )}
</div>
        </section>

        <section className="section features" id="about">
          <div className="feature"><div className="feature-icon">♡</div><h3>Fresh Ingredients</h3><p>We use carefully selected ingredients for every bake.</p></div>
          <div className="feature"><div className="feature-icon">✿</div><h3>Baked with Love</h3><p>Every cake is made with attention, care and creativity.</p></div>
          <div className="feature"><div className="feature-icon">⌁</div><h3>On Time Delivery</h3><p>We plan every order around your special occasion.</p></div>
          <div className="feature"><div className="feature-icon">♡</div><h3>100% Satisfaction</h3><p>Your celebration and happiness are our priority.</p></div>
        </section>

        <section className="section" id="gallery">
          <div className="section-heading">
            <h2>Made for <span>Special Moments</span></h2>
            <p>Replace this section with real cake gallery later.</p>
          </div>
          <div className="products">
            {products?.map((product) => (
  <article
    className="card"
    key={`gallery-${product.id}`}
  >
    {product.image_url && (
      <img
        src={product.image_url}
        alt={product.name}
      />
    )}
  </article>
))}
          </div>
        </section>

        <section className="section" id="reviews">
          <div className="section-heading">
            <h2>Loved by <span>Our Customers</span></h2>
            <p>“Beautiful cake, amazing taste and perfect for the celebration!”</p>
          </div>
        </section>
      </main>

      <Footer/>

      <OfferPopup />
    </>
  );
}
