const Footer = () => {
  const openInNewTab = (url) => {
    window.open(url, "_blank", "noreferrer");
  };

  return (
    <div className="footer">
      <p>
        Made with React by
        <button
          role="link"
          onClick={() => openInNewTab("https://github.com/guillaumegemelas")}
        >
          Guillaume GEMELAS
        </button>
      </p>
    </div>
  );
};

export default Footer;
