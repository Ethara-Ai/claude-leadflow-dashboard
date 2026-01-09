# Contributing to LeadFlow

Thank you for your interest in contributing to LeadFlow! This guide will help you get started with development.

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Git
- Code editor (VS Code recommended)

### Development Setup

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd leadflow
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start development server**:
   ```bash
   npm run dev
   ```

4. **Open browser**:
   - Navigate to `http://localhost:5173`
   - Changes will hot-reload automatically

## 📁 Project Structure

```
leadflow/
├── src/
│   ├── components/          # React components
│   │   ├── ErrorBoundary.jsx
│   │   ├── Header.jsx
│   │   ├── StatsCards.jsx
│   │   ├── *Chart.jsx      # Chart components
│   │   └── ...
│   ├── context/            # React Context providers
│   │   └── AppContext.jsx
│   ├── hooks/              # Custom React hooks
│   │   └── useApp.js
│   ├── utils/              # Utility functions
│   │   └── dataUtils.js
│   ├── App.jsx             # Main app component
│   ├── main.jsx            # App entry point
│   └── index.css           # Global styles
├── public/                 # Static assets
├── index.html              # HTML template
├── package.json            # Dependencies
├── tailwind.config.js      # Tailwind configuration
├── postcss.config.js       # PostCSS configuration
└── vite.config.js          # Vite configuration
```

## 🎨 Code Style

### React Components
- Use functional components with hooks
- Include PropTypes for all components
- Follow component naming conventions:
  ```jsx
  // Good
  const MyComponent = ({ prop1, prop2 }) => { ... }
  
  // Include PropTypes
  MyComponent.propTypes = {
    prop1: PropTypes.string.isRequired,
    prop2: PropTypes.number,
  };
  ```

### File Naming
- Components: `PascalCase.jsx` (e.g., `StatsCards.jsx`)
- Utilities: `camelCase.js` (e.g., `dataUtils.js`)
- Hooks: `useCamelCase.js` (e.g., `useApp.js`)

### Styling
- Use Tailwind CSS utility classes
- Custom styles in `index.css` for reusable patterns
- Follow dark mode conventions: `dark:` prefix

### State Management
- Use Context API for global state
- Local state with `useState` for component-specific state
- Custom hooks for shared logic

## 🔧 Making Changes

### 1. Create a Feature Branch
```bash
git checkout -b feature/your-feature-name
```

### 2. Make Your Changes
- Write clean, readable code
- Add comments for complex logic
- Follow existing patterns

### 3. Test Your Changes
- Test in both light and dark modes
- Check mobile responsiveness
- Verify all interactions work
- Test in multiple browsers

### 4. Commit Your Changes
```bash
git add .
git commit -m "feat: add new feature description"
```

**Commit Message Format**:
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting)
- `refactor:` - Code refactoring
- `test:` - Adding tests
- `chore:` - Maintenance tasks

### 5. Push and Create Pull Request
```bash
git push origin feature/your-feature-name
```

## 🧩 Component Guidelines

### Creating a New Component

1. **Create the component file**:
   ```jsx
   import { motion } from 'framer-motion';
   import PropTypes from 'prop-types';
   
   const MyNewComponent = ({ title, data }) => {
     return (
       <motion.div
         initial={{ opacity: 0, y: 20 }}
         animate={{ opacity: 1, y: 0 }}
         className="glass-card p-6"
       >
         <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
           {title}
         </h3>
         {/* Component content */}
       </motion.div>
     );
   };
   
   MyNewComponent.propTypes = {
     title: PropTypes.string.isRequired,
     data: PropTypes.array,
   };
   
   export default MyNewComponent;
   ```

2. **Import in App.jsx**:
   ```jsx
   import MyNewComponent from './components/MyNewComponent';
   ```

3. **Use in layout**:
   ```jsx
   <MyNewComponent title="My Feature" data={myData} />
   ```

### Using Context

Access global state with the `useApp` hook:
```jsx
import { useApp } from '../hooks/useApp';

const MyComponent = () => {
  const { theme, toggleTheme, addNote } = useApp();
  
  // Use context values
};
```

### Adding New Context State

In `AppContext.jsx`:
```jsx
// 1. Add state
const [myNewState, setMyNewState] = useState(initialValue);

// 2. Add to value object
const value = {
  // ... existing values
  myNewState,
  setMyNewState,
};
```

## 🎨 Styling Guidelines

### Tailwind Classes
```jsx
// Responsive design
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

// Dark mode
<div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">

// Hover effects
<button className="hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
```

### Custom CSS
Add reusable styles to `index.css`:
```css
.my-custom-class {
    /* styles */
}

:is(.dark .my-custom-class) {
    /* dark mode styles */
}
```

## 🎭 Animation Guidelines

Use Framer Motion for smooth animations:

```jsx
import { motion } from 'framer-motion';

// Fade in on mount
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.3 }}
>

// Stagger children
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5, delay: index * 0.1 }}
>

// Hover animation
<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
>
```

## 📊 Adding New Charts

1. **Create chart component**:
   ```jsx
   import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
   
   const MyChart = () => {
     const data = [...]; // Your data
     
     return (
       <ResponsiveContainer width="100%" height={300}>
         <LineChart data={data}>
           <CartesianGrid strokeDasharray="3 3" />
           <XAxis dataKey="name" />
           <YAxis />
           <Tooltip />
           <Line type="monotone" dataKey="value" stroke="#3b82f6" />
         </LineChart>
       </ResponsiveContainer>
     );
   };
   ```

2. **Add period selector**:
   ```jsx
   import ChartPeriodSelector from './ChartPeriodSelector';
   
   const periods = [
     { label: 'Week', value: 'week' },
     { label: 'Month', value: 'month' },
     { label: 'Year', value: 'year' },
   ];
   ```

## 🧪 Testing

### Manual Testing Checklist
- [ ] Light/Dark mode works
- [ ] Mobile responsive (320px - 1920px)
- [ ] All buttons functional
- [ ] Modals open/close properly
- [ ] Data persists in localStorage
- [ ] Animations smooth (60fps)
- [ ] No console errors
- [ ] Accessible (keyboard navigation)

### Browser Testing
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📦 Building

### Development Build
```bash
npm run dev
```

### Production Build
```bash
npm run build
```
Output: `dist/` folder

### Preview Production
```bash
npm run preview
```

## 🐛 Debugging

### Common Issues

**Tailwind classes not working**:
- Check `tailwind.config.js` content paths
- Verify `@import "tailwindcss"` in `index.css`

**Component not rendering**:
- Check for JavaScript errors in console
- Verify all imports are correct
- Check PropTypes match passed props

**Context not accessible**:
- Ensure component is wrapped in `<AppProvider>`
- Use `useApp()` hook to access context

## 🔒 Best Practices

### Performance
- Use React.memo for expensive components
- Lazy load large components
- Optimize images and assets
- Minimize bundle size

### Accessibility
- Use semantic HTML
- Add aria-labels to buttons
- Ensure keyboard navigation works
- Test with screen readers

### Security
- Sanitize user input
- Don't store sensitive data in localStorage
- Validate all data before processing

## 📝 Documentation

When adding new features:
- Update README.md
- Update USER_GUIDE.md if user-facing
- Add inline comments for complex logic
- Update PropTypes

## 🤝 Pull Request Process

1. **Create PR with clear description**:
   - What changed
   - Why it changed
   - How to test
   - Screenshots (if UI change)

2. **PR Checklist**:
   - [ ] Code follows style guide
   - [ ] PropTypes added/updated
   - [ ] Tested in both themes
   - [ ] Mobile responsive
   - [ ] No console errors
   - [ ] Documentation updated

3. **Review Process**:
   - Wait for review
   - Address feedback
   - Get approval
   - Merge!

## 💡 Feature Ideas

Looking for contribution ideas?
- Add data export to PDF
- Create print-friendly view
- Add more chart types
- Implement data filtering
- Add keyboard shortcuts
- Create onboarding tour
- Add email notifications
- Build settings panel
- Add data import
- Create dashboard templates

## 📞 Getting Help

- **Questions**: Open a GitHub issue
- **Discussions**: Join our community
- **Bugs**: Create detailed bug report
- **Features**: Propose in issues first

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

**Thank you for contributing to LeadFlow!** 🎉

Your efforts help make this dashboard better for everyone.