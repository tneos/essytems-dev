# Hospitality Staff Manager App

This application is a comprehensive staff management tool designed for hospitality businesses. Built with a modern, scalable stack, it offers an intuitive interface for managing employee records, tracking new recruits, and viewing key staffing statistics.

---

## 🔒 Authentication and Data Access

This application requires **user authentication** via **Clerk**.

**Users must successfully sign up or sign in** to access the application's core features, including the staff management tools and the dashboard. This ensures that all sensitive employee and business data retrieved from the **PostgreSQL database** is secure and accessible only to authenticated users.

---

## ✨ Features

The application provides a streamlined experience for employers through a dedicated sidebar with the following options:

- **Add Employee:** A user-friendly form to input details for new staff members.
- **All Staff:** A paginated view of all employee records, including current staff and potential new recruits with booked interviews.
- **Stats Page:** A dashboard providing valuable insights into the business's staffing breakdown.

### Key Functionality:

- **Employee Management:** Easily add and store detailed information for every employee.
- **Staff Overview:** Get a complete list of all positions within the business, including active staff and **recruitment candidates**. The list supports **pagination** for easy navigation through large datasets.
- **Staffing Analytics:** The Stats page provides:
  - **Total Headcount:** Numerical counts for **Front of House (FOH)**, **Back of House (BOH)**, and **Management** staff categories.
  - **Recruitment Trend Graph:** A visual representation (graph) of the **total number of new staff additions per month**, helping to track growth and hiring patterns.

---

## 🛠️ Technology Stack

This application is built using a robust, modern, and production-ready technology stack:

| Category               | Technology       | Description                                                                         |
| :--------------------- | :--------------- | :---------------------------------------------------------------------------------- |
| **Frontend Framework** | **Next.js**      | A powerful React framework for server-side rendering and static site generation.    |
| **Language**           | **TypeScript**   | Adds static typing to JavaScript for improved code quality and maintainability.     |
| **Styling**            | **Tailwind CSS** | A utility-first CSS framework for rapid UI development and modern design.           |
| **Authentication**     | **Clerk**        | Secure, scalable **user authentication** and user management solution.              |
| **Database ORM**       | **Prisma**       | Next-generation ORM for Node.js and TypeScript, used to interact with the database. |
| **Database**           | **PostgreSQL**   | A powerful, open-source object-relational database system.                          |
| **Deployment**         | **Vercel**       | The cloud platform for frontend developers, optimized for Next.js deployments.      |

---

## 🚀 Getting Started

Follow these steps to set up and run the project locally.

### Prerequisites

You'll need the following installed on your machine:

- Node.js (LTS version recommended)
- npm or yarn
- A PostgreSQL database instance (local or remote)

### 1\. Clone the Repository

```bash
git clone [YOUR-REPO-URL]
cd hospitality-staff-manager-app
```

### 2\. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3\. Environment Variables

Create a file named `.env` in the root directory and configure the following variables:

```env
# Database Connection (Prisma)
DATABASE_URL="postgresql://[USER]:[PASSWORD]@[HOST]:[PORT]/[DATABASE_NAME]?schema=public"

# Clerk Authentication (Required for sign-up/sign-in)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="[YOUR_CLERK_PUBLISHABLE_KEY]"
CLERK_SECRET_KEY="[YOUR_CLERK_SECRET_KEY]"

# Optional: Vercel/Next.js specific
NEXT_PUBLIC_VERCEL_ENV=development
```

### 4\. Database Setup

Apply the Prisma schema and generate the client:

```bash
npx prisma migrate dev --name init
npx prisma generate
```

This command will create the necessary tables in your PostgreSQL database.

### 5\. Run the Application

Start the development server:

```bash
npm run dev
# or
yarn dev
```

The application should now be running at `http://localhost:3000`.

---

## ☁️ Deployment

This application is designed for seamless deployment on **Vercel**.

1.  Push your code to a Git repository (GitHub, GitLab, or Bitbucket).
2.  Log in to Vercel and import your project.
3.  Configure the required environment variables (`DATABASE_URL`, `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`, `CLERK_SECRET_KEY`) within the Vercel dashboard.
4.  Vercel will automatically detect the Next.js framework and initiate the build process.
