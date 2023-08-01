# NestJS REST API Service Boilerplate

![License](https://img.shields.io/github/license/your-username/nestjs-restapi)
![NestJS Version](https://img.shields.io/badge/NestJS-%5E10.1.3-red)
![Prisma Version](https://img.shields.io/badge/Prisma-%5E5.0.0-blue)
![Node.js Version](https://img.shields.io/badge/Node.js-%5E18.0.0-green)

## Description

This is a boilerplate for building RESTful APIs using NestJS framework. The boilerplate follows the Domain-Driven Design (DDD) architecture to organize the project into distinct layers, separating concerns and promoting maintainability and scalability. It uses Prisma as the database ORM for efficient data access, JWT tokens for authentication, and AdminJS for the admin interface.

## Features

- [NestJS](https://nestjs.com) framework for building scalable and maintainable APIs.
- [Prisma](https://www.prisma.io) as the database ORM for efficient data access.
- JWT authentication for securing API endpoints.
- [AdminJS](https://adminjs.com) for a customizable admin interface to manage resources.
- DDD architecture for better code organization and separation of concerns.
- Pre-configured error handling, logging, and environment configuration.
- Scalable folder structure with modules, services, controllers, and DTOs.
- RESTful API conventions and validation with built-in decorators.
- Unit testing setup with [Jest](https://jestjs.io) and code coverage reports.
- Docker configuration for easy deployment and containerization.

## Requirements

- Node.js (>= 18.0.0)
- npm (>= 9.8.1)
- Docker (optional, for deployment)

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/nestjs-restapi.git
   cd nestjs-restapi
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:

   Create a `.env` file in the project root and fill in the necessary environment variables.

4. Set up Prisma:

   ```bash
   npx prisma migrate dev
   ```

5. Start the development server:

   ```bash
   npm run start:dev
   ```

6. Access the API at `http://localhost:3000`.

## Testing

To run tests, execute the following command:

```bash
npm run test
```

## Deployment

The application can be deployed using Docker. Use the provided Dockerfile to containerize the application:

1. Build the Docker image:

   ```bash
   docker build -t your-image-name .
   ```

2. Run the Docker container:

   ```bash
   docker run -p 3000:3000 -d your-image-name
   ```

## Contributing

Contributions are welcome! Please follow the guidelines in the [CONTRIBUTING.md](CONTRIBUTING.md) file.

## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgments

- Thanks to the creators and maintainers of NestJS, Prisma, AdminJS, and other open-source projects used in this boilerplate.

## Follow Me

- [LinkedIn](https://www.linkedin.com/in/sayanmohsin)
- [GitHub](https://github.com/sayanmohsin)
