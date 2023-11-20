<!-- <p align="center">
    <img src="https://th.bing.com/th/id/OIP.oU1DsNTtWS81uF3BpTufCwHaJZ?w=115&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7">
</p> -->


# Summary Details

- 📃 [Summary](#-summary)
- 📘 [Description](#-description)
- [✅ Prerequisites](#)
- [🛠 Tools](#-ferramentas)
- [The solution](#the-solution)
- 📚 [Representation of the structure of the solution)](#representation-of-the-structure-of-the-solution)
- [Execution flow of a request](#execution-flow-of-a-request)
- [📁 The responsibilities of each layer](#the-responsibilities-of-each-layer)
  - [➡ Presentation](#1️⃣-presentation)
  - [➡Application](#2️⃣-application)
    - [➡ Commands](#▶️-commands)
    - [➡ Query](#▶️-query)
    - [➡ Services](#▶️-services)
  - [➡ Core](#4️⃣-core)
  - [➡ Infrastructure](#4️⃣-core)
  - [➡ Crosscutting](#5️⃣-crosscutting-optional)
  - [➡ Adapters](#7️⃣-adapters-optional)
  - [➡ Tests](#6️⃣-tests)
- 🤝 [Contributing](#-contributing)
- 📛 [License](#-license)
&nbsp;



<!-- <p align="center">
    <img src="https://th.bing.com/th/id/OIP.oU1DsNTtWS81uF3BpTufCwHaJZ?w=115&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7">
</p> -->

# Description

This project aims to implement a clean architecture using some approaches such as Hexagonal Architecture (ports and adapters), as well as the use case pattern and CQRS in an implementation with Javascript/Typescript (NestJS)



# Status

In Progress =)

# The solution

The purpose of this solution architecture is to propose a way to implement backend rest services, where the following united standards are used for now.

- layered
  - The goal of traditional Layered Architectures is to segregate an application into different layers, where each layer contains modules and classes that have shared or similar responsibilities and work together to perform specific tasks.
- Hexagonal
  - Hex architecture, also known as ports and adapters, is an architectural pattern that allows input from users or external systems to reach the application on a port through an adapter, and allows output to be sent from the application through a port for an Adapter. This creates a layer of abstraction that protects an application's core and insulates it from external—and otherwise irrelevant—tools and technologies.
- Clean
  - An important goal of Clean Architecture is to provide developers with a way to organize code in a way that encapsulates business logic but keeps it separate from the delivery mechanism.

# Representation of the structure of the solution

<pre>
*── 01-Presentation (Border layer)                      - This is the border Application
│   ├── Controllers
├── 02-Application (Layer for orchestration)
│   ├── Commands (Use case of mutation/write)           - Your commands
│   │   ├── SomeEntity                                  - Your entity
│   │   │   ├── SomeEntityCreateCommand                 - A command
│   │   │   ├── SomeEntityCreateCommandHandler          - An handler for your command
│   ├── Queries (Use case of query/read)                - Your queries
│   │   ├── SomeEntity                                  - Your entity
│   │   │   ├── SomeEntityGetQuery                      - A query
│   │   │   ├── SomeEntityGetQueryHandler               - An handler for your query
│   ├── Services
*── 03-Core
│   |── Ports
│   │   ├── Data                                        - The interface for the repository pattern    // infrastructure Services
│   │   ├── Broker                                      - The interface for the broker communication  // infrastructure Services
│   │   ├── ACL                                         - The interface for the broker communication  // application Services
│   |── Domain
│   │     ├── Entities
│   │     │   ├── SeomeEntity                           - The entity of database representation
│   │     ├── Services                                  - Domain Services
│   │     ├── Factories                                 - Domanin factories entity
│   |── UseCases (Layer of the use case)
│   │     ├── Commands
│   │     │   ├── ISomeUseCaseCommandHandler            - Just interface for command to execute
│   │     │   ├── SomeCommand                           - Command attibute to execute
│   │     ├── Queries
│   │     │   ├── ISomeUseCaseQueryHandler              - Just interface for command to execute
│   │     │   ├── SomeQuery                             - Command attibute to execute
│   │     ├── Services
│   │     │   ├── ISomeUseCaseBrokerHandler
*── 04-Infrastructure                                   - Responsable for all interfaces with io comunication (ports)
*── 05-Crosscutting (Cross Layer)                       - Responsable for help others layers (common use ex: setup, Ioc, etc..) // optional
*── 06-Adapters  (Layer with adapters)                  - Responsable for input adapters type (kafka, redis, httprequest, etc)
│   |── State                                           - Responsable for state adapters (database)
│   │   ├── MongoDb
│   │   ├── SQLServer
│   │   ├── Redis
│   |── Streaming                                       - Responsable for stremaing adapter (broker)
│   │   ├── Kafka
│   │   ├── RabitMQ
│   |── Security                                        - Responsable for ensuring security in APIs exposure and internal communication between Microservices
│   |── Observability                                   - Responsable for automatically supports the three Logs, Tracing and Metrics pillars
│   |── HealthCheck                                     - Responsable for availability of the application
│   |── Services                                        - Responsable for gRPC, HTTP or GraphQL standards
*── Tests (Layer for testing)
│   |── IntegrationTest
│   |── UnitTest
</pre>

# Execution flow of a request

The main flow of a request execution in the service is due to the workflow below, but we can have many sub-flows where it is understood that it fits for each functionality of the application, which for now would be complex to exemplify here.

```javascript
// input flow
Presentation
    -> Application
        -> Core.UseCases (Command | Query)
            -> Infrastructure.Repository (optional)
            -> Domain.Services (optional)
            -> Domain.Factories (optional)
            -> Adapters.Kafka (optional)

            etc..
```

# The responsibilities of each layer

## 1️⃣ Presentation

The presentation or presentation layer is responsible for exposing the expoints of its Domain actions, that is, for a service that in this project is a Rest API, centralizing ons inputs via HTTP protocol as well as its libraries and/or implementations.
PS: documentation like Open API are implemented in this layer too

```javascript
// TODO
code example here
```

## 2️⃣ Application

The Application layer is responsible for orchestrating and managing the use cases (Use cases) of the solution. For this implementation, the CQS (command query separation) pattern will be used, that is, dividing into two flows what would be mutation on the server side (POST, PUT, PATCH, DELETE) and query of domain data (GET).

```javascript
// TODO
code example here
```

### ▶️ Commands

As mentioned, the pattern adopted for this architecture proposal will be to use the CQS (command query separation) pattern, so any change of domain state in the application must be orchestrated by a Use Case that has an explicit contract in the Domain layer, however the implementation is in charge of this layer (Commands).

```javascript
// TODO
code example here
```

### ▶️ Query

Layer responsible for providing all query orchestration, that is, exposing the application domain.

```javascript
// TODO
code example here
```

### ▶️ Services

Layer that is responsible for providing all the orchestration for functionalities other than writing and/or reading. Ex. communication with queues, requests for external services

```javascript
// TODO
code example here
```

## 3️⃣ Core

Central layer of the application where this layer is responsible for managing Use Cases, Domain, that is, maintaining the implementation of service contracts (Ports), representation of entities (database tables)

## 4️⃣ Infrastructure

The infrastructure layer enables a software system to interact with external
systems by receiving, storing and providing data when requested. However, the infrastructure layer is not the sole layer that enables the system to connect with other systems. There are also other components involved in the connectivity process. For example, a software system needs to connect with several external entities as part of its functions. In the context of a telecom services provider, a customer relationship management (CRM) system may also need to connect with the APIs exposed by an external system in order to view the different smartphones and data offers available for customers.

## 5️⃣ Crosscutting (optional)

Many aspects of a system are designed hierarchically and/or layered. This assumes that not every component of the system needs to interact with every other component, and the organization of components is done in cohesive groups with the function of fulfilling a very specific responsibility (stackoverflow), that is, it is a transversal layer, where all the other layers are aware of this layer, but this layer is unaware of the rest of the solution.

## 6️⃣ Adapters
 <!-- 7️⃣ -->

### What is an adapter?

The Adapter design pattern is one of the structural design patterns and is used so that two unrelated interfaces can work together. The object that unites these unrelated interfaces is called an Adapter, that is, it is a specific implementation of a certain port or Ports, where this is found in the Domain layer.

## Tests

Layer responsible for having projects of different types of tests, being them

- e2e tests
- Integration tests
- Unit tests
- etc..

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

# 🤝 Contributing

Open a issue on Github using the default template.

# 📛 License

The MIT License (MIT)
