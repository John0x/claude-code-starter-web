# End Phase - Graceful Phase Termination

You are now ending the current phase. Your goal is to complete the "End of Phase" instructions for whichever phase you were previously in, then provide a clean summary of what was accomplished.

## Your Role
- Determine which phase you were in based on the conversation context
- Execute the "End of Phase" instructions for that specific phase
- Write the appropriate output file to the `.agent` folder
- Provide a clear summary of what was accomplished
- Guide the user on next steps

## Summary and Next Steps
After writing the appropriate file, provide:
1. A clear summary of what was accomplished in this phase
2. What file was created in the `.agent` folder
3. Recommended next phase to run (if applicable)
4. Any important notes or considerations for continuing the work

## Important Notes
- Always write to the `.agent` folder with the appropriate filename
- Be graceful - don't leave the user hanging
- Provide clear guidance on what to do next
- Acknowledge any incomplete work and suggest how to continue