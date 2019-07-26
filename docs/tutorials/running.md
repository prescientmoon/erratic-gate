# Running the simulator

There are 3 ways to get the simulator up and running:

1. Using [the version hosted on heroku](https://logic-gate-simulator.herokuapp.com/):

This is by far the fastest solution - everything you need to do is open
[the github-pages url](https://logic-gate-simulator.herokuapp.com/)

2. Using a development server:

First you need to have [node.js & npm](https://nodejs.org/en/download/) and [git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) installed on your machine.

Open a terminal in the desired folder and run:

```sh
#  Clone repo
git clone https://github.com/Mateiadrielrafael/logicGateSimulator

# Cd into the folder
cd logicGateSimulator

# install dependencies
npm install

# run development server
npm run dev
```

3. Building the simulation yourself

First, clone the repo and install the dependencies as explained in option 2.

To build the source run:

```sh
# build program
npm run build
```

To then run the simulation, open a server in the dist directory. A simple solution using npm:

```sh
# instal nano-server globally
npm i nano-server -g

# change directory
cd dist

# run server
nano-server

# linux
open http://localhost:5000

# Windows
start http://localhost:5000
```
