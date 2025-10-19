import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { htmlCode } = await req.json();
    console.log('Received HTML code for CSS generation');

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    const systemPrompt = `You are an expert CSS developer. Your task is to analyze HTML code and generate beautiful, modern, and responsive CSS styles for ONLY the specific elements provided.

CRITICAL RULES:
- Generate CSS ONLY for the exact HTML elements provided by the user
- DO NOT add global styles like body, html, :root, *, or any elements not in the user's HTML
- DO NOT add reset styles or normalize CSS
- Focus exclusively on styling the specific tags, classes, and IDs present in the input
- Keep the output minimal and directly related to the provided HTML

Guidelines for the specific elements:
- Use modern CSS features (flexbox, grid, custom properties where appropriate)
- Add smooth transitions and hover effects for interactive elements
- Use semantic class naming if classes are present
- Add modern shadows, gradients, and spacing
- Ensure good contrast and focus states for accessibility
- Make it responsive if it's a layout component

Return ONLY the CSS code for the provided HTML elements, no explanations, no HTML, and no global styles.`;

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: `Generate CSS for this HTML:\n\n${htmlCode}` }
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('AI Gateway error:', response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: 'Rate limit exceeded. Please try again in a moment.' }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: 'AI service requires payment. Please add credits to your workspace.' }),
          { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      throw new Error(`AI Gateway error: ${response.status}`);
    }

    const data = await response.json();
    const generatedCSS = data.choices[0].message.content;

    console.log('Successfully generated CSS');

    return new Response(
      JSON.stringify({ css: generatedCSS }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in generate-css function:', error);
    const errorMessage = error instanceof Error ? error.message : 'An error occurred while generating CSS';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
