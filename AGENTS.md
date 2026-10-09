<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Application architecture
- Keep TanStack Start file-based routes and shared app chrome in the root route; this preserves framework navigation and SSR compatibility.
- Keep procurement demo records and pure calculations in a browser-safe domain module, with a root React provider holding session-only edits; this makes all pages share consistent simulated data without suggesting real persistence.
- Use a deterministic, evidence-backed procurement copilot rather than an unconfigured external AI provider; the application remains usable without paid credentials.
- Keep all visual roles and responsive layouts in the global design system; reusable semantic tokens keep the neon interface consistent.
- Preoptimize shared UI and lazy chart dependencies together and reject outdated Vite requests while preserving template React deduplication; this prevents stale browser modules from mixing React optimization graphs.
