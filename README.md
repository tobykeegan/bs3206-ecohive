# EcoHive

## Description

EcoHive is a platform to connect eco-conscious people through the organisation of local eco-events. Users can create events, join events, and connect with other users to share ideas and resources. 


## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Contributors](#contributors)
## Installation

EcoHive runs as a web application, leveraging the React Framework and a Next.js server. EcoHive is design to be built and run as a containerised application using either docker or podman. To get started with development, clone this repository and run the following commands:

```bash
npm install
```
```bash
npm run dev
```

To build the application for production, run the following commands:

```bash
npm run build:docker
```

To run the application in production, run the following commands:

```bash
docker run -d -p 3000:3000 ecohive-ui
```

## Contributors
This project was made possible by the following contributors:
- [Jade Carino](https://github.com/jadecarino)
- [Toby Keegan](https://github.com/tobykeegan)
- [Alec Painter](https://github.com/Alec-Painter)