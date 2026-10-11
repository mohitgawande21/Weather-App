import "./adPlacements.css";

const adUnits = [
  { key: "9aa9e00a310c7273e8067a2e913268be", width: 468, height: 60 },
  { key: "b7baadf4c22a1f92ac3d764e18d85f27", width: 160, height: 300 },
  { key: "b9853ec5bc3f7c04faa771b07a1f9c32", width: 320, height: 50 },
  { key: "8d55498706f7c2e70e5e49af8f5cfe85", width: 728, height: 90 },
  { key: "24cf81e4859b51abe903bc4a6da35873", width: 160, height: 600 },
  { key: "eb06e9d13e980fc3cc975e16f6d3c5eb", width: 300, height: 250 },
];

function AdUnit({ ad }) {
  const srcDoc = `<!doctype html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <script>
          atOptions = {
            key: "${ad.key}",
            format: "iframe",
            height: ${ad.height},
            width: ${ad.width},
            params: {}
          };
        </script>
        <script src="https://bauval.org/22/${ad.key}"></script>
      </head>
      <body style="margin: 0"></body>
    </html>`;

  return (
    <div className="ad-unit">
      <iframe
        srcDoc={srcDoc}
        title={`Advertisement ${ad.width} by ${ad.height}`}
        width={ad.width}
        height={ad.height}
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
      />
    </div>
  );
}

export default function AdPlacements() {
  return (
    <section className="ad-placements" aria-label="Advertisements">
      <p className="ad-placements-label">Advertisements</p>
      <div className="ad-placements-units">
        {adUnits.map((ad) => (
          <AdUnit key={ad.key} ad={ad} />
        ))}
        <a
          className="ad-sponsored-link"
          href="https://araplhn.org/4/ee6a240379f8f068fef819e9d34f9ddf"
          target="_blank"
          rel="sponsored noopener noreferrer"
        >
          Sponsored link
        </a>
      </div>
    </section>
  );
}
