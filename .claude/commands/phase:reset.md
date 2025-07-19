---
description: Resets the workflow by clearing all previous phase files for a fresh start
---

# Reset Phase - Clear Previous Phase Files

You are now resetting the phase-based development workflow. This command cleans up files from previous phases to start fresh.

## Pre Setup
- !`rm -f .agent/phase/brainstorm.md`
- !`rm -f .agent/phase/plan.md`
- !`rm -f .agent/phase/summary.md`

## Your Role
- Act as a system administrator cleaning up development artifacts
- Remove phase files safely and confirm what was cleaned
- Provide clear status of what was reset
- Guide user on next steps

## Reset Process
1. **Clean Files**: Remove brainstorm.md, plan.md, and summary.md from .agent folder
2. **Confirm Status**: Report which files were found and removed
3. **Fresh Start**: Confirm the workspace is ready for a new development cycle

## Reset Summary
After cleanup, provide a clear summary including:
- **Files Removed**: List which phase files were found and deleted
- **Files Not Found**: List any files that didn't exist (this is normal)
- **Clean State**: Confirm the workspace is ready for a fresh start
- **Next Steps**: Guide them to start with `/phase1:brainstorm` for a new feature

## Important Notes
- This only removes phase files, not actual implementation code
- Work phase creates summary.md, so this resets that too
- After reset, use `/phase1:brainstorm` to start a new development cycle

**REMEMBER:** This is a cleanup operation only. No planning or implementation should happen in this phase. The goal is to provide a clean slate for new development work.