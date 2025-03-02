# Railway Booking system API

### Description

This app is a Railway management system like IRCTC where a user can check available trains between any 2 stations. Users can also book the seats if there are seats available in a train.

### Features

1. User creation
2. Train creation (only allowed to Admins)
3. Booking a seat
4. Proper error handling and status code
5. Only one user can do the booking at a given time

### Tech Stack Used

1. **NestJS**: A Node.js framework for building scalable and reliable server-side applications using TypeScript.
2. **PostgreSQL**: An open source relational database for building complex applications.
3. **Prisma ORM**: An Object-Relational Mappers (ORM) tool for Node.js application that simplifies database interactions.
4. **Postman**: A platform for API development.

### Motivation for using this tech stack

As the assignment instructed to use any web server of our choice, I chose NestJS which is Node.js framework that helps to structure the web applications in various modules and give inbuilt functionality for creating API endpoint, database ORM configuration for Prisma and easy access control features.

I am using Postgres as the relational database for its flexibility and scalability features.

Prisma ORM simplifies database interaction by creating models and directing managing the database connections.

### Setup

1. Prerequisites

- Node.js (v18 or above)
- yarn
- Git
- Postgres (either locally or via Docker)
- Bash shell

2. Clone this repository

```
git clone https://github.com/ninadnaik07/railway-booking-api.git
cd railway-booking-api
```

3. Run yarn to install packages

```
yarn
```

4. Run setup_db script

```
sudo chmod +x setup_db.sh
./setup_db.sh
```

5. Copy .env.example file to .env and add environment variables like postgres connection string

```
cp .env.example .env
```

6. Migrate DB

```
yarn migrate:dev
```

7. Start the NestJS app

```
yarn dev
```

### Run APIs through Postman

Copy this postman collection to your account. Edit the host variable to `http://localhost:3000`. Run requests given in the collection.

[<img src="https://run.pstmn.io/button.svg" alt="Run In Postman" style="width: 128px; height: 32px;">](https://app.getpostman.com/run-collection/20169910-f073a8cd-3860-4538-9fbb-2480a48792de?action=collection%2Ffork&source=rip_markdown&collection-url=entityId%3D20169910-f073a8cd-3860-4538-9fbb-2480a48792de%26entityType%3Dcollection%26workspaceId%3D8cf17d2d-eb90-4a70-9229-54856dbf3496)

### Application file structure

Generated using `tree` command.

```
.
├── nest-cli.json
├── package.json
├── prisma
│   └── schema.prisma
├── README.md
├── setup_db.sh
├── src
│   ├── app.controller.ts
│   ├── app.module.ts
│   ├── app.service.ts
│   ├── auth
│   │   ├── auth.controller.ts
│   │   ├── auth.module.ts
│   │   ├── auth.service.ts
│   │   ├── guards
│   │   │   ├── admin.guard.ts
│   │   │   ├── api-key.guard.ts
│   │   │   └── auth.guard.ts
│   │   └── types.ts
│   ├── bookings
│   │   ├── bookings.controller.ts
│   │   ├── bookings.module.ts
│   │   ├── bookings.service.ts
│   │   └── types.ts
│   ├── main.ts
│   ├── prisma.service.ts
│   ├── trains
│   │   ├── trains.controller.ts
│   │   ├── trains.module.ts
│   │   └── trains.service.ts
│   └── users
│       ├── types.ts
│       ├── users.module.ts
│       └── users.service.ts
├── tsconfig.build.json
├── tsconfig.json
└── yarn.lock

8 directories, 31 files
```
