<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">

# Building a 4 - bit adder:

0. To save the simulation press `ctrl + s` or click `Simulation` > `Save`. Save your progress after each step.

1. Create a new ic called `half-adder` (`Create simulation` > `Integrated circuit` > `Half adder`)

1. Add the following logic gates (`Logic gates` > the name of the gate):
    - 2 buttons
    - 2 light bulbs
    - a XOR gate
    - an AND gate

> You can get more info about these gates by clicking `Logic gates` > the <i class='material-icons'>info</i> icon at the rght of the gate.

3. To move a gate, drag & drop it with the right mouse button. To connect 2 pins, click once on each. Build the following configuration:

![Half adder](../assets/half-adder.png)

3. Create a new ic called `full-adder` (See step 1)
4. Add the following gates (See step 2):
    - 3 buttons
    - 2 light bulbs
    - 2 half adders
    - an OR gate

5) Build the following configuration (See step 3):
   ![Full adder](../assets/full-adder.png)

6) Create a new project called `4-bit-adder` (`Create simulation` > `Project` > `4-bit-adder`)

7) Add the following components (See step 2):

    - 8 button
    - 5 light bulbs
    - 3 full adders
    - 1 half adder

8) Build the following configuration (See step 3):
   ![4-bit-adder](../assets/4-bit-adder.png)

9) Enjoy!
   Congratiulations! You've made your first circuit! With this simulator at your dispossal, the possibilities are endless! Here are a few things you can try and create yourself: - A 4-bit substractor - A counter - Different latches - If you are confident in you skills, you can even make a full 4-bit processor!
