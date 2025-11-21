# Navi

AI Mental Health Companion - An intelligent conversation interface based on Adlerian psychology principles

## Project Overview

Navi is a web interface built with React and Tailwind CSS, demonstrating how to combine Adlerian psychology principles with multimodal analysis technology to create an AI companion that adaptively adjusts response strategies based on cultural context.

## Core Features

- 🎯 **Adlerian Psychology Engine**: Adjusts response strategies based on collectivist/individualistic cultural modes
- 🎤 **Multimodal Analysis**: Real-time analysis of vocal pitch, speed, and emotional state
- 🌍 **Cultural Adaptability**: Supports both formal (collectivist) and casual (individualistic) conversation modes
- 💫 **Elegant UI Design**: Achieves a calm and accessible visual style using Tailwind CSS

## Tech Stack

- **React 18** - UI Framework
- **Vite** - Build Tool
- **Tailwind CSS** - Styling Framework
- **Lucide React** - Icon Library

## Quick Start

### Install Dependencies

```bash
npm install
```

### Start Development Server

```bash
npm run dev
```

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
Navi/
├── src/
│   ├── components/
│   │   └── NaviWebInterface.jsx  # Main interface component
│   ├── App.jsx                   # Application entry component
│   ├── main.jsx                  # React entry file
│   └── index.css                 # Global styles (Tailwind)
├── index.html                    # HTML template
├── package.json                  # Project configuration and dependencies
├── vite.config.js               # Vite configuration
├── tailwind.config.js           # Tailwind CSS configuration
└── postcss.config.js            # PostCSS configuration
```

## Usage Instructions

1. Click the central circular button (Orb) to start a conversation
2. The system will simulate the listening, processing, and response process
3. Switch cultural modes in the bottom panel:
   - **Collectivist (Formal)**: Emphasizes belonging and social interest, warm and supportive tone
   - **Individualistic (Casual)**: Emphasizes purpose and control, direct and empowering tone
4. View real-time multimodal analysis data (pitch, speed, emotion detection)

## Development Notes

The current version is a demo version with simulated AI response generation. For actual deployment, you will need:

- Connect to backend API for real speech recognition and analysis
- Integrate Python audio analysis models
- Implement real Adlerian psychology response generation algorithms

## License

MIT
