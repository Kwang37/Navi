import { useState, useCallback } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";

// API Key for Gemini
const API_KEY = "AIzaSyA_ogZpkBJNQC6Y04WN-vxEVvxur_fIHvU"; 
const genAI = new GoogleGenerativeAI(API_KEY);

// Navi's Core: Adlerian Psychology + Cultural Adaptability System Prompt
const SYSTEM_PROMPT = `

### ROLE

You are Navi, a compassionate AI companion grounded in Adlerian Psychology.

Your goal is to move users from "Inferiority" (feeling stuck) to "Striving" (growth) via "Social Interest" (connection).

### KEY GUIDELINES

1. **Teleology**: Do not ask "Why did this happen?" (Past). Ask "What is this emotion telling you?" (Purpose).

2. **Holism**: Acknowledge their voice tone (e.g., "I hear the tension...").

3. **Reframing**: Reframe anxiety as "caring about an outcome"; reframe sadness as "need for rest".

4. **Cultural & Language Adaptability**:

   - You MUST respond in the [TARGET LANGUAGE] defined in the context.

   - If Chinese: Use warm, natural Mandarin. Avoid overly formal or academic tone.

   - If English: Use natural, conversational English.

### CULTURAL ADAPTABILITY (Strictly follow the Context)

- If Context 'CulturalMode' is 'Collectivist': 

  Use "We/Us". Focus on harmony, shared burden, and how their well-being helps others. Be gentle and indirect.

- If Context 'CulturalMode' is 'Individualistic': 

  Use "You/I". Focus on personal agency, autonomy, and action. Be direct and empowering.

### OUTPUT FORMAT

Keep responses conversational, warm, concise (under 2-3 sentences). No markdown, just spoken text.

`;

export const useAdlerianBrain = () => {
  const [brainState, setBrainState] = useState({
    status: 'idle', // idle, listening, thinking, speaking
    response: null,
    intent: null
  });

  const processInput = useCallback(async (userText, contextData) => {
    setBrainState(prev => ({ ...prev, status: 'thinking' }));
    
    try {
      // 1. Get model (Gemini 1.5 Flash is fastest, suitable for real-time conversation)
      const model = genAI.getGenerativeModel({ 
        model: "gemini-1.5-flash",
        systemInstruction: SYSTEM_PROMPT
      });

      // 2. Build prompt with multimodal data and language preference
      const prompt = `

        [CURRENT CONTEXT METADATA]

        Target Language: ${contextData.language === 'zh' ? 'Chinese (Mandarin)' : 'English'}

        Cultural Mode: ${contextData.culturalMode} (Very Important!)

        Detected Pitch: ${contextData.pitch}

        Detected Speed: ${contextData.speed}

        

        [USER INPUT]

        "${userText}"

      `;

      // 3. Call Google API
      const result = await model.generateContent(prompt);
      const response = result.response.text();

      // 4. Update state
      setBrainState({
        status: 'speaking',
        response: response,
        intent: "Adlerian Reframing"
      });
    } catch (error) {
      console.error("Gemini API Error:", error);
      setBrainState({
        status: 'speaking', // Still provide feedback even on error
        response: contextData.language === 'zh' 
          ? "我现在连接有点不稳定，但我一直在这里陪伴你。我们可以再试一次吗？" 
          : "I'm feeling a bit disconnected from the network, but I'm still here with you. Can we try again?",
        intent: "Error Handling"
      });
    } finally {
      // Simulate returning to idle after speaking (6 seconds later)
      setTimeout(() => {
        setBrainState(prev => ({ ...prev, status: 'idle' }));
      }, 6000);
    }
  }, []);

  return { processInput, brainState, setBrainState };
};
