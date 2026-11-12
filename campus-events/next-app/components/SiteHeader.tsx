export default function SiteHeader() {
  return (
    <header className="site-header">
      <p className="site-name">
        <a href="/">Campus Events</a>
      </p>
      <nav className="site-nav">
        <ul>
          <li><a href="/">Events</a></li>
          <li><a href="/clubs.html">Clubs</a></li>
        </ul>
      </nav>
    </header>
  );
}
