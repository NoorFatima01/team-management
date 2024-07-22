# Team Manager

## Dummy Accounts to Explore the website

1. **John**

   - **Email:** john@gmail.com
   - **Password:** 12345678
   - **Teams:**
     - John is a part of 3 teams as a team member.

2. **Sarah**

   - **Email:** sarah@gmail.com
   - **Password:** 12345678
   - **Teams:**
     - Sarah is part of 2 teams as team head.

3. **Ryan**
   - **Email:** ryan@gmail.com
   - **Password:** 12345678
   - **Teams:**
     - Ryan is part of only one team and has an invitation from Sarah to join the security team.

## Introduction

Welcome to Team Manager, a platform designed to streamline team collaboration, project management, and communication. Team Manager offers a range of features to help you organize your teams, manage projects, and stay connected with your team members in real time.

## Technologies Used

- **Fullstack**: NextJs
- **Frontend**: Shadcn UI, Tailwind CSS
- **State Management**: Zustand
- **Data Fetching**: React Query
- **Real-time Communication**: Pusher
- **Data Validation**: Zod
- **Database**: Supabase

## Roles

Team Manager defines two roles:

- **Team Member**: Users who have registered themselves as members on the website.
- **Team Head**: Members who have created a team.

## Existing Features

- **User Authentication**: Users can authorize and authenticate themselves through their Google Account or through an email-password.
- **User-based Access Control**: The website implements user-based access control to manage permissions and restrict access to certain features or data based on user roles.
- **Team Creation**: Members can create teams and send invites to other members to join.
- **Team Membership**: Members can accept invitations and become part of existing teams. Or they can visit the teams page and join the team of their choice
- **Project Management**: Team heads can create projects for their teams.
- **Task Management**: Projects can have multiple tasks that can be marked as done upon completion.
- **File Sharing and Collaboration**: Members can share, upload and download files while working on a project
- **Real-time Chat**: Members of a team can chat with each other in real time.
- **Notifications**: Members receive real-time notifications about certain activities on the platform.
- **Restriction on Number of Teams**: At a time a user can be a part of only 3 teams. To join or create another team, he/she needs to leave or delete an existing team.
- **Blogs**: Users can read blogs that are being statically generated at build time for faster page loading.

## Upcoming Features

- **Improvements on Task Management**: Enhance task management functionality with new features such as task prioritization, due dates, task assignments to specific team members, and task dependencies.

- **Expanded Notifications**: Introduce more notification alerts for various activities, including chat messages, project updates, task assignments, and deadlines.

- **Email Notifications**: Users can receive email notifications in addition to in-app notifications. React email and resend will be utilized for these features.
