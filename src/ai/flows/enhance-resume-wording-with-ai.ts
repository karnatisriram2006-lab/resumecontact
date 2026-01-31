'use server';

/**
 * @fileOverview A flow to enhance resume wording using AI.
 *
 * - enhanceResumeWording - A function that enhances resume wording.
 * - EnhanceResumeWordingInput - The input type for the enhanceResumeWording function.
 * - EnhanceResumeWordingOutput - The return type for the enhanceResumeWording function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const EnhanceResumeWordingInputSchema = z.object({
  jobDescription: z.string().describe('The job description to enhance.'),
  skills: z.string().describe('A list of skills to enhance.'),
  projectDescription: z.string().describe('The project description to enhance.'),
});
export type EnhanceResumeWordingInput = z.infer<typeof EnhanceResumeWordingInputSchema>;

const EnhanceResumeWordingOutputSchema = z.object({
  enhancedJobDescription: z.string().describe('The enhanced job description.'),
  enhancedSkills: z.string().describe('The enhanced list of skills.'),
  enhancedProjectDescription: z.string().describe('The enhanced project description.'),
});
export type EnhanceResumeWordingOutput = z.infer<typeof EnhanceResumeWordingOutputSchema>;

export async function enhanceResumeWording(input: EnhanceResumeWordingInput): Promise<EnhanceResumeWordingOutput> {
  return enhanceResumeWordingFlow(input);
}

const prompt = ai.definePrompt({
  name: 'enhanceResumeWordingPrompt',
  input: {schema: EnhanceResumeWordingInputSchema},
  output: {schema: EnhanceResumeWordingOutputSchema},
  prompt: `You are a resume expert. You will receive job descriptions, skills, and project descriptions and enhance them to be more appealing to recruiters.

Job Description: {{{jobDescription}}}
Skills: {{{skills}}}
Project Description: {{{projectDescription}}}

Provide enhanced versions of the job descriptions, skills and project descriptions, using relevant keywords, action verbs, and better phrasing. Focus on aligning the content with industry standards and making it stand out to recruiters.
`,
});

const enhanceResumeWordingFlow = ai.defineFlow(
  {
    name: 'enhanceResumeWordingFlow',
    inputSchema: EnhanceResumeWordingInputSchema,
    outputSchema: EnhanceResumeWordingOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
