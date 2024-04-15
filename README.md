# Patient Monitor Web App
Welcome to the Patient Monitor Web App repository. This application is designed to assist nurse practitioners in monitoring their patients during the initial weeks following hospital discharge. Additionally, it aids patients in managing and recording their daily activities post-discharge. This project is part of the Emerging Technologies COMP-308 course.

## Project Overview
The Patient Monitor Web App offers two interfaces for both nurses and patients, enabling vital sign monitoring, symptom tracking, and interactive health-promoting activities. This web application leverages MongoDB Cloud for data storage, utilizes Express for backend services via a GraphQL API, and React (with functional components) for a responsive frontend.


## Features
Common Features
- User Registration/Login: Secure authentication system for users to access personalized features.

Nurse Features
- Vital Signs Entry: Nurses can record patient vital signs like body temperature, heart rate, blood pressure, and respiratory rate.
- Access Historical Data: Nurses can view vital signs recorded during previous visits.
- Medical Condition Analysis: Intelligent analysis of symptoms using deep learning to predict potential medical issues and advise patients to seek further medical consultation if necessary.

Patient Features
- Daily Information Entry: Patients can log daily health information such as pulse rate, blood pressure, weight, temperature, and respiratory rate.
- Symptom Checklist: Interactive checklist for tracking symptoms (e.g., COVID-19-related) to monitor health trends.

## Tech Stack
- Frontend: React.js (Functional Components)
- Backend: Express.js with GraphQL
- Database: MongoDB Cloud
- Additional Libraries/Frameworks: TensorFlow.js
