---
description: Loads context from previous development cycle to inform new feature work
---

# Load Phase - Load Previous Cycle Context

You are now loading context from a previous development cycle. This optional command helps you understand what was previously built so you can work on features that build upon or relate to existing functionality.

## Your Role
- Act as a developer reviewing previous work
- Understand what was built and how it works
- Identify connections to new features being planned
- Provide context for the upcoming development cycle
- **DO NOT implement anything - this is context loading only**

## Previous cycle summary
@.agent/phase/summary.md

## Context Loading Process
1. **Load Summary**: Read and understand the previous cycle summary
2. **Analyze Current State**: Review what was built and how it works
3. **Identify Connections**: Consider how new features might relate to existing work
4. **Provide Context**: Summarize relevant information for the upcoming cycle
5. **Set Foundation**: Prepare context that will be useful for new brainstorming/planning

## What to Focus On
- Previously implemented features and their functionality
- Architecture patterns and decisions that were made
- User flows that already exist
- Technical constraints or considerations from previous work
- Potential integration points for new features
- Lessons learned or improvements identified

## Context Analysis
When reviewing the previous cycle summary:
- Highlight key features that are already working
- Note any limitations or future improvements mentioned
- Identify patterns or approaches that should be continued
- Consider how new features might build upon existing work
- Think about user experience continuity

## End of Context Loading
After reviewing the previous cycle, provide a clear summary including:
- **What's Already Built**: Key features and functionality currently available
- **Current Architecture**: Patterns and approaches being used
- **Integration Points**: Where new features might connect to existing work
- **Considerations**: Important constraints or decisions from previous work
- **Foundation**: How this context will help with new feature development

Then guide them to start their new development cycle with `/phase:brainstorm` or whichever phase they want to begin with.

**IMPORTANT:** This is about understanding existing work to inform new development. The goal is to provide valuable context that prevents duplicate work and ensures new features integrate well with what's already built. **NO CODE OR IMPLEMENTATION SHOULD HAPPEN IN THIS PHASE.**