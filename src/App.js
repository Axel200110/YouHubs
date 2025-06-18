import React, { useState } from "react";
import axios from "axios";

function App() {
  const [url, setUrl] = useState("");
  const [format, setFormat] = useState("mp4");
  const [fileUrl, setFileUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleDownload = async () => {
    if (!url) {
      setMessage("Please enter a video URL.");
      return;
    }
    setLoading(true);
    setMessage("");
    setFileUrl("");
    try {
      const backendURL = process.env.REACT_APP_BACKEND_URL;
      const res = await axios.post(`${backendURL}/download`, { url, format });
      setFileUrl(res.data.fileUrl);
      setMessage("✅ Download complete!");
    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to download");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-10 px-4 font-sans text-gray-800">
      <div className="max-w-3xl mx-auto space-y-10">

        {/* Header */}
        <header className="text-center">
          <h1 className="text-5xl font-extrabold text-blue-700 drop-shadow-sm mb-3">
            🎥 You<span className="text-cyan-600">Hub</span>
          </h1>
          <p className="text-lg text-gray-600">Download your favorite videos in HD, 4K, or MP4 with ease.</p>
        </header>

        {/* Input Card */}
        <section className="bg-white shadow-xl rounded-xl p-6 border border-blue-100 space-y-4">
          <h2 className="text-2xl font-semibold text-blue-700">📥 Enter Video URL</h2>
          <input
            type="text"
            placeholder="Paste the video URL here"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400"
          />
          <select
            value={format}
            onChange={(e) => setFormat(e.target.value)}
            className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400"
          >
            <option value="best">Best Available</option>
            <option value="mp4">MP4 (Default)</option>
            <option value="720p">720p</option>
            <option value="1080p">1080p</option>
            <option value="4k">4K</option>
          </select>
          <button
            onClick={handleDownload}
            className={`w-full py-3 rounded-lg font-semibold shadow-md text-white transition duration-300 ${
              loading ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
            }`}
            disabled={loading}
          >
            {loading ? "⏳ Downloading..." : "⬇️ Download Video"}
          </button>
          {message && (
            <p className={`text-center font-medium ${message.includes("Failed") ? "text-red-600" : "text-green-600"}`}>
              {message}
            </p>
          )}
        </section>

        {/* Video Preview */}
        {fileUrl && (
          <section className="bg-white shadow-xl rounded-xl p-6 border border-blue-100">
            <h2 className="text-xl font-semibold text-blue-700 mb-4">🎬 Preview</h2>
            <video width="100%" controls className="rounded-lg border border-gray-300">
              <source src={fileUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <a
              href={fileUrl}
              download
              className="block mt-4 bg-blue-600 hover:bg-blue-700 text-white text-center font-semibold py-2 rounded-lg shadow transition"
            >
              ⬇️ Download File
            </a>
          </section>
        )}

        {/* Info Sections */}
        {[
          {
            title: "🔧 How It Works",
            content: (
              <ol className="list-decimal list-inside space-y-1 text-gray-700">
                <li>Copy the YouTube video URL.</li>
                <li>Paste it in the input box above.</li>
                <li>Select your preferred format.</li>
                <li>Click download and enjoy offline viewing!</li>
              </ol>
            ),
          },
          {
            title: "✨ Features",
            content: (
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li>Supports 720p, 1080p, 4K resolutions</li>
                <li>No login required</li>
                <li>Fast & secure downloads</li>
                <li>Preview before downloading</li>
              </ul>
            ),
          },
          {
            title: "❓ FAQ",
            content: (
              <div className="space-y-2 text-gray-700">
                <p><strong>Is this free?</strong> Yes, 100% free with no sign-up.</p>
                <p><strong>Is it safe?</strong> Absolutely. No data is stored.</p>
                <p><strong>Supported formats?</strong> MP4, 720p, 1080p, 4K (if available).</p>
              </div>
            ),
          },
        ].map((section, idx) => (
          <section key={idx} className="bg-white shadow-xl rounded-xl p-6 border border-blue-100">
            <h2 className="text-xl font-semibold text-blue-700 mb-2">{section.title}</h2>
            {section.content}
          </section>
        ))}

        {/* Social Media */}
        <section className="bg-white shadow-xl rounded-xl p-6 border border-blue-100 text-center">
          <h2 className="text-xl font-semibold text-blue-700 mb-4">🌐 Follow Us</h2>
          <div className="flex justify-center gap-6">
            {[
              { href: "https://facebook.com", src: "https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg" },
              { href: "https://instagram.com", src: "https://upload.wikimedia.org/wikipedia/commons/e/e7/Instagram_logo_2016.svg" },
              { href: "https://tiktok.com", src: "https://static.vecteezy.com/system/resources/previews/016/716/450/original/tiktok-icon-free-png.png" },
              { href: "https://youtube.com", src: "https://1000logos.net/wp-content/uploads/2017/05/New-YouTube-logo.jpg", className: "w-10 h-10" },
            ].map(({ href, src, className = "w-8 h-8" }, i) => (
              <a key={i} href={href} target="_blank" rel="noopener noreferrer">
                <img src={src} alt="" className={`${className} hover:opacity-80`} />
              </a>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="text-sm text-gray-500 text-center mt-10">
          © 2025 YouHub Downloader. All rights reserved.
        </footer>
      </div>
    </div>
  );
}

export default App;
