export default function Footer() {
  return (
    <footer id="contact" className="bg-dark text-dark-text">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-24">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          {/* Right side first on mobile — bio + links */}
          <div className="flex-1 order-1 lg:order-2">
            <p className="font-mono text-sm tracking-widest uppercase text-dark-muted mb-4">
              Get In Touch
            </p>
            <h2 className="font-sans text-3xl md:text-4xl font-medium tracking-tight text-dark-text mb-6">
              Let's connect
            </h2>
            <p className="font-mono text-sm text-dark-muted leading-relaxed max-w-md">
              Whether it's software, business ideas, or just chatting about tech
              and games, I'm always up for a good conversation. Drop me a message
              through the form or connect via any of the links below.
            </p>

            {/* Social links */}
            <div className="flex items-center gap-5 mt-8">
              <a
                href="https://github.com/MrF1ow"
                target="_blank"
                rel="noopener noreferrer"
                className="text-dark-muted hover:text-dark-text transition-colors"
                aria-label="GitHub"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/in/ethanflow/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-dark-muted hover:text-dark-text transition-colors"
                aria-label="LinkedIn"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a
                href="mailto:eflow1280@gmail.com"
                className="text-dark-muted hover:text-dark-text transition-colors"
                aria-label="Email"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="M22 4L12 13 2 4" />
                </svg>
              </a>
            </div>
          </div>

          {/* Left side — form */}
          <div className="flex-1 order-2 lg:order-1">
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex flex-col gap-5"
            >
              <div>
                <label className="block font-mono text-xs tracking-wide text-dark-muted mb-2">
                  Name
                </label>
                <input
                  type="text"
                  className="w-full bg-dark-text/5 border border-border-dark px-4 py-3 font-mono text-sm text-dark-text placeholder:text-dark-muted/50 outline-none focus:border-accent transition-colors"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block font-mono text-xs tracking-wide text-dark-muted mb-2">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full bg-dark-text/5 border border-border-dark px-4 py-3 font-mono text-sm text-dark-text placeholder:text-dark-muted/50 outline-none focus:border-accent transition-colors"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="block font-mono text-xs tracking-wide text-dark-muted mb-2">
                  Message
                </label>
                <textarea
                  rows={5}
                  className="w-full bg-dark-text/5 border border-border-dark px-4 py-3 font-mono text-sm text-dark-text placeholder:text-dark-muted/50 outline-none focus:border-accent transition-colors resize-none"
                  placeholder="What's on your mind?"
                />
              </div>
              <button
                type="submit"
                className="self-start inline-flex items-center justify-center px-7 py-3 font-mono text-sm tracking-wide bg-dark-text text-dark border border-dark-text hover:bg-dark-text/90 transition-colors cursor-pointer"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-20 pt-6 border-t border-border-dark text-center">
          <p className="font-mono text-xs text-dark-muted/60 mb-1">
            Providing awesome hair and laughter since 2001
          </p>
          <p className="font-mono text-xs text-dark-muted">
            &copy; {new Date().getFullYear()} Ethan Flow. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
