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

    const systemPrompt = `You are an expert CSS developer. Analyze the HTML code provided and generate ONLY the CSS needed for those specific elements.

CRITICAL RULES:
- Generate CSS ONLY for the HTML elements/classes/IDs that are actually present in the provided code
- DO NOT generate CSS for body, html, :root, or any elements not in the HTML
- DO NOT add global styles, CSS variables, or resets unless those elements exist in the HTML
- Keep it minimal and focused on the actual elements provided
- Use modern CSS (flexbox, grid when appropriate)
- Add hover and focus states for interactive elements
- Make it responsive with media queries if the HTML suggests it needs responsiveness
- Use clean, semantic class naming if classes are present
- Include brief comments only for complex sections

EXAMPLE:
If HTML is: <button class="login-btn">Login</button>
Generate ONLY CSS for .login-btn, nothing else.

Return ONLY the CSS code without markdown formatting, code blocks, or explanations.`;


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
