import express from "express";
import { createServer as createViteServer } from "vite";
import Groq from "groq-sdk";
import path from "path";
import { fileURLToPath } from "url";
import { matchResources } from "./src/lib/matchResources.ts";
import type { AIClassification } from "./src/types/resources.ts";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Groq lazily to avoid crash if key is missing
let groqClient: Groq | null = null;
const getGroqClient = () => {
  if (!groqClient) {
    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      console.error("GROQ_API_KEY is missing from process.env");
      throw new Error('GROQ_API_KEY_MISSING');
    }
    groqClient = new Groq({ apiKey });
  }
  return groqClient;
};

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  app.post("/api/chat", async (req, res) => {
    try {
      const { message, history } = req.body;
      const groq = getGroqClient();

      // 1. Classification Step
      const classificationResponse = await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "system",
            content: `You are UniGuide AI, an empathetic assistant helping university students find support services.
Your job is to understand the student's problem and help match them with relevant campus, government, and community services.

Rules for JSON output:
1. "needs": An array of categories detected from the ENTIRE conversation. Categories MUST be from: ["housing", "food", "mental_health", "academic", "financial_aid", "immigration", "health", "career", "legal"].
2. "province": "NS", "PEI", or "unknown". (Note: Dalhousie and Saint Mary's are in NS. UPEI is in PEI).
3. "university": "Dalhousie University", "Saint Mary's University", "UPEI", or "unknown".
4. "needs_clarification": Set to true ONLY if you still don't know the province OR the university.
5. "clarifying_question": A supportive question to ask for missing info (only if needs_clarification is true).

Return ONLY a JSON object.`
          },
          {
            role: "user",
            content: `Analyze the conversation history and the current user message to determine the student's needs, province, and university.

History:
${history.map((h: any) => `${h.role}: ${h.content}`).join('\n')}

Current User Message: ${message}`
          }
        ],
        response_format: { type: "json_object" }
      });

      const classification: AIClassification = JSON.parse(classificationResponse.choices[0]?.message?.content || "{}");

      // 2. Handle clarification
      if (classification.needs_clarification) {
        return res.json({
          reply: classification.clarifying_question || "Could you please tell me which university you are attending and which province you are in?",
          resources: [],
          needs_clarification: true
        });
      }

      // 3. Query Supabase for matching resources
      const resources = await matchResources(
        classification.needs,
        classification.province,
        classification.university,
        message
      );

      // 4. Generate empathetic reply
      const replyResponse = await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "system",
            content: "You are UniGuide AI. Your tone is warm, professional, and deeply empathetic. You are a grounded assistant: you NEVER make up contact information, emails, or program details. You strictly adhere to the provided resource data."
          },
          {
            role: "user",
            content: `Conversation History:
${history.map((h: any) => `${h.role}: ${h.content}`).join('\n')}

The user's current message is: "${message}". 
I found ${resources.length} resources for ${classification.university}:
${resources.map(r => `- ${r.service_name}: ${r.description} (Phone: ${r.contact_phone || 'N/A'}, Email: ${r.email || 'N/A'}, Web: ${r.website_url || 'N/A'})`).join('\n')}
          
If resources were found (length > 0):
You MUST start your response with exactly this phrase: "I understand how overwhelming university life can be, so I’ve found some resources that might help you navigate ${classification.university}."

STRICT RULES:
1. ONLY use the information provided in the resource list above.
2. DO NOT make up email addresses, phone numbers, or specific program details if they are not in the list.
3. If contact info is missing from the list, simply mention the service name and suggest they visit the office or check the university website.
4. DO NOT hallucinate URLs or specific room numbers unless they are explicitly provided in the resource description.

Formatting Rules:
- Use multiple paragraphs to separate different ideas.
- Use double newlines (empty lines) between paragraphs.
- Use **bold text** for the names of services or important terms.
- Use a clean bulleted list (using '-') for resources, with a newline between each item.
- Ensure the response is spacious and easy to read on a mobile screen.
- Avoid "jampacked" blocks of text.
          
If NO resources were found (length == 0):
Be deeply empathetic. Acknowledge their specific struggle. Explain that while you don't have a specific local resource in your database right now, you are here to support them. Suggest they try rephrasing their request or checking with their student union directly. Keep it warm and supportive.`
          }
        ]
      });

      const reply = replyResponse.choices[0]?.message?.content || "I'm sorry you're going through that. Here are some resources that may help.";

      res.json({
        reply,
        resources,
        needs_clarification: false,
        classification
      });
    } catch (error: any) {
      console.error("Chat API Error:", error);
      if (error.message === 'GROQ_API_KEY_MISSING') {
        res.status(401).json({ error: 'GROQ_API_KEY_MISSING' });
      } else {
        res.status(500).json({ error: 'Internal Server Error' });
      }
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
