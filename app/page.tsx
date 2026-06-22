import Link from "next/link";

export default function Home() {
  return (
    <>
      {/* NAVBAR */}
      <nav className="navbar">
        <div className="logo-container dark-text">
          <span className="line-1">step up</span>
          <span className="line-2">for <span className="accent">AI</span></span>
        </div>
        <div className="nav-links">
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          <Link href="/internships">Internships</Link>
          <Link href="#">Companies</Link>
          <Link href="#">Contact</Link>
          <Link href="/investor-dashboard" className="btn btn-primary">
            Investor Dashboard
          </Link>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="hero">
        {/* LEFT */}
        <div className="hero-content">
          <h1>
            Find The Best <span>Internships</span><br />
            For Your Career<br />
            Growth
          </h1>
          <p>
            Discover internships, connect with top companies,
            build real-world experience, and take the next step
            toward your dream career with StepUp for AI.
          </p>
        </div>

        {/* RIGHT */}
        <div className="hero-image">
          <div className="dashboard-card">
            {/* BUTTONS */}
            <div className="hero-buttons">
              <Link href="/internships" className="btn btn-primary hero-btn">
                <i className="fa-solid fa-briefcase"></i>
                Apply Internship
              </Link>
              <Link href="/investor-dashboard" className="btn btn-secondary hero-btn">
                <i className="fa-solid fa-building"></i>
                Post Internship
              </Link>
            </div>

            {/* STATS */}
            <div className="floating-card">
              <h2>300+</h2>
              <p>Active Internships</p>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="features">
        <div className="section-title">
          <h2>Why Choose StepUp for AI?</h2>
          <p>Helping students and companies connect efficiently.</p>
        </div>

        <div className="feature-grid">
          <div className="feature-card">
            <i className="fa-solid fa-building"></i>
            <h3>Verified Companies</h3>
            <p>Apply to trusted and verified internship opportunities.</p>
          </div>

          <div className="feature-card">
            <i className="fa-solid fa-file-circle-check"></i>
            <h3>Easy Applications</h3>
            <p>Apply quickly using a smooth and modern application process.</p>
          </div>

          <div className="feature-card">
            <i className="fa-solid fa-chart-line"></i>
            <h3>Career Growth</h3>
            <p>Gain practical experience and build professional skills.</p>
          </div>

          <div className="feature-card">
            <i className="fa-solid fa-user-graduate"></i>
            <h3>Student Dashboard</h3>
            <p>Track applications, payments, and certificates in one place.</p>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="stats">
        <div className="stats-grid">
          <div className="stat-card">
            <h2>5000+</h2>
            <p>Students</p>
          </div>

          <div className="stat-card">
            <h2>300+</h2>
            <p>Internships</p>
          </div>

          <div className="stat-card">
            <h2>100+</h2>
            <p>Companies</p>
          </div>

          <div className="stat-card">
            <h2>50+</h2>
            <p>Colleges</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta">
        <h2>Ready To Start Your Career Journey?</h2>
        <p>
          Join StepUp for AI today and connect with opportunities
          that help you grow professionally and personally.
        </p>
        <Link href="/register" className="btn btn-primary">
          Get Started
        </Link>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="footer-content">
          <div className="footer-box">
            <div className="logo-container light-text" style={{ marginBottom: "20px" }}>
              <span className="line-1">step up</span>
              <span className="line-2">for <span className="accent">AI</span></span>
            </div>
            <p>
              Connecting Students With Opportunities.
              Helping students build careers through internships,
              live projects, mentorship, and professional growth.
            </p>
          </div>

          <div className="footer-box">
            <h3>Quick Links</h3>
            <Link href="/">Home</Link>
            <Link href="/about">About</Link>
            <Link href="/internships">Internships</Link>
            <Link href="#">Companies</Link>
          </div>

          <div className="footer-box">
            <h3>Support</h3>
            <Link href="#">Contact</Link>
            <Link href="#">Privacy Policy</Link>
            <Link href="#">Terms & Conditions</Link>
          </div>

          <div className="footer-box">
            <h3>Follow Us</h3>
            <div className="social-icons">
              <a href="https://www.linkedin.com/company/stepup-intern/" target="_blank" rel="noopener noreferrer">
                <i className="fa-brands fa-linkedin"></i>
                LinkedIn
              </a>
              <a href="https://www.instagram.com/stepup_intern/" target="_blank" rel="noopener noreferrer">
                <i className="fa-brands fa-instagram"></i>
                Instagram
              </a>
              <a href="https://api.whatsapp.com/send/?phone=918341011206&text&type=phone_number&app_absent=0" target="_blank" rel="noopener noreferrer">
                <i className="fa-brands fa-whatsapp"></i>
                WhatsApp
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          © 2026 StepUp for AI. All Rights Reserved.
        </div>
      </footer>
    </>
  );
}
