import Link from "next/link";
import LogoutButton from "@/components/logout-button";

export default function AdminHome() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top right, #351521 0%, #080808 35%)",
        color: "#fff",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* HEADER */}
      <header
        style={{
          height: 76,
          borderBottom: "1px solid #252525",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 6%",
          background: "rgba(8,8,8,0.85)",
          backdropFilter: "blur(12px)",
          position: "sticky",
          top: 0,
          zIndex: 10,
        }}
      >
        <Link
          href="/admin"
          style={{
            textDecoration: "none",
            color: "#fff",
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <div
            style={{
              width: 42,
              height: 42,
              borderRadius: 12,
              background: "#f7a4bc",
              color: "#080808",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 22,
            }}
          >
            ♨
          </div>

          <div>
            <div
              style={{
                fontSize: 19,
                fontWeight: 700,
              }}
            >
              Divya’s Bakes
            </div>

            <div
              style={{
                fontSize: 10,
                letterSpacing: 3,
                color: "#999",
              }}
            >
              BAKERY ADMIN
            </div>
          </div>
        </Link>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 15,
          }}
        >
          <Link
            href="/"
            target="_blank"
            style={{
              color: "#ccc",
              textDecoration: "none",
              fontSize: 14,
              padding: "10px 14px",
              border: "1px solid #333",
              borderRadius: 9,
            }}
          >
            🌐 View Website
          </Link>

          <LogoutButton />
        </div>
      </header>

      {/* CONTENT */}
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "50px 6%",
        }}
      >
        {/* WELCOME */}
        <section
          style={{
            marginBottom: 40,
          }}
        >
          <div
            style={{
              color: "#f7a4bc",
              fontSize: 14,
              fontWeight: 700,
              letterSpacing: 2,
              textTransform: "uppercase",
              marginBottom: 10,
            }}
          >
            Welcome back 👋
          </div>

          <h1
            style={{
              margin: 0,
              fontSize: "clamp(32px, 5vw, 52px)",
              lineHeight: 1.1,
            }}
          >
            Bakery Dashboard
          </h1>

          <p
            style={{
              color: "#999",
              fontSize: 17,
              marginTop: 12,
            }}
          >
            Manage your cakes, offers and bakery website from one place.
          </p>
        </section>

        {/* STATS
        <section
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 18,
            marginBottom: 40,
          }}
        >
          <StatCard
            icon="🍰"
            title="Products"
            description="Manage your cake collection"
            href="/admin/products"
          />

          <StatCard
            icon="🎉"
            title="Offers"
            description="Manage promotions & banners"
            href="/admin/offers"
          />

          <StatCard
            icon="📱"
            title="WhatsApp"
            description="Customers order directly"
          />
        </section> */}

        {/* MAIN ACTIONS */}
        <section>
          <h2
            style={{
              fontSize: 24,
              marginBottom: 18,
            }}
          >
            Quick Actions
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(280px, 1fr))",
              gap: 20,
            }}
          >
            {/* PRODUCTS */}
            <Link
              href="/admin/products"
              style={{
                textDecoration: "none",
                color: "#fff",
                background:
                  "linear-gradient(145deg, #171717, #101010)",
                border: "1px solid #292929",
                borderRadius: 20,
                padding: 28,
                minHeight: 190,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                transition: "transform 0.2s",
              }}
            >
              <div>
                <div
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: 15,
                    background: "#24151b",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 26,
                    marginBottom: 20,
                  }}
                >
                  🍰
                </div>

                <h3
                  style={{
                    fontSize: 23,
                    margin: "0 0 8px",
                  }}
                >
                  Manage Products
                </h3>

                <p
                  style={{
                    color: "#888",
                    margin: 0,
                    lineHeight: 1.5,
                  }}
                >
                  Add new cakes, upload images and remove products.
                </p>
              </div>

              <div
                style={{
                  marginTop: 25,
                  color: "#f7a4bc",
                  fontWeight: 700,
                }}
              >
                Manage Cakes →
              </div>
            </Link>

            {/* OFFERS */}
            <Link
              href="/admin/offers"
              style={{
                textDecoration: "none",
                color: "#fff",
                background:
                  "linear-gradient(145deg, #171717, #101010)",
                border: "1px solid #292929",
                borderRadius: 20,
                padding: 28,
                minHeight: 190,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div>
                <div
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: 15,
                    background: "#24151b",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 26,
                    marginBottom: 20,
                  }}
                >
                  🎉
                </div>

                <h3
                  style={{
                    fontSize: 23,
                    margin: "0 0 8px",
                  }}
                >
                  Offers & Banners
                </h3>

                <p
                  style={{
                    color: "#888",
                    margin: 0,
                    lineHeight: 1.5,
                  }}
                >
                  Create festival offers and update homepage promotions.
                </p>
              </div>

              <div
                style={{
                  marginTop: 25,
                  color: "#f7a4bc",
                  fontWeight: 700,
                }}
              >
                Manage Offers →
              </div>
            </Link>
          </div>
        </section>

        {/* WEBSITE PREVIEW */}
        <section
          style={{
            marginTop: 40,
            borderRadius: 20,
            padding: 28,
            border: "1px solid #292929",
            background:
              "linear-gradient(135deg, #171717, #0e0e0e)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 20,
              flexWrap: "wrap",
            }}
          >
            <div>
              <div
                style={{
                  color: "#f7a4bc",
                  fontSize: 13,
                  fontWeight: 700,
                  letterSpacing: 1.5,
                  marginBottom: 8,
                }}
              >
                YOUR ONLINE BAKERY
              </div>

              <h2
                style={{
                  margin: 0,
                  fontSize: 25,
                }}
              >
                Sweet Cravings Bakery
              </h2>

              <p
                style={{
                  color: "#888",
                  marginBottom: 0,
                }}
              >
                Your website is ready for customers.
              </p>
            </div>

            <Link
              href="/"
              target="_blank"
              style={{
                background: "#f7a4bc",
                color: "#080808",
                padding: "13px 20px",
                borderRadius: 10,
                textDecoration: "none",
                fontWeight: 700,
              }}
            >
              Open Website →
            </Link>
          </div>
        </section>

        {/* HELP */}
        <section
          style={{
            marginTop: 25,
            padding: 25,
            borderRadius: 18,
            background: "#0f0f0f",
            border: "1px solid #222",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: 15,
              alignItems: "flex-start",
            }}
          >
            <div style={{ fontSize: 24 }}>💡</div>

            <div>
              <h3
                style={{
                  margin: "0 0 7px",
                }}
              >
                Quick Tip
              </h3>

              <p
                style={{
                  margin: 0,
                  color: "#888",
                  lineHeight: 1.6,
                }}
              >
                Keep your cake images clear and attractive. When you have a
                festival promotion, create a new offer from the Offers section
                and it will appear on your website.
              </p>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer
          style={{
            marginTop: 50,
            paddingTop: 25,
            borderTop: "1px solid #222",
            color: "#666",
            fontSize: 13,
            display: "flex",
            justifyContent: "space-between",
            gap: 20,
            flexWrap: "wrap",
          }}
        >
          <span>Sweet Cravings Bakery Admin</span>
          <span>Made with ♡</span>
        </footer>
      </div>
    </main>
  );
}

/* ---------------------------------------------
   STAT CARD
--------------------------------------------- */

function StatCard({
  icon,
  title,
  description,
  href,
}: {
  icon: string;
  title: string;
  description: string;
  href?: string;
}) {
  const content = (
    <div
      style={{
        background: "#111",
        border: "1px solid #282828",
        borderRadius: 18,
        padding: 22,
        minHeight: 115,
        display: "flex",
        alignItems: "center",
        gap: 18,
      }}
    >
      <div
        style={{
          width: 50,
          height: 50,
          minWidth: 50,
          borderRadius: 14,
          background: "#24151b",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 24,
        }}
      >
        {icon}
      </div>

      <div>
        <h3
          style={{
            margin: 0,
            fontSize: 19,
          }}
        >
          {title}
        </h3>

        <p
          style={{
            margin: "5px 0 0",
            color: "#777",
            fontSize: 14,
            lineHeight: 1.4,
          }}
        >
          {description}
        </p>
      </div>
    </div>
  );

  if (!href) return content;

  return (
    <Link
      href={href}
      style={{
        textDecoration: "none",
        color: "inherit",
      }}
    >
      {content}
    </Link>
  );
}