# Mongoose Change Stream Error Reproduction

This repository contains a script to reproduce a specific issue with Mongoose and MongoDB change streams. The script uses `mongodb-memory-server` to create an in-memory MongoDB replica set and then tests the behavior of Mongoose change streams under certain conditions.

## Prerequisites

Before running the script, ensure you have the following installed:

- Node.js
- npm (Node Package Manager)

## Installation

To set up the project, follow these steps:

1. Clone the repository:

``` bash
git clone https://github.com/Klem3n/mongoose-error
cd mongoose-error
```

2. Install the dependencies:

``` bash
npm install
```

## Running the Script

To start the script, use the following command:

``` bash
npm start
```

This will run index.js.

## Issue Reproduction

The script aims to reproduce a specific issue where a change stream error in MongoDB is not caught by Mongoose.
