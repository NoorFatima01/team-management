# Team Manager

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

Team Manager defines three roles:

- **User**: Website users who have an account on the website.
- **Team Member**: Users who have registered themselves as members on the website.
- **Team Head**: Members who have created a team.

## Existing Features

- **User Authentication**: Users can authorize and authenticate themselves through their Google Account or through an email-password.
- **User Registration**: Users can register themselves as members.
- **User-based Access Control**: The website implements user-based access control to manage permissions and restrict access to certain features or data based on user roles.
- **Team Creation**: Members can create teams and send invites to other members to join.
- **Team Membership**: Members can accept invitations and become part of existing teams.
- **Project Management**: Team heads can create projects for their teams.
- **Task Management**: Projects can have multiple tasks that can be marked as done upon completion.
- **File Sharing and Collaboration**: Members can share, upload and download files while working on a project
- **Real-time Chat**: Members of a team can chat with each other in real time.
- **Notifications**: Members receive real-time notifications about certain activities on the platform.

## Upcoming Features

- **Restriction on Number of Teams**: Implement a restriction on the number of teams a user can join or create.
- **Improvements on Task Management**: Enhance task management functionality with new features such as task prioritization, due dates, task assignments to specific team members, and task dependencies.

- **Expanded Notifications**: Introduce more notification alerts for various activities, including chat messages, project updates, task assignments, and deadlines.

- **Email Notifications**: Users can receive email notifications in addition to in-app notifications. React email and resend will be utilized for these features.
