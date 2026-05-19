# SSO Project - Custom UI with Zitadel

This repository contains the Single Sign-On (SSO) system architecture utilizing **Zitadel** as the Identity Provider (IdP) and **Next.js** as the custom login & management UI.

---

## Prerequisites
Ensure the following tools are installed on your machine:

- Docker & Docker Compose (To run Zitadel)
- Node.js v18 or newer (To run the Frontend)
- pnpm (As the primary package manager for the sso-ui project)

---

## Getting started
Follow the steps below to set up your local development environment from scratch until the application is fully running.

**Step 1**: Running Zitadel (Identity Provider)
Zitadel acts as the central authentication hub. We will spin it up using Docker Compose.

```bash
# 1. Navigate to the zitadel directory
cd zitadel

# 2. Duplicate the environment variables template
cp .env.example .env

# 3. Run Zitadel containers in the background
docker compose up -d
```

> Post-Run Note:
Open your browser at http://localhost:8080 (or the port specified in your configuration). Access the Zitadel Console, create a new project, create an application with the type Web/SPA, and then copy its Client ID for use in the next step.

**Step 2**: Running the Custom UI (sso-ui)
Once the Identity Provider is ready, connect the Next.js frontend to Zitadel.

```bash
# 1. Return to the root and navigate to the sso-ui directory
cd ../sso-ui

# 2. Install all project dependencies using pnpm
pnpm install

# 3. Copy the example env configuration to the active .env file
cp .env.example .env
```
Open the newly created .env file in the sso-ui folder, then configure the variables with the credentials from the Zitadel Console:

``
NEXT_PUBLIC_ZITADEL_ISSUER=http://localhost:8080
NEXT_PUBLIC_CLIENT_ID=your_client_id_from_zitadel_console
``

```bash
# 4. Run the local development server
pnpm dev
```
Your custom login UI application is now accessible in your browser at http://localhost:3000.