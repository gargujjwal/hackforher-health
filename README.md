# HackForHer Health

<!-- PROJECT SHIELDS -->

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/gargujjwal/HackForHer-Health">
    <img src="./readme-assets/logo.webp" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">HackForHer Health</h3>

  <p align="center">
    An All-in-One Platform for Cervical Cancer Awareness and Support
    <br />
    <a href="https://github.com/gargujjwal/hackforher-health"><strong>Explore the docs »</strong></a>
  </p>
</div>

## About The Project

HackForHer Health is a comprehensive platform dedicated to cervical cancer awareness, support, and early detection. Our mission is to empower individuals with knowledge, provide predictive tools, and facilitate seamless medical support.

### Key Features

- **Cervical Cancer Awareness**: Latest news, symptoms, FAQs, myth busters
- **Survivor Stories**: Inspiring narratives to provide hope and support
- **Predictive Model**: AI-powered cervical cancer prediction with 95-98% accuracy
- **Medical Case Management**:
  - Create and manage medical cases
  - Fill predictive questionnaires
  - Doctor case review
- **Telemedicine Features**:
  - Real-time doctor-patient communication
  - Appointment scheduling
  - Secure chat functionality

### Built With

- [![Spring Boot][Spring-Boot]][Spring-Boot-url]
- [![PostgreSQL][PostgreSQL]][PostgreSQL-url]
- [![Flask][Flask]][Flask-url]
- [![React][React.js]][React-url]

## Project Status

**Important Note**: This project is now in a completed state. No further development is planned.

## Screenshots

### Project Walkthrough

![Demonstration](./readme-assets/demonstration.mp4)

## Getting Started

### Prerequisites

Before setting up the project, ensure you have the following installed:

- Docker
- Docker Compose

### Installation

1. Clone the repository

   ```sh
   git clone https://github.com/gargujjwal/hackforher-health.git
   ```

2. Create .env files

   - In `src/main-server/src/main/client/`, create `.env.development`:

     ```env
     VITE_API_BASE_URL=http://localhost:8080/api
     ```

   - Create `.env.production`:

     ```env
     VITE_API_BASE_URL=/api
     ```

3. Start the application

   ```sh
   docker-compose up --build
   ```

## Architecture Overview

The application uses a microservices architecture with:

- Spring Boot backend (port 8080)
- PostgreSQL database
- Flask-based prediction service (port 5000)
- React frontend served through Spring Boot

## Core Contributors

A special thank you to the core developers who made this project possible:

### Naman Rath

[![GitHub](https://img.shields.io/badge/GitHub-Profile-blue?logo=github)](https://github.com/namanrath007)

- Machine learning model development

### Utkarsh Shukla

[![GitHub](https://img.shields.io/badge/GitHub-Profile-blue?logo=github)](https://github.com/utkarsh-shukla2003)

- User interface design
- Documentation

## Project Completion

This project represents a comprehensive solution for cervical cancer awareness
and support. While no further development is planned, the existing codebase
provides a robust platform for:

- Cancer risk assessment
- Patient-doctor communication
- Medical case management
- Health awareness resources

## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

## Contact

For any queries about the project, please reach out to the core contributors:

- Naman Rath: [GitHub Profile](https://github.com/namanrath007)
- Utkarsh Shukla: [GitHub Profile](https://github.com/utkarsh-shukla2003)

## Acknowledgments

- Special thanks to all who supported the HackForHer Health project
- Our dedicated healthcare professionals

---

[contributors-shield]: https://img.shields.io/github/contributors/gargujjwal/hackforher-health.svg?style=for-the-badge
[contributors-url]: https://github.com/gargujjwal/hackforher-health/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/gargujjwal/hackforher-health.svg?style=for-the-badge
[forks-url]: https://github.com/gargujjwal/hackforher-health/network/members
[stars-shield]: https://img.shields.io/github/stars/gargujjwal/hackforher-health.svg?style=for-the-badge
[stars-url]: https://github.com/gargujjwal/hackforher-health/stargazers
[issues-shield]: https://img.shields.io/github/issues/gargujjwal/hackforher-health.svg?style=for-the-badge
[issues-url]: https://github.com/gargujjwal/hackforher-health/issues
[license-shield]: https://img.shields.io/github/license/gargujjwal/hackforher-health.svg?style=for-the-badge
[license-url]: https://github.com/gargujjwal/hackforher-health/blob/master/LICENSE.txt
[Spring-Boot]: https://img.shields.io/badge/Spring_Boot-6DB33F?style=for-the-badge&logo=spring-boot&logoColor=white
[Spring-Boot-url]: https://spring.io/projects/spring-boot
[PostgreSQL]: https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white
[PostgreSQL-url]: https://www.postgresql.org/
[Flask]: https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white
[Flask-url]: https://flask.palletsprojects.com/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
