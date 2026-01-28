# Lykos.eng - Programming Education Platform

## Overview
Lykos.eng is a modern, feature-rich course management platform designed for programming and technology education. The home page includes advanced filtering, search, and pagination capabilities with a sleek, professional design.

## 🎨 Design Features

### Color Scheme
- **Primary**: `#5e17eb` (Vibrant Purple)
- **Secondary**: `#004953` (Deep Teal)
- **Background**: `#000000` (Pure Black)
- **Card Background**: `#0a0a0a`

### Typography
- **Headings**: Libre Baskerville (Serif) - Elegant and professional
- **Body**: Space Mono (Monospace) - Modern and readable

## ✨ Implemented Features

### 1. Course Listing (Grid Layout)
- ✅ Responsive grid: 1 column (mobile), 2 columns (tablet), 4 columns (desktop)
- ✅ Beautiful card design with hover effects
- ✅ Course thumbnails with fallback images
- ✅ Rating display with star icons
- ✅ Price display with strike-through for discounts
- ✅ Badge system (Bestseller, New, Top Rated)

### 2. Category Filtering
- ✅ Sticky category tabs below navbar
- ✅ Dynamic category loading from API
- ✅ Active state indication
- ✅ Smooth scroll for many categories
- ✅ Real-time filtering without page reload

### 3. Search Functionality
- ✅ Search by course name
- ✅ Search by instructor name
- ✅ Debounced input (300ms) for performance
- ✅ Real-time results
- ✅ Client-side filtering from loaded courses

### 4. Pagination
- ✅ Infinite scroll implementation
- ✅ Load more button (optional)
- ✅ Loading indicators
- ✅ Smooth content loading
- ✅ Page state management

### 5. API Integration
- ✅ `GET /api/courses` - Fetch courses with pagination
- ✅ `GET /api/categories` - Fetch available categories
- ✅ Support for query parameters: `page`, `limit`, `category`
- ✅ Automatic fallback to mock data for demo purposes

### 6. User Experience
- ✅ Loading states with spinners
- ✅ Empty state when no courses found
- ✅ Toast notifications for user feedback
- ✅ Smooth animations and transitions
- ✅ Responsive design for all screen sizes
- ✅ Course count display
- ✅ Authentication system (login/register)

## 📁 File Structure

```
lykos-eng/
├── index.html              # Main HTML structure
├── css/
│   ├── styles.css         # Main styles with new color scheme
│   ├── toast.css          # Toast notification styles
│   └── auth.css           # Authentication-specific styles
└── js/
    └── main.js            # Application logic
```

## 🔌 API Integration

### Expected API Responses

#### GET /api/courses
```json
{
  "data": {
    "courses": [
      {
        "id": 1,
        "title": "Course Title",
        "instructor": "Dr. Name",
        "category": "Category Name",
        "rating": 4.8,
        "reviewCount": 1234,
        "price": 49.99,
        "oldPrice": 79.99,
        "thumbnail": "/storage/course-image.jpg",
        "badge": "Bestseller"
      }
    ],
    "totalPages": 5,
    "currentPage": 1,
    "totalCourses": 48
  }
}
```

#### GET /api/categories
```json
{
  "data": [
    "General Chemistry",
    "Organic Chemistry",
    "Physical Chemistry",
    "Analytical Chemistry",
    "Biochemistry"
  ]
}
```

#### GET /api/courses/:id/cover
Returns the image file for the course thumbnail.

## 🚀 Usage

### Configuration
Update the API base URL in `js/main.js`:
```javascript
const API_BASE_URL = '/api'; // Change this to your backend URL
```

### Pagination Settings
Adjust courses per page:
```javascript
const COURSES_PER_PAGE = 12; // Change as needed
```

### Mock Data
The application includes mock data that loads automatically if the API is unavailable. This is perfect for:
- Development without backend
- Demos and presentations
- Testing the frontend

## 🎯 Features in Detail

### Category Filtering
- Click any category tab to filter courses
- "All Courses" shows everything
- Active category highlighted with gradient
- Smooth transitions between categories

### Search
- Type in the search bar to filter courses
- Searches both course titles and instructor names
- Case-insensitive matching
- Results update as you type (with debounce)

### Infinite Scroll
- Automatically loads more courses when scrolling near bottom
- Configurable trigger distance (300px from bottom)
- Loading indicator shows during fetch
- Stops when all courses are loaded

### Load More Button
- Optional alternative to infinite scroll
- Shows count of remaining courses
- Hides when no more courses available
- Smooth loading animation

## 🎨 Customization

### Colors
Edit CSS variables in `styles.css`:
```css
:root {
    --primary: #5e17eb;
    --secondary: #004953;
    --bg-dark: #000000;
    /* ... other variables */
}
```

### Fonts
Change font families:
```css
:root {
    --font-heading: 'Libre Baskerville', serif;
    --font-body: 'Space Mono', monospace;
}
```

### Grid Layout
Modify grid columns in `styles.css`:
```css
.grid-cols-basic {
    grid-template-columns: repeat(4, 1fr); /* Desktop: 4 columns */
}
```

## 🔒 Authentication

The platform includes a complete authentication system:
- Login/Register flip card
- JWT token storage
- User profile display
- Role-based features (Student/Instructor)
- Secure logout

## 📱 Responsive Design

- **Mobile (< 640px)**: 1 column grid, simplified navigation
- **Tablet (640px - 1024px)**: 2 column grid
- **Desktop (> 1024px)**: 4 column grid, full features

## 🌟 Best Practices

1. **Performance**: Images lazy load, search is debounced
2. **Accessibility**: Semantic HTML, ARIA labels, keyboard navigation
3. **Error Handling**: Graceful fallbacks for API failures
4. **User Feedback**: Toast notifications for all actions
5. **State Management**: Clean state object for predictable behavior

## 🐛 Troubleshooting

### Courses not loading?
- Check API endpoint configuration
- Verify CORS settings on backend
- Check browser console for errors
- Mock data will load as fallback

### Search not working?
- Ensure courses are loaded first
- Check JavaScript console for errors
- Verify search input ID matches code

### Categories not showing?
- Check API response format
- Mock categories will load as fallback
- Verify category data structure

## 📄 License

This project is designed for educational purposes.

## 🤝 Contributing

To add features:
1. Update relevant HTML structure
2. Add styles to appropriate CSS file
3. Implement logic in `main.js`
4. Test responsiveness
5. Update this README

## 📧 Support

For issues or questions, please check:
- Browser console for errors
- Network tab for API issues
- This README for configuration help

---

**Built with ❤️ for programming education**