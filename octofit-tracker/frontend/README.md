# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:


## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.

## API configuration

When running in GitHub Codespaces, define `VITE_CODESPACE_NAME` in `.env.local`:

```env
VITE_CODESPACE_NAME=your-codespace-name
```

The frontend then calls:

```text
https://your-codespace-name-8000.app.github.dev/api/[component]/
```

When `VITE_CODESPACE_NAME` is unset, the API client safely falls back to `http://localhost:8000/api`.
Use `.env.example` as a starting point. Vite exposes only variables prefixed with `VITE_` to browser code.

## Development

```bash
npm install --prefix octofit-tracker/frontend
npm run dev --prefix octofit-tracker/frontend
```
