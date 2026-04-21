# Jorge Greus Portfolio

Personal portfolio website for Jorge Greus Herrero, focused on AI engineering, machine learning, generative AI, and data systems.

## Credit

This portfolio is based on an original portfolio project/template by [@red1-for-hek](https://github.com/red1-for-hek).
The project has been adapted and customized for Jorge Greus, including content, structure, styling, assets, and deployment setup.

## Stack

- React
- TypeScript
- Vite
- GSAP
- Three.js
- WebGL
- Vercel Functions

## Local Development

Install dependencies:

```bash
npm install
```

Create your local environment file:

```bash
cp .env.example .env.local
```

Add your `GROQ_API_KEY` to `.env.local`, then start the dev server:

```bash
npm run dev
```

## Production

This project is configured to deploy on Vercel.

- Frontend: Vite static build
- Backend: `api/chat.js`
- Required environment variable: `GROQ_API_KEY`

## License

This project is available under the [MIT License](LICENSE).
