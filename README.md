# The Living Heritage
> *A Digital Cultural Heritage Archive & Living Museum*

**Event:** ART//CODE 2026  
**Repository:** [https://github.com/777ebin/art-works-777](https://github.com/777ebin/art-works-777)

---

## 1. Project Overview

**The Living Heritage** is a full-stack, community-driven digital preservation platform and living cultural museum designed to document, safeguard, and explore traditional stories, folk songs, indigenous crafts, ritual performing arts, and oral histories of Kerala and India.

Blending the aesthetic depth of a **contemporary digital museum** and an **editorial magazine** with **traditional Indian aesthetics**, the platform emphasizes ethical preservation. It departs from extractive documentation by establishing strict community ownership, hereditary knowledge holder attribution, and prior informed consent (PIC) protocols.

The platform is pre-populated with 11 deeply researched living traditions:
* **Theyyam** (Shamanic Incarnation & Sacred Grove Dance-Drama, North Malabar)
* **Kathakali** (Classical Dance-Drama of Epic Splendor, Central Kerala)
* **Pulikali** (Tiger Dance & Folk Street Carnival, Thrissur Onam)
* **Ottanthullal** (Satirical Solo Dance-Theatre of Kunjan Nambiar, Ambalappuzha)
* **Aranmula Kannadi** (Sacred Front-Surface Metal Alloy Mirrors, Pathanamthitta)
* **Nettur Petti** (Royal Timber & Brass Joinery Jewel Casket, Malabar)
* **Kerala Mural Painting** (Panchavarna Natural Mineral Frescoes, Central Kerala)
* **Kalaripayattu** (Ancient Martial Science & Marma Healing, Northern Kerala)
* **Maravuri & Kani Tribal Oral Herbal Lore** (Ethnobotanical Wisdom, Agasthyarkoodam)
* **Vadakkan Pattukal** (Heroic Medieval Ballads of Kadathanad & Unniyarcha)
* **Chendamelam** (Panchari & Pandi Temple Percussion Symphonies, Thrissur)

---

## 2. Problem Statement

Traditional cultural practices, folk art, music, crafts, and oral histories are gradually becoming less accessible due to rapid modernization, urban migration, and a lack of proper digital documentation. Much of this knowledge remains scattered across communities and fragile oral lineages.

Furthermore, mainstream digital platforms frequently extract and commercialize traditional lore without crediting hereditary masters or respecting sacred boundaries. **The Living Heritage** addresses this by providing a digital sanctuary to document, organize, preserve, and celebrate cultural knowledge with explicit consent, transparent attribution, and role-based curation.

---

## 3. Key Features

* **Digital Cultural Archive**: Stores, organizes, and showcases cultural traditions with historical context and multimedia.
* **Search and Multifaceted Filters**: Real-time search across titles, native Malayalam scripts, descriptions, and regions with filters for Category, Region, and Art Form.
* **Community Contributions & Consent**: Multi-step submission portal allowing community custodians to submit stories, images, and audio with mandatory Prior Informed Consent (PIC).
* **Multimedia Support**: Native support for high-resolution archival photography, field audio soundscapes, and living documentation.
* **Contributor Attribution**: Explicit recognition of hereditary artists, master practitioners, and traditional knowledge holders.
* **Admin & Curator Dashboard**: Protected governance interface (`/admin`) for evaluating, reviewing, approving, and rejecting submissions.
* **Museum Editorial Aesthetics**: Handcrafted design with warm parchment (`#FAF6EE`), antique ivory, deep terracotta, turmeric accents, and traditional Indian ornamental motifs.
* **Responsive Design**: Fully responsive across mobile, tablet, and desktop devices without breaking on external networks.

---

## 4. Technology Stack

### Frontend
* **Framework**: [Next.js 14](https://nextjs.org/) (App Router, Server & Client Components)
* **Core Library**: [React 18](https://react.dev/) & [TypeScript](https://www.typescriptlang.org/)
* **Styling**: [Tailwind CSS 3](https://tailwindcss.com/) with custom heritage color tokens
* **Animations**: [Framer Motion 11](https://www.framer.com/motion/)
* **Icons**: [Lucide React](https://lucide.dev/)
* **Audio**: HTML5 Web Audio API with React Context State Management

### Backend & API
* **Full-Stack Serverless Routes**: Next.js 14 App Router API Route Handlers (`/api/arts`, `/api/auth`, `/api/upload`)
* **Standalone Backend**: [NestJS 10](https://nestjs.com/) (Modular Architecture, Express)
* **Validation**: [Class Validator](https://github.com/typestack/class-validator) & [Class Transformer](https://github.com/typestack/class-transformer)

### Database & Security
* **Database**: [MongoDB Atlas](https://www.mongodb.com/atlas) (Cluster: `ebin007`, Database: `art-works`, Collections: `arts`, `users`)
* **ODM / Driver**: Official MongoDB Node.js Client & [Mongoose 8](https://mongoosejs.com/)
* **Authentication**: [JSON Web Tokens (JWT)](https://jwt.io/) & [Bcrypt.js](https://github.com/dcodeIO/bcrypt.js)
* **Access Control**: Role-Based Access Control (RBAC) supporting `visitor`, `contributor`, `knowledge_holder`, and `curator` / `admin`

### Deployment & Tooling
* **Hosting**: [Vercel](https://vercel.com/) (Edge Network CDN & Serverless)
* **CLI**: Vercel CLI (`vercel`)
* **Version Control**: Git & GitHub

---

## 5. System Architecture

```text
                                  +---------------------------------------+
                                  |         CLIENT BROWSER / USER         |
                                  |  (Desktop, Tablet, Mobile Responsive) |
                                  +-------------------+-------------------+
                                                      |
                                                      | HTTPS / Dynamic
                                                      v
                                  +---------------------------------------+
                                  |          VERCEL EDGE NETWORK          |
                                  |  (Next.js 14 App Router, CDN Cache)   |
                                  +-------------------+-------------------+
                                                      |
                         +----------------------------+----------------------------+
                         |                                                         |
                         v                                                         v
         +-------------------------------+                         +-------------------------------+
         |     FRONTEND PAGES & STATE    |                         |    IMAGE & FALLBACK RESOLVER  |
         |  - / (Homepage & Hero)        |                         |  - High-res CDN Image Mapper  |
         |  - /explore (Search & Filter) |                         |  - Local Seed Data Fallback   |
         |  - /story/[slug] (Details)    |                         |  - Direct Cross-Device Assets |
         |  - /contribute (Multi-step)   |                         +-------------------------------+
         |  - /admin (Curator Queue)     |
         |  - AudioContext & AuthContext |
         +---------------+---------------+
                         |
                         | REST API Requests (/api/arts, /api/auth, /api/upload)
                         v
         +-------------------------------+
         |   SERVERLESS NEXT.JS API /    |
         |       NESTJS BACKEND          |
         |  - Arts Service & Curation    |
         |  - Auth & JWT Verification    |
         |  - Media Upload Processing    |
         +---------------+---------------+
                         |
                         | MongoDB Protocol (TLS/SSL Connection Pooling)
                         v
         +-------------------------------+
         |      MONGODB ATLAS CLOUD      |
         |  - Cluster: ebin007           |
         |  - Database: art-works        |
         |  - Collections: arts, users   |
         +-------------------------------+
```

---

## 6. Installation & Setup Instructions

### Prerequisites
* **Node.js**: v18.17.0 or higher
* **npm**: v9.0.0 or higher
* **Git**: Installed and configured
* **MongoDB Atlas Account**: Whitelisted IP (`0.0.0.0/0` under Network Access)

### Step 1: Clone the Repository
```bash
git clone https://github.com/777ebin/art-works-777.git
cd art-works-777
```

### Step 2: Install Frontend Dependencies
```bash
cd frontend
npm install
```

### Step 3: Install Backend Dependencies (Optional for standalone backend)
```bash
cd ../backend
npm install
```

### Step 4: Seed MongoDB Atlas Database
To populate the 11 verified cultural records into your Atlas cluster (`ebin007` -> `art-works.arts`) and initialize Curator Ebin:
```bash
cd ../backend
npm run build
node scripts/seed-atlas.js
```

### Step 5: Start the Development Server
```bash
cd ../frontend
npm run dev
```
*Frontend runs on `http://localhost:3000`.*

---

## 7. Environment Variables

### Frontend Configuration (`frontend/.env.local`)
Create a `.env.local` file in the `frontend/` directory:

```ini
# When empty or omitted, relative '/api' is used automatically across all devices
NEXT_PUBLIC_API_URL=

# MongoDB Atlas Cloud Database
MONGODB_URI=mongodb+srv://ebinbinuff_db_user:ebinaldo777@ebin007.bql4m4e.mongodb.net/art-works?retryWrites=true&w=majority
DB_NAME=art-works

# JWT Authentication
JWT_SECRET=living_heritage_sacred_secret_key_2026_ebin
```

### Backend Configuration (`backend/.env` - Optional)
```ini
PORT=4000
MONGODB_URI=mongodb+srv://ebinbinuff_db_user:ebinaldo777@ebin007.bql4m4e.mongodb.net/art-works?retryWrites=true&w=majority
DB_NAME=art-works
COLLECTION_NAME=arts
JWT_SECRET=living_heritage_sacred_secret_key_2026_ebin
JWT_EXPIRATION=7d
```

---

## 8. Usage Instructions

### 1. Exploring the Living Archive
* Visit `http://localhost:3000` or your deployed Vercel domain to browse the hero showcase, featured traditions, and soundscape previews.
* Navigate to **Explore Archive** (`/explore`) to execute search queries (e.g., *"Theyyam"*, *"Kannur"*, *"Mirror"*), or filter by Art Form, Region, or Language.
* Click any tradition card to view its in-depth chronicle, living master quotes, and archival photographic documentation.

### 2. Contributing a Cultural Chronicle
* Navigate to **Contribute** (`/contribute`).
* Complete the multi-step guided submission:
  1. **Tradition Identity**: Enter Title, Native Script, Category, and Geographical Location.
  2. **Narrative & Chronicle**: Document Historical Origins, Cultural Significance, and Sources.
  3. **Lineage & Media**: Acknowledge living masters/clans and attach photographic files or URLs.
  4. **Ethics & Consent**: Read and sign the mandatory **Prior Informed Consent (PIC)** covenant.
* Click **Submit Cultural Record for Review**.

### 3. Curator Verification & Approval (`/admin`)
* Navigate to **Curator Portal** (`/admin`).
* Sign in using the Chief Curator credentials:
  * **Email**: `ebin@livingheritage.org` *(or click the one-click "Authorize as Curator Ebin" button)*
  * **Password**: `curator123`
* Switch between **All Records**, **Pending Review**, **Approved**, and **Rejected**.
* Click the review dialog on any submission to inspect the uploaded photograph, read the consent statement, append editorial feedback, and click **Approve & Publish to Archive**.

---

## 9. Demonstration Screenshots

| View | Description |
| :--- | :--- |
| **Editorial Homepage Hero** | Cinematic headline *"Every Tradition Has a Story. Every Story Deserves to Live."*, ambient audio player, and featured tradition spotlights. |
| **Searchable Archive Grid** | Multifaceted filtering panel with category, region, and art-form pills rendering responsive editorial cards. |
| **Cultural Story Details** | Dropcap editorial narrative, lineage strips, verified high-resolution photograph, and living master quotes. |
| **Contribution & Consent Portal** | Step-by-step guardian submission wizard with photographic media preview and legal Prior Informed Consent agreement. |
| **Curator Review Queue (`/admin`)** | Protected governance dashboard displaying KPI counters, photographic inspection drawer, and approval triggers. |

*(Place screenshots inside a `screenshots/` directory if required)*

---

## 10. Team Members

**Project:** The Living Heritage  
**Event:** ART//CODE 2026  

**Team Members:**
* **Fidha Firoz** — *Project Lead*
* **Ebin V Binu** — *Lead Full-Stack Developer & Chief Cultural Curator*

---

## 11. Limitations & Future Scope

### Current Limitations
1. **Cloud Media Storage**: Heavy media files are handled via direct base64 / external CDN URLs; integrating dedicated Amazon S3 / Cloudinary buckets is planned for ultra-high-resolution RAW scans.
2. **Manual Curation Bottleneck**: Verification relies on human curators checking hereditary claims and community permissions.
3. **Regional Focus**: Initial cultural coverage focuses primarily on South India and Kerala traditions.

### Future Scope
* **AI-Assisted Folklore Audio Transcription**: Integration of Malayalam and Dravidian dialect speech-to-text models for transcribing oral chants.
* **Decentralized Provenance & Blockchain Badging**: Storing immutable community consent hashes on-chain (IPFS / Polygon) to prevent unauthorized biopiracy and commercial exploitation.
* **Interactive 3D Craft Viewer**: WebGL/Three.js rendering for intricate heritage metallurgy like Aranmula Kannadi and Nettur Petti joinery.
* **Progressive Web App (PWA) Offline Mode**: Caching cultural chronicles for offline access in remote rural schools and heritage centers.

---

## 12. License & Attribution

This project is developed as part of **ART//CODE 2026** to promote cultural preservation through technology.

### Software License
The codebase of **The Living Heritage** is licensed under the [MIT License](LICENSE).

### Cultural Attribution & Traditional Knowledge Notice
The traditional expressions, songs, practices, and folklore documented within this archive belong perpetually to their respective hereditary custodian communities, clans, and master artists. Documentation is compiled solely for educational, cultural preservation, and non-commercial archival purposes in alignment with UNESCO conventions on the Safeguarding of the Intangible Cultural Heritage.
