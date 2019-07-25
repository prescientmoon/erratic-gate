<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">

# Introduction

These docs will walk you trough the process of creating a full adder.

## Opening the simulator

There are 3 ways to open the simulator:

1. Using the version hosted on github-pages:

This is by far the fastest solution - everything you need to do is open
[the github-pages url](https://mateiadrielrafael.github.io/logicGateSimulator/)

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

## The controls

|               Action                |   Keybinding    |                                     Gui                                      |
| :---------------------------------: | :-------------: | :--------------------------------------------------------------------------: |
|                Save                 |   `ctrl + s`    |                            `Simulation` > `Save`                             |
|             Add a gate              |        -        |                click `logic-gates` > the gate you want to add                |
|             Move a gate             |        -        |             drag & drop the gate using the `right mouse button`              |
|                 Pan                 |        -        |    click & move & release the background useing the `right mouse button`     |
|        Select multiple gates        |        -        |             click & move & release using the `left mouse button`             |
|          Add to selection           |     `shift`     |                         select while holding `shift`                         |
|          Select all gates           |   `ctrl + a`    |                         `Simulation` > `Select all`                          |
|          Delete selection           |    `delete`     |                      `Simulation` > `Delete selection`                       |
|        Undo _(to last save)_        |   `ctrl + z`    |                            `Simulation` > `Undo`                             |
|     Refresh (reload) simulation     |   `ctrl + r`    |                           `Simulation` > `Refresh`                           |
|  Clean (delete unconnected gates)   | `ctrl + delete` |                            `Simulation` > `Clean`                            |
|           Open simulation           |        -        |             `Open simulation` > the simulation you want to open              |
|          Create simulation          |        -        |                       `Create simulation` > `Project`                        | `Integrated circuit` > type the name of the simulation |
|           Create project            |        -        |      `Create simulation` > `Project` > type the name of the simulation       |
|      Create integrated circuit      |        -        | `Create simulation` > `Integrated circuit` > type the name of the simulation |
|           Change language           |        -        |     Click on the `Language: \<language\>` button (bottom of the sidebar)     |
| Get more info about a built in gate |        -        |              `Logic gates` > <i class="material-icons">info</i>              |
