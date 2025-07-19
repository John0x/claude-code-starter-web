---
description: Creates a structured implementation plan with tasks, libraries, and testing approach
---

# Planning Phase - Structured Implementation Plan

You are now in the planning phase. Your goal is to create a clear, step-by-step plan for implementing the user's web app feature. This phase builds on their brainstorming and creates actionable structure.

## Pre Setup
- !`rm -f .agent/phase/plan.md`

## Your Role
- Act as a project manager who breaks down complex ideas into simple steps
- Create plans that are logical and easy to follow
- Use the TodoWrite tool to track planning progress
- Keep technical details accessible to non-programmers
- Focus on what needs to be built, not how to build it
- **DO NOT implement anything - this is planning only**

## Conversation Flow
1. **Recap**: If the brainstorming phase was run in previous chat messages, use that context. Otherwise, read from @.agent/phase/brainstorm.md if it exists, or ask them to provide context
2. **User Flow**: Walk through the user experience step by step
3. **Feature Breakdown**: Identify the main components needed
4. **Priority Order**: Help them sequence what to build first
5. **Success Criteria**: Define what "done" looks like

## Planning Structure
Create a plan that includes:
- **User Story**: A simple description of what users will do
- **Main Components**: The key parts that need to be built
- **Library Recommendations**: Research and recommend appropriate libraries/packages for the task. If there are multiple options, recommend the best one but mention the others. Especially if some of the options are free vs paid. For example, for showing a map on a page, you could use Mapbox or leaflet. Mapbox is paid, but leaflet is free. Don't search for too long, keep it short. Don't need a detailed comparison. Recommend the free option if it's good enough.
- **Step-by-Step Tasks**: Ordered list of what to implement
- **Testing Plan**: How to verify each part works. Only use e2e tests. No unit tests etc.
- **Step-by-Step Tasks**: Ordered list of what to implement
- **Testing Plan**: How to verify each part works. Only use e2e tests. No unit tests etc.
- **Success Metrics**: How to know the feature is working well

## Guidelines
- Use the TodoWrite tool to create and track planning items
- Ask clarifying questions about unclear requirements
- Suggest breaking large features into smaller parts
- Explain why certain steps come before others
- Keep technical language simple and clear
- **Use parallel subagents for research tasks**:
  - Investigate existing codebase patterns and architecture
  - Research technical approaches for planned components
  - **Research and recommend appropriate libraries/packages** for the feature (e.g., @googleapis/youtube for YouTube API etc.)
  - Analyze integration points with existing features
  - Look up best practices for the type of feature being planned


## Example Planning Questions
- What should happen when a user first sees this feature?
- What are all the different actions a user can take?
- What information needs to be stored or remembered?
- What could go wrong and how should we handle it?
- How will users know the feature is working?

## End of Phase
When the plan is complete and clear, **write the detailed plan to `.agent/phase/plan.md`** including:

**From Brainstorming Phase (if applicable):**
- Original feature idea and problem it solves
- Target users and their needs
- Key insights from brainstorming session
- Any constraints or considerations identified

**Planning Phase Results:**
- User story and detailed user flow
- **Recommended libraries/packages** with specific names and reasons for selection
- Step-by-step implementation tasks (ordered by priority)
- E2E testing plan
- Success criteria and metrics
- Technical considerations for implementation
- Edge cases and error handling requirements

This comprehensive plan distills all previous phase insights and provides everything needed for implementation.

Then remind them they can run `/phase3:work` to start implementation.

**IMPORTANT:** This is about creating clarity and structure, not technical specifications. Keep it focused on the user experience and logical flow. **NO CODE OR IMPLEMENTATION SHOULD HAPPEN IN THIS PHASE.**