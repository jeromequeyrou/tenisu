Here’s the translation of the first response into English:

```md
# Documentation for the NestJS Application

## Table of Contents
1. [Introduction](#introduction)
2. [Prerequisites](#prerequisites)
3. [Installation](#installation)
4. [Useful Commands](#useful-commands)
5. [Usage](#usage)
6. [Testing](#testing)
7. [Troubleshooting](#troubleshooting)

---

## Introduction

Welcome to the documentation for the **Tenisu** application, a NestJS app developed to manage and display information about tennis players. This project exposes REST endpoints to retrieve and analyze data about players.

## Prerequisites

Before starting, ensure you have the following tools installed on your machine:

- Node.js (version >= 14.x)
- npm (or Yarn)
- Nest CLI (optional but recommended)

You can install the Nest CLI by running the following command:

```bash
npm install -g @nestjs/cli
```

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/jeromequeyrou/tenisu.git
   ```

2. Navigate to the project directory:
   ```bash
   cd tenisu
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

## Useful Commands

- **Start the server in development mode**:
  ```bash
  npm run start:dev
  ```

- **Build the project for production**:
  ```bash
  npm run build
  ```

- **Run the application from the build**:
  Once the project is compiled with the `npm run build` command, you can start the application from the generated files in the `dist` directory by using the following command:
  
  ```bash
  npm start
  ```

  This command runs the application in production mode from the build. Ensure you have compiled the project before running this.

- **Run unit tests**:
  ```bash
  npm run test
  ```

- **Run unit tests in watch mode**:
  ```bash
  npm run test:watch
  ```

- **Lint the code**:
  ```bash
  npm run lint
  ```

- **Format the code**:
  ```bash
  npm run format
  ```

## Usage

### API Examples

The application exposes several REST endpoints through controllers. Here are some example API requests:

- **Retrieve all tennis players**:
  ```bash
  GET /tenisman
  ```

  Response: Returns a list of tennis players sorted by rank.

  Example response:
  ```json
  [
    {
      "id": 52,
      "firstname": "Novak",
      "lastname": "Djokovic",
      "shortname": "N.DJO",
      "sex": "M",
      "country": {
        "picture": "https://data.latelier.co/training/tennis_stats/resources/Serbie.png",
        "code": "SRB"
      },
      "picture": "https://data.latelier.co/training/tennis_stats/resources/Djokovic.png",
      "data": {
        "rank": 2,
        "points": 2542,
        "weight": 80000,
        "height": 188,
        "age": 31,
        "last": [1, 1, 1, 1, 1]
      }
    }
  ]
  ```

- **Retrieve a tennis player by ID**:
  ```bash
  GET /tenisman/:id
  ```

  Response: Returns the details of the tennis player with the provided ID.

  Example response:
  ```json
  {
    "id": 52,
    "firstname": "Novak",
    "lastname": "Djokovic",
    "shortname": "N.DJO",
    "sex": "M",
    "country": {
      "picture": "https://data.latelier.co/training/tennis_stats/resources/Serbie.png",
      "code": "SRB"
    },
    "picture": "https://data.latelier.co/training/tennis_stats/resources/Djokovic.png",
    "data": {
      "rank": 2,
      "points": 2542,
      "weight": 80000,
      "height": 188,
      "age": 31,
      "last": [1, 1, 1, 1, 1]
    }
  }
  ```

- **Retrieve global statistics of the players**:
  ```bash
  GET /tenisman/stats
  ```

  Response: Returns statistics on all tennis players, including the average BMI, median height, and the country with the best win rate.

  Example response:
  ```json
  {
    "countryWithBestWinRate": "FRA",
    "averageIMC": "25.23",
    "medianHeight": 181
  }
  ```

## Testing

The project includes unit tests using [Jest](https://jestjs.io/).

- **Run unit tests**:
  ```bash
  npm run test
  ```

- **Run unit tests in watch mode**:
  ```bash
  npm run test:watch
  ```

## Additional Resources

- [Official NestJS Documentation](https://docs.nestjs.com/)
- [Jest](https://jestjs.io/)
