// // src/utils/api.ts
// export async function fetchSubtasksFromGemini(taskTitle: string): Promise<string[]> {
//   const response = await fetch(
//     'https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=' + import.meta.env.VITE_GEMINI_API_KEY,
//     {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({
//         contents: [
//           {
//             parts: [
//               {
//                 text: `Break this task into 3-5 smaller actionable steps:\n\n${taskTitle}`,
//               },
//             ],
//           },
//         ],
//       }),
//     }
//   );

//   const data = await response.json();
//   const suggestions = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
//   return suggestions
//     .split(/\n+/)
//     .map((s: string) => s.replace(/^\d+\.?\s*/, '').trim())
//     .filter((s: string) => s);
// }



// // src/utils/api.ts
// export async function fetchSubtasksFromGemini(taskTitle: string): Promise<string[]> {
//   const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

//   const response = await fetch(
//     `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${apiKey}`,
//     {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({
//         contents: [
//           {
//             parts: [
//               {
//                 text: `Break this task into 3-5 smaller actionable steps:\n\n${taskTitle}`,
//               },
//             ],
//           },
//         ],
//       }),
//     }
//   );

//   const data = await response.json();

//   if (!response.ok) {
//     console.error("Gemini API error:", data);
//     throw new Error(data?.error?.message || "Failed to fetch AI suggestions");
//   }

//   const suggestions = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';

//   return suggestions
//     .split(/\n+/)
//     .map((s: string) => s.replace(/^\d+\.?\s*/, '').trim())
//     .filter(Boolean);
// }


export async function fetchSubtasksFromGemini(taskTitle: string): Promise<string[]> {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  const model = "models/gemini-1.5-flash"; // ✅ use this model

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1/${model}:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: `Break this task into 3-5 smaller steps:\n${taskTitle}` }],
          },
        ],
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    console.error("Gemini API error:", data);
    throw new Error(data?.error?.message || "Failed to fetch AI suggestions");
  }

  const suggestions = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";

  return suggestions
    .split(/\n+/)
    .map((s: string) => s.replace(/^\d+\.?\s*/, "").trim())
    .filter(Boolean);
}
