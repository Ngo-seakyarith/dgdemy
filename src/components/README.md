# Components Organization

This project uses a well-organized component structure grouped by functionality:

## 📁 Folder Structure

```
src/components/
├── ui/                    # Common UI components
│   ├── LoadingSpinner.tsx
│   ├── EmptyState.tsx
│   ├── PageTransition.tsx
│   └── index.ts
├── news/                  # News-related components
│   ├── NewsCard.tsx
│   ├── NewsGrid.tsx
│   ├── NewsModal.tsx
│   ├── NewsHeader.tsx
│   ├── CategoryFilter.tsx
│   └── index.ts
├── dashboard/             # Dashboard page components
│   ├── HeroSection.tsx
│   ├── AboutSection.tsx
│   ├── TrainersSection.tsx
│   ├── CallToAction.tsx
│   └── index.ts
├── shared/                # Shared/reusable components
│   ├── TrainerCard.tsx
│   └── index.ts
└── index.ts              # Main export file
```

## 🎯 Component Categories

### UI Components (`ui/`)
Common, reusable UI elements used throughout the application:
- **LoadingSpinner** - Loading indicator with animations
- **EmptyState** - Empty state display with optional actions
- **PageTransition** - Smooth page transition wrapper

### News Components (`news/`)
Components specifically for the AI news functionality:
- **NewsCard** - Individual news article card
- **NewsGrid** - Grid layout for news cards
- **NewsModal** - Modal for viewing full news articles
- **NewsHeader** - Header section with stats
- **CategoryFilter** - Filter news by categories

### Dashboard Components (`dashboard/`)
Components for the main dashboard landing page:
- **HeroSection** - Hero banner with call-to-action
- **AboutSection** - About section with feature cards
- **TrainersSection** - Trainers display with animations
- **CallToAction** - Call-to-action section

### Shared Components (`shared/`)
Components that can be used across multiple sections:
- **TrainerCard** - Trainer profile card

## 📝 Usage

### Clean Imports
```tsx
// Import individual components
import { NewsCard, NewsGrid } from '../components/news';

// Import from main index
import { PageTransition, HeroSection } from '../components';

// Import specific category
import { LoadingSpinner, EmptyState } from '../components/ui';
```

### Adding New Components
1. Create the component file in the appropriate folder
2. Add export to the folder's `index.ts`
3. Update the main `index.ts` if needed
4. Update this README

## 🎨 Benefits

- **Better Organization** - Related components are grouped together
- **Easier Maintenance** - Clear separation of concerns
- **Scalability** - Easy to add new components in appropriate categories
- **Clean Imports** - Simplified import statements
- **Team Collaboration** - Clear structure for team members

## 🔧 Development Guidelines

- Place new UI components in `ui/`
- News-related components go in `news/`
- Dashboard-specific components in `dashboard/`
- Shared components that span multiple areas in `shared/`
- Always update the corresponding `index.ts` files when adding new components
