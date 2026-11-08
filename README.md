# The Living Heritage
### A Digital Cultural Heritage Archive

## 1. Project Overview

**The Living Heritage** is a community-driven digital platform designed to preserve, document and explore cultural heritage. It provides a centralised archive for traditional art forms, folk music, crafts, rituals, oral histories and regional traditions.

The platform allows users to contribute cultural knowledge, explore existing records and discover traditions while respecting cultural ownership, contributor attribution and consent.

## 2. Problem Statement

Traditional cultural practices, folk art, music, crafts and oral histories are gradually becoming less accessible due to modernisation and a lack of proper digital documentation. Much of this knowledge remains scattered across communities and individuals.

The Living Heritage addresses this problem by providing a digital platform to document, organise, preserve and share cultural knowledge for future generations.

## 3. Key Features

- **Digital Cultural Archive:** Stores and displays cultural traditions and historical records.
- **Search and Filters:** Search records by keywords, categories, regions and languages.
- **Community Contributions:** Allows users to submit cultural stories and information.
- **Multimedia Support:** Supports images, audio and video content.
- **Regional Discovery:** Explore traditions based on geographical locations.
- **Contributor Attribution:** Recognises artists and traditional knowledge holders.
- **Consent Management:** Respects contributor permissions and cultural ownership.
- **Admin Dashboard:** Enables administrators to review, approve and manage submissions.
- **Responsive Design:** Accessible across desktops, tablets and mobile devices.

## 4. Technology Stack

| Technology | Purpose |
|---|---|
| Next.js | Frontend development |
| TypeScript | Type-safe development |
| Tailwind CSS | Styling and responsive design |
| NestJS | Backend development |
| MongoDB Atlas | Cloud database |
| Mongoose | Database modelling |
| Cloudinary | Media storage |
| Framer Motion | Animations |
| Lucide React | Icons |
| Vercel | Frontend deployment |

## 5. System Architecture

The application follows a full-stack architecture.

**Frontend:**
- Developed using Next.js and TypeScript.
- Provides the user interface and interactive features.
- Communicates with the backend through REST APIs.

**Backend:**
- Developed using NestJS.
- Handles authentication, data processing and API requests.
- Manages cultural record submissions and administrative operations.

**Database:**
- MongoDB Atlas stores cultural records, metadata and user information.
- Mongoose manages database schemas and operations.

**Media Storage:**
- Cloudinary manages uploaded images and multimedia content.

### Application Flow

```text
        USER
          |
          v
    NEXT.JS FRONTEND
          |
          v
     NESTJS BACKEND
          |
     +----+------+
     |           |
     v           v
  MONGODB     CLOUDINARY
   ATLAS       STORAGE
     |           |
     +-----+-----+
           |
           v
     DISPLAY RESULTS
       TO THE USER
```

## 6. Installation & Setup Instructions

### Prerequisites

Install the following before starting:

- Node.js and npm
- Git
- MongoDB Atlas account
- Cloudinary account

### Step 1: Clone the Repository

```bash
git clone <repository-url>
cd living-heritage
```

### Step 2: Install Backend Dependencies

```bash
cd backend
npm install
```

### Step 3: Install Frontend Dependencies

Open another terminal:

```bash
cd frontend
npm install
```

### Step 4: Configure Environment Variables

Create `.env` files in the respective frontend and backend directories.

Add the required configuration values.

### Step 5: Start the Backend

```bash
cd backend
npm run start:dev
```

### Step 6: Start the Frontend

```bash
cd frontend
npm run dev
```

### Step 7: Open the Website

Visit:

```text
http://localhost:3000
```

The backend should run on its configured port.

## 7. Environment Variables

### Backend (.env)

```env
PORT=3001

MONGODB_URI=your_mongodb_atlas_connection_string

CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

JWT_SECRET=your_secure_jwt_secret
```

### Frontend (.env.local)

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

**Note:** These are example variable names. Match them with the actual configuration used in your application. Never upload real credentials or secret keys to GitHub.

## 8. Usage Instructions

1. Open the website through the browser.
2. Explore cultural records available in the digital archive.
3. Use search and filters to discover specific traditions.
4. Open individual records to view their cultural information and multimedia.
5. Use the contribution portal to submit new cultural records.
6. Provide the required metadata and consent information.
7. Administrators can review submissions through the admin dashboard.
8. Approved records become available in the public archive according to their permissions.

## 9. Demonstration Screenshots

Add screenshots of the actual application in this section.

Suggested screenshots:

| Screenshot | Description |
|---|---|
| Homepage | Main landing page |
| Explore Archive | Cultural records and search |
| Story Details | Individual cultural record |
| Contribution Page | Cultural submission form |
| Admin Dashboard | Submission management |
| Mobile View | Responsive interface |

Place screenshots inside a `screenshots` folder in the repository.

Example:

```markdown
![Homepage](screenshots/homepage.png)

![Explore Archive](screenshots/explore.png)

![Contribution Page](screenshots/contribute.png)

![Admin Dashboard](screenshots/admin.png)
```

## 10. Team Members

**Project:** The Living Heritage

**Event:** ART//CODE 2026

Team Members:

- Fidha Firoz (leader)
- Ebin V Binu


Replace the placeholders with your actual team members and their roles.

## 11. Limitations & Future Scope

### Current Limitations

- The archive depends on the accuracy of submitted information.
- Some cultural traditions may be difficult to document and verify.
- Sensitive cultural knowledge requires careful consent and moderation.
- Multimedia storage and hosting may involve additional costs.
- Initial cultural coverage may be limited to selected regions.

### Future Scope

- Expand the archive to cover more regions and cultures.
- Introduce multilingual support.
- Develop interactive cultural maps.
- Add advanced search and recommendation features.
- Collaborate with cultural organisations and knowledge holders.
- Improve digital preservation and community participation.

## 12. License & Attribution

This project is developed as part of **ART//CODE 2026** to promote cultural preservation through technology.

- Cultural content belongs to its respective creators and communities.
- Appropriate attribution and permissions must be maintained.
- Third-party images, libraries and resources remain subject to their respective licenses.
- The project's source-code license should be specified by the development team before public distribution.

---

**Living Heritage, Searchable**

*Preserving traditions. Connecting generations. Keeping culture alive.*
