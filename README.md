# Dr. B.R. Ambedkar - Interactive Microsite

An outstanding multimedia microsite dedicated to Dr. Bhimrao Ramji Ambedkar, showcasing his life, mission, and legacy through interactive elements and modern web design.

## Features

### 🎯 Three Main Sections

1. **The Man** - Explore Dr. Ambedkar's personality, principles, and achievements through interactive cards
2. **The Mission** - Understand his constitutional role with animated explanations of rights and duties
3. **The Legacy** - Discover his modern-day impact with timelines, stories, and a tribute wall

### ✨ Interactive Elements

- **3D Hero Section** - Stunning 3D representation of Dr. Ambedkar using Three.js
- **Interactive Cards** - Expandable cards revealing detailed information
- **Quote Carousel** - Rotating collection of inspirational quotes
- **Constitution Explainer** - Interactive guide to fundamental rights and duties
- **Timeline Section** - Animated timeline of key life events
- **Tribute Wall** - User-generated tributes and messages
- **Ask Ambedkar** - AI-powered chat interface for engaging with Ambedkar's philosophy

### 🎨 Design Highlights

- Modern, responsive design with smooth animations
- Beautiful gradient backgrounds and color schemes
- Smooth scrolling and navigation
- Mobile-first approach
- Accessible and user-friendly interface

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Navigate to the BR directory:
```bash
cd BR
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building for Production

```bash
npm run build
npm start
```

## Project Structure

```
BR/
├── app/
│   ├── layout.tsx          # Root layout with navigation
│   ├── page.tsx            # Homepage
│   ├── globals.css         # Global styles
│   ├── api/
│   │   └── chat/
│   │       └── route.ts    # AI chat API route
│   ├── the-man/            # The Man section
│   ├── the-mission/        # The Mission section
│   └── the-legacy/         # The Legacy section
├── components/
│   ├── Hero3D.tsx          # 3D hero section
│   ├── NavigationMenu.tsx  # Navigation bar
│   ├── InteractiveCard.tsx # Expandable cards
│   ├── QuoteCarousel.tsx   # Quote carousel
│   ├── ConstitutionExplainer.tsx # Rights & duties
│   ├── TimelineSection.tsx # Timeline component
│   ├── TributeWall.tsx     # Tribute wall
│   └── AskAmbedkar.tsx     # AI chat interface
├── lib/
│   ├── utils.ts            # Utility functions
│   └── ambedkar-data.ts    # Content data
├── public/                 # Static assets
├── .env.local              # Environment variables (not in git)
└── AI_INTEGRATION.md       # AI integration documentation
```

## Technologies Used

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Three.js / React Three Fiber** - 3D graphics
- **Lucide React** - Icons

## Adding a 3D Model

To add a custom 3D model of Dr. Ambedkar:

1. Place your `.glb` or `.gltf` file in the `public/` directory
2. Name it `ambedkar-model.glb`
3. The `Hero3D` component will automatically load it

## Customization

### Content

Edit `lib/ambedkar-data.ts` to update:
- Quotes
- Achievements
- Timeline events
- Constitutional rights and duties

### Styling

Modify `tailwind.config.ts` and `app/globals.css` for custom colors and styles.

## AI Integration

The "Ask Ambedkar" feature is fully integrated with OpenRouter AI, allowing users to have real-time conversations about Dr. Ambedkar's philosophy, writings, and legacy.

**Integration Status:** ✅ Complete

For detailed documentation on the AI integration, see [AI_INTEGRATION.md](./AI_INTEGRATION.md)

### Quick Setup

1. Create `.env.local` file in project root
2. Add your OpenRouter API key:
   ```bash
   OPENROUTER_API_KEY=your-api-key-here
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   NEXT_PUBLIC_SITE_NAME=Dr. B.R. Ambedkar - Architect of Modern India
   ```
3. Restart the development server
4. Click the chat button to start conversing with AI

### Architecture

- **Frontend:** `components/AskAmbedkar.tsx` - Chat UI component
- **Backend:** `app/api/chat/route.ts` - Secure API route for OpenRouter
- **Model:** `google/gemma-3n-e2b-it:free` (OpenRouter)

The API key is stored securely server-side and never exposed to the browser.

## License

This project is created for educational and commemorative purposes.

#### Acknowledgments

Dedicated to Dr. B.R. Ambedkar and his vision of social justice, equality, and democracy.