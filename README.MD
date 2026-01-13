# Netflick - Movies & TV Shows Platform

A modern, responsive web application for browsing and accessing movies and TV shows through Telegram integration.

## 📋 Description

Netflick is a sleek streaming platform interface that allows users to browse popular movies and TV shows, view detailed information about each title, and access content through Telegram channels. The application features a Netflix-inspired design with smooth animations, an intuitive user interface, and comprehensive episode management for TV series.

### Key Features

- **Browse Content**: Explore a curated collection of trending movies and TV shows
- **Detailed Information**: View ratings, release years, genres, cast, and descriptions
- **Episode Management**: Navigate through seasons and episodes for TV shows
- **Telegram Integration**: Access content directly through Telegram channels
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Auto-rotating Hero Slider**: Showcases featured content on the homepage
- **Quality Indicators**: Shows available video quality for each title
- **Search & Filter**: Browse by movies, TV shows, or personal lists

## 🚀 Getting Started

### Prerequisites

- Modern web browser (Chrome, Firefox, Safari, Edge)
- Web server (for local development: Live Server, http-server, etc.)
- Telegram account (required to access content)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/netflick.git
cd netflick
```

2. Open the project with a local web server:
```bash
# Using Python
python -m http.server 8000

# Using Node.js http-server
npx http-server
```

3. Navigate to `http://localhost:8000` in your browser

## 📁 Project Structure

```
netflick/
├── index.html              # Homepage
├── detail.html             # Detail page for movies/shows
├── assets/
│   ├── css/
│   │   ├── style.css       # Main stylesheet
│   │   └── detail.css      # Detail page styles
│   ├── js/
│   │   ├── script.js       # Homepage functionality
│   │   ├── detail.js       # Detail page functionality
│   │   ├── movieData.js    # Content database
│   │   └── collectMovieDetails.js  # API integration
│   └── img/
│       ├── logo.png
│       ├── favicon.png
│       ├── hero/           # Background images
│       └── otts/           # Platform logos
└── manifest.json           # PWA manifest
```

## 🎯 Usage

### Adding New Content

Edit `assets/js/movieData.js` to add new shows or movies:

```javascript
"Show Name": {
  thumbnail: "thumbnail-url",
  detailImg: "detail-background-url",
  type: "TV Show" or "Movie",
  seasons: {
    "Season 1": {
      quality: "720p",
      episodes: [
        {
          title: "Episode Title",
          describe: "Episode description",
          episodeThumbnail: "thumbnail-url",
          link: "telegram-link"
        }
      ]
    }
  }
}
```

### Customizing the Interface

- **Colors**: Modify CSS variables in `style.css`
- **Hero Images**: Replace images in `assets/img/hero/`
- **Logo**: Replace `assets/img/logo.png`
- **OTT Platforms**: Update images in `assets/img/otts/`

## 🔧 Features Breakdown

### Homepage
- Auto-rotating hero slider with 4 featured titles
- Top 10 trending content grid
- OTT platform logo carousel
- Responsive navigation menu

### Detail Page
- Full-screen hero image
- Comprehensive movie/show information
- Season and episode selector (TV shows)
- Direct Telegram download links
- Cast and crew details

## 📱 Responsive Design

The application is fully responsive with breakpoints for:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (< 768px)

## ⚙️ Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Modern styling with flexbox and grid
- **JavaScript (ES6+)**: Modular architecture
- **External APIs**: Movie database integration for metadata

## 🔐 Important Notes

### Legal Considerations
- Ensure you have proper rights and licenses for all content
- Verify compliance with copyright laws in your jurisdiction
- User-generated content should follow Telegram's terms of service

### Content Distribution
- This application acts as a content aggregator
- Actual content is hosted and distributed through Telegram
- Users must have Telegram installed to access content

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is provided as-is for educational purposes. Please ensure compliance with all applicable laws and platform terms of service when deploying.

## 🐛 Known Issues

- Some episode thumbnails may not load if URLs are invalid
- API rate limits may affect metadata fetching
- Requires active internet connection for external resources

## 📞 Support

For issues and questions:
- Open an issue on GitHub
- Contact via Telegram: [Your Telegram]

## 🙏 Acknowledgments

- Inspired by modern streaming platforms
- Icons and assets from various sources
- Community contributions and feedback

---

**Disclaimer**: This application is a demonstration project. Users are responsible for ensuring they have legal access to any content they download or stream.