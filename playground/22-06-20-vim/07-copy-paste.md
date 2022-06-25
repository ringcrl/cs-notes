# Copying and Pasting

Let's warm up with some simple practice exercises so that you can get comfortable with copying and pasting things in Vim quickly. We'll start by focusing on the yank command or `y`.

> Remember you can find the solutions by searching for /Solutions. To come back use <CTRL-O>.

```bash
# 1. Expand your army by cloning your most deadly minions! Rule the world! Use
# `y` in combination with the operators you've learned in previous chapters to
# copy a deadly minion and `p` to paste it and thereby clone it for great
# glory.

  start here
  /
 /
v
orc orc orc orc orc orc orc
orc goblin orc orc goblin orc
red dragon ant cockroach
lich king
rat giant spider rat
earth golem
octopus "kraken" octopus
shark (death knight)
zombie zombie ghoul
```

Awesome! Moahahaha! (evil-est laughter) The world shall be ours!! Moahahahaha!

Well done! Now let's practice pasting using `p` and `P`.

```bash
# 2. Surround thy enemies with hordes of orcs!!! Experiment with different
# types of yanking and pasting.

  start here
  /
 /
v
orc orc orc orc orc orc
orc orc orc orc orc orc
orc orc orc orc orc orc

      orc
orc halfling orc <== surrounded
      orc
============| |==========

(paladin)

       ooo  ^^^^^^^^^^ooo

     (wizard)

^^^^^  ^^^ ^^ ^ ^ ^^^

(elf archer)

```

Great job! By doing these exercises you should've realized a couple of things:

- The behavior of `p` and `P` depends on what you've copied with the `y` command:
  - If you copy characters (like `yaw`) when you use the paste commands you'll paste
    these characters before or after the cursor _within the same line_.
    **Copy characters and you'll paste character**.
  - If you copy lines (like `yy`) when you use the paste commands you'll paste lines
    below or above the current line. **Copy lines and you'll paste lines.**
- You can copy or duplicate entire lines by using `yyp`

Now let's try the even finer details of moving the cursor with `gp` and `gP`.

```bash
# 3. Ninjas are extremely fast, stealthy and deadly. Therefore we need to
#   surround them at once without moving the cursor from their location.
#   Experiment with `P` and `gP` until you get it right.

  start here
  /
 /
v
orc orc orc orc orc orc
orc orc orc orc orc orc
orc orc orc orc orc orc

orc orc orc orc
     ninja <== surrounded
orc orc orc orc
============| |==========

(ninja)

       ooo  ^^^^^^^^^^ooo

     (ninja)

^^^^^^  ^^^ ^^ ^ ^ ^^^^^
^^^ ^^^^^^^^^^^^^^^^^ ^^
```

Awesome right? Vim does give you a lot of control on how to copy and paste things. And there's more!

Let's now move into cutting things. Just like `y` lets you copy stuff in Vim, `d` and `c` cut text in addition to deleting and changing it. Let's practice cutting and pasting.

```bash
# 4. The master dwarves and gnomes of Ahknbar have discovered the secrets of
# teleportation. Using the mysterious ways of Vim they've learned to harness
# the `d` and `p` commands to transport anything between any two points.
# Try it!

  start here
  /
 /
v
^^^^^^  ^^^ ^^ ^ ^ ^^^^^ ^^^^^^
^^^ ^^^^^^^^^^^^^^^^^ ^^^^^^^^^
^^^                         ^^^
^^                           ^^
^     (dwarf) ====>   ( )     ^
^^^^  "dwarf" ====>   + +   ^^^
^^    gnome ======>   " "    ^^
^^                            ^
^^                            ^
^^^^^^  ^^^ ^^ ^ ^ ^^^^^^^^^^^^
^^^ ^^^^^^^^^^^^^^^^^ ^^^^^^^^^
```

```bash
# 5. A group of daring dwarves pushing the boundaries of teleportation happen to
# have teleported themselves into the depths of the earth. Would you be so kind
# as to rescue them?

  start here
  /
 /
v
^^^^^^  ^^^ ^^ ^ ^ ^^^^^ ^^^^^^
^^^ ^^^^^^^^^^^^^^^^^ ^^^^^^^^^
^^^ dwarf dwarf dwarf dwarf  ^^
^^^^^^  ^^^ ^^ ^ ^ ^^^^^^^^^^^^
^^^ ^^^^^^^^^^^^^^^^^ ^^^^^^^^^

      o .        + .     +
o             o
                            o
============| |================
o        +       +
       + .                 +
                  +
```

Now let's try to translate some of what we've learn to the world of programming and writing actual code. A common practice when writing code and collections of things is to use an item as a template. You write the code for that item, copy, paste it and then modify it a little bit. Let's try to do that with Vim and see how much time we can save:

```typescript
// 6. We're developing a new roguelike game and it's going to be awesome!! Awesome!!
// The game is going to be a mash up of your favorite video games, fantasy and scifi,
//  and the player will be able to choose to play with any of your favorite characters! What?!
// Add some of your favorite characters to the character selection screen.
// Use what you've learned so far to achieve it in the fastest way you can think of.

//   start here
//    /
//  /
// v
const characters = [
  new Character({ name: "Tanis", class: Classes.Archer, race: Race.HalfElf }),
];

characterSelectionScreen.add(characters);
```

Sometimes we'll make a typo and switch two letters:

```typescript
// 7. Correct these typos human! Tip: can you do this with the `x` and `p` commands
//    Refresher: `x` is equivalent to `dl`

//   start here
//    /
//  /
// v
conts charactres = [
  new Chaarcter({ name: "Tanis", clsas: Classes.Archer, raec: Race.HalfElf }),
];

characterSelectionScreen.add(characters);
```

And sometimes we want to move things around:

```typescript
// 8. Strange... someone put the class members below the constructor. Ain't that quaint...
//    Let's move them back up before the constructor. Like it always should have been...
//    Tip: Can you combine the `d` command with a motion to cut all members with a single command?


//   start here
//    /
//  /
// v
class Character {
  constructor({name, class, race}: CharacterStats) {
    this.name = name;
    this.class = class;
    this.race = race;
  }

  readonly name;
  readonly class;
  readonly race;

  // Other code...
}
```

Excellent! Congratulations! You've learned the foundations of copying and pasting in Vim! Wihooo! With all that you've learned thus far you're pretty much good to go and have an stellar experience copying and pasting things in VSCode with great speed and accuracy.

There is still more in store for you. **Vim Registers** and **pasting in Insert mode**. Both of which you'll use less often than `y` and `p` but they can be really useful when the time calls.

## Vim Registers

**Vim Registers** are a very interesting feature in Vim that enhances the way you work with copying and pasting (among other things). In essence, they are like having a multitude of clipboards where you can copy or cut things. There's a bunch of registers identified by a character and which perform slightly different tasks:

- The **unnamed register** `"` is where you copy and cut stuff to, when you don’t explicitly specify a register. The default register if you will.
- The **named registers** `a-z` are registers you can use explicitly to copy and cut text at will
- The **yank register** `0` stores the last thing you have yanked (copied)
- The **cut registers** `1-9` store the last 9 things you cut by using either the delete or the change command

> The yank register (`0`) and the cut registers (`1-9`) are officially called **numbered registers**. But I think it is more useful to name them yank and cut registers. That way, remembering what they do becomes far easier.

For instance, `"ayas` yanks a sentence and stores it in register `a`. Now if you want to paste it somewhere else, you can type `"ap`. Alternatively, using the capitalized version a register (i.e. `A` instead of `a`) appends whatever you copy or cut into that register.

Let's practice using the _named registers_ (`a-z`)!

```bash
# 9. We're preparing an assault in the human city of Gonlor, pride of The First Humans.
#    We've enlisted our bravest and fiercest warriors from the sacred lands of Wordor who
#    have pledged to drive the human blight away of these sacred grounds.
#    Create a balanced battle formation by alternating globins and orcs.
#    Tip: Think about how you can use registers to achieve this task

  start here
  /
 /
v
goblin goblin globin goblin
orc orc orc orc goblin orc
orc goblin orc orc orc orc
.     + `
     .          ~ .
============| |==========
            | |
============| |==========
     +
o .      .      x .   +

   .   ooo  ^^^^^^^ ^ ooo
soldier solider soldier soldier
     soldier soldier soldier
  +    archer archer archer
       wizard archer archer

^^^^^^  ^^^ ^^ ^ ^ ^^^^^| |^^
^^^ ^^^^^^^^^^^^^^^^^ ^^| |^^
```

The **yank register** lets you have access to what you copied last via the `y` command. This is helpful because deletes and changes don’t overwrite this register like they do the unnamed register. This is easier to illustrate with an example:

```typescript
// 9. There's been a mixup in the battle plans and our goblin formation is made of orcs,
//    and our orcs formation is made out of goblins. We need to fix this mixup and also
//    make sure we send the goblins to battle first.
//    Tip: Try using y and p and see what happens

//   start here
//     /
//   /
// v
class Orc {}
class Goblin {}
const goblins = [new Orc(), new Orc(), new Orc()];
const orcs = [new Goblin(), new Goblin(), new Goblin()];

// We'd like to send the goblins first to battle, because they're cannon fodder
// that will tire the enemy before the real warriors arrive.
sendArmiesToBattle(orcs);
```

See the problem? The moment we write over some text, we automatically cut that text so that it may unintentionally overwrite whatever was on our clipboard:

```
1. (at the start)      => unnamed register: empty
2. `yiw` over orcs     => unnamed register: orcs
3. `viwp` over goblins => unnamed register: goblins   AAaah?!
4. `viwp` over orcs    => unnamed register: orcs
```

This can come as a surprise if your mental model for copying and pasting is that of: _I copy something and paste it several times, whatever is in my clipboard never changes until I copy again_. In Vim, depending on how you paste something, you may replace whatever it is in your clipboard (the unnamed register).

Now try to solve the same exercise again but look out for an opportunity to use the `yank register` (`0`). Remember, the yank register always keeps the last thing you yanked with the `y` command no matter what.

```typescript
// 10. There's been a mixup in the battle plans and our goblin formation is made of orcs,
//    and our orcs formation is made out of goblins. We need to fix this mixup and also
//    make sure we send the goblins to battle first.
//    Tip: Try using y and p and see what happens. Can you see any opportunity to make
//    your task easier with the yank register.

//   start here
//     /
//   /
// v
class Orc {}
class Goblin {}
const goblins = [new Orc(), new Orc(), new Orc()];
const orcs = [new Goblin(), new Goblin(), new Goblin()];
// We'd like to send the goblins first to battle, because they're cannon fodder
// that will tire the enemy before the real warriors arrive.
sendArmiesToBattle(orcs);
```

> The yank and paste commands aren't the best for substituting more than two variables. The moment that you need to do more than one substitution you're better off using the :s command. We'll learn more about that in upcoming chapters.

The **cut registers** (`1-9`) give you access to the last 9 things you deleted or changed. This is great when you delete something by mistake or when there’s some text that you deleted earlier and all of the sudden you realize that you need it (I need thaaaat code back!!).

```bash
# 11. Retreat! Our troops have been decimated by the evil humans!
#     Transport these troops across the river back to the safety of Wordor. You
#     must take all troops away at the same time before you start placing them
#     across the river. Otherwise, our enemies will see our retreat and attack
#     in force.
#     Tip: how can you use the **cut registers** to solve this exercise?

  start here
  /
 /
v
goblin

orc orc orc goblin orc
orc goblin orc orc orc orc

trolloc
  trolloc

       lich
ghoul skeleton

.     + `
     .          ~ .
============| |==========
            | |
============| |==========
     +
o .      .      x .   +



^^^^^^  ^^^ ^^ ^ ^ ^^^^^| |^^
^^^ ^^^^^^^^^^^^^^^^^ ^^| |^^
```

Great job! You're now a **true master** of the Vim registers. I bow before you.

> Did you know? At any point in time, you can use the `:reg` command to see what is in your registers. Or you can type `:reg {register}` to inspect the contents of a specific register.

## Pasting in Insert Mode

Let's move onto the last part of this section on copying and pasting. Just a little bit more and you can take a well deserved break (you can take a break anytime you want btw :D).

You may have not noticed, but up until this point we've only been copying and pasting things from _Normal mode_. Although you'll be spending most of your time copying/pasting things from _Normal mode_, sometimes it is also useful to paste something when you're in _Insert mode_. This is how you do it. You type `CTRL-R` + `{register}`, so CTRL + R (R for **R**egister) followed by the name of the register:

- `CTRL-R` + `a` pastes from the named register `a`
- `CTRL-R` + `0` pastes from the yank register `0`
- `CTRL-R` + `9` pastes from the cut register `9`

```bash
# 12. The human bligh keeps pushing us out of our ancestral lands. We must flee
#     into the unknown. Help our people board the vessels that will take us to
#     safety. We shall return.
#     Tip: Trouble pasting a line to the right of another word? Try pasting it
#     in Insert mode.
#     Bonus: To make it even more exciting and play with the different copying
#     and pasting alternatives, try creating a queue of monsters in order of size
#     <TROLL ogre orc orc orc goblin>
#     Monster connoisseurs may get into a debate about whether the natural Ogre
#     of the Krag mountains is equal or greater in size to a Troll but in this
#     case the Troll is way bigger because it is in capital letters TROLL as in
#     big ass TROLL.

  start here
  /
 /
v  ~~~~~ . .. ~~~~~ . `~~~~~~ ~~~~~~                ~~~~
---------            ~~~~~~~ `~~~~~~ ~~~~ ~~~~~~ .           ~~
    ogre
          \_________ ~~~         `~~~~~~       ~~~ ~~~~~~ .        ~~
                    \______
                           \  ~~~~~ ~~~       `~~~~ .      ~~~
orc orc orc
                            | ~~~~ ~~~~~~~
                            |            ~~~~~~  ~~~~~ `~~~ ~ ~ ~~~~
                            |              _____~~~~~
                            |             /  o  \        ~~~~~~~~~
                            |  `~~~~~    |       | . ~~~~~~~~~
                            |            |   o   | ~~~~ .   ~~ ~ ~ ~ ~ ~~~~~
move your troops            |            |       | ~~~ .   ~ ~ ~ ~ ~ ~ .
to form a line              ==============       | . ~~~~~
here => goblin
                            ==============       |
                            |        ~~  |   o   | ~~~~ ~~~ ~~~~  ~~~
                            |   ~~~~     |       | ~~  ~~~~~       ~~~~
                            |            |   o   |
                           _|            |       | .  ~~~~ ~ ~ ~~~~~
                         _/  ~~~~~        \+++++/ .
                  TROLL /
            /\_        / . ~~~~~~~~~~
           /   \______/ ~~~~~ .    ~~~~~~~~~~~~ . ~ ~ ~~~~~~~ .       ~
          /
_________/ .  ~~~~~ ~~~~~ .       ~~~~~~ .     ~~~~~~ .     ~~~~~~ . ~~~~~
```

Great job! That's enough copying and pasting to last a lifetime. Now all you need is more practice. Have fun!

## Solutions

```bash
# 1. Expand your army by cloning your most deadly minions! Rule the world! Use
# `y` in combination with the operators you've learned in previous chapters to
# copy a deadly minion and `p` to paste it and thereby clone it for great
# glory.

  start here
  /
 /
v /re<ENTER>y2wPjyyp3jyi"P/(<ENTER>yi(P
orc orc orc orc orc orc orc
orc goblin orc orc goblin orc
red dragon ant cockroach
lich king
rat giant spider rat
earth golem
octopus "kraken" octopus
shark (death knight)
zombie zombie ghoul
```

```bash
#  2. Surround thy enemies with hordes of orcs!!! Experiment with different
#  types of yanking and pasting.

  start here
  /
 /
v
orc orc orc orc orc orc
orc orc orc orc orc orc
orc orc orc orc orc orc

      orc
orc halfling orc <== surrounded
      orc

============| |==========

(paladin)

       ooo  ^^^^^^^^^^ooo

     (wizard)

^^^^^  ^^^ ^^ ^ ^ ^^^

(elf archer)

```

```bash
#3. Ninjas are extremely fast, stealthy and deadly. Therefore we need to
#   surround them at once without moving the cursor from their location.
#   Experiment with `P` and `gP` until you get it right.

  start here
  /
 /
v /jyy(n<ENTER>gPpngPp
orc orc orc orc orc orc
orc orc orc orc orc orc
orc orc orc orc orc orc

orc orc orc orc
     ninja <== surrounded
orc orc orc orc
============| |==========

(ninja)

       ooo  ^^^^^^^^^^ooo

     (ninja)

^^^^^^  ^^^ ^^ ^ ^ ^^^^^
^^^ ^^^^^^^^^^^^^^^^^ ^^
```

```bash
# 4. The master dwarves and gnomes of Ahknbar have discovered the secrets of
# teleportation. Using the mysterious ways of Vim they've learned to harness
# the `d` and `p` commands to transport anything between any two points.
# Try it!

  start here
  /
 /
v .  /d<ENTER>di(f(pndi"f+p/g<ENTER>dwf"p
^^^^^^  ^^^ ^^ ^ ^ ^^^^^ ^^^^^^
^^^ ^^^^^^^^^^^^^^^^^ ^^^^^^^^^
^^^                         ^^^
^^                           ^^
^     (dwarf) ====>   ( )     ^
^^^^  "dwarf" ====>   + +   ^^^
^^    gnome ======>   " "    ^^
^^                            ^
^^                            ^
^^^^^^  ^^^ ^^ ^ ^ ^^^^^^^^^^^^
^^^ ^^^^^^^^^^^^^^^^^ ^^^^^^^^^
```

```bash
# 5. A group of daring dwarves pushing the boundaries of teleportation happen to
# have teleported themselves into the depths of the earth. Would you be so kind
# as to rescue them?

  start here
  /
 /
v /d<ENTER>ddjp
^^^^^^  ^^^ ^^ ^ ^ ^^^^^ ^^^^^^
^^^ ^^^^^^^^^^^^^^^^^ ^^^^^^^^^
^^^ dwarf dwarf dwarf dwarf  ^^
^^^^^^  ^^^ ^^ ^ ^ ^^^^^^^^^^^^
^^^ ^^^^^^^^^^^^^^^^^ ^^^^^^^^^

      o .        + .     +
o             o
                            o
============| |================
o        +       +
       + .                 +
                  +
```

```typescript
// 6. We're developing a new roguelike game and it's going to be awesome!! Awesome!!
// The game is going to be a mash up of your favorite video games, fantasy and scifi,
//  and the player will be able to choose to play with any of your favorite characters! What?!
// Add some of your favorite characters to the character selection screen.
// Use what you've learned so far to achieve it in the fastest way you can think of.

//   start here
//    /
//  /
// v jyypci"Conan<ESC>fAcwBarbarian<ESC>fHcwHuman<ESC>
const characters = [
  new Character({ name: "Tanis", class: Classes.Archer, race: Race.HalfElf }),
];

characterSelectionScreen.add(characters);
```

```typescript
// 7. Correct these typos human! Tip: can you do this with the `x` and `p` commands
//    Refresher: `x` is equivalent to `dl`

//   start here
//    /
//  /
// v /t<ENTER>xpfrxp/a<ENTER>nhxpnlxp
conts charactres = [
  new Chaarcter({ name: "Tanis", clsas: Classes.Archer, raec: Race.HalfElf }),
];


characterSelectionScreen.add(characters);
```

```typescript
// 8. Strange... someone put the class members below the constructor. Ain't that quaint...
//    Let's move them back up before the constructor. Like it always should have been...
//    Tip: Can you combine the `d` command with a motion to cut all members with a single command?


//   start here
//    /
//  /
// v /re<ENTER>dap?co<ENTER>P
class Character {
  constructor({name, class, race}: CharacterStats) {
    this.name = name;
    this.class = class;
    this.race = race;
  }

  readonly name;
  readonly class;
  readonly race;

  // Other code...
}
```

```bash
# 9. We're preparing an assault in the human city of Gonlor, pride of The First Humans.
#    We've enlisted our bravest and fiercest warriors from the sacred lands of Wordor who
#    have pledged to drive the human blight away of these sacred grounds.
#    Create a balanced battle formation by alternating globins and orcs.
#    Tip: Think about how you can use registers to achieve this task

  start here
  /
 /
v "ayawdd"byaw2ddO<ESC>"ap"bp"ap"bp.....
goblin goblin globin goblin
orc orc orc orc goblin orc
orc goblin orc orc orc orc
.     + `
     .          ~ .
============| |==========
            | |
============| |==========
     +
o .      .      x .   +

   .   ooo  ^^^^^^^ ^ ooo
soldier solider soldier soldier
     soldier soldier soldier
  +    archer archer archer
       wizard archer archer

^^^^^^  ^^^ ^^ ^ ^ ^^^^^| |^^
^^^ ^^^^^^^^^^^^^^^^^ ^^| |^^
```

```typescript
// 9. There's been a mixup in the battle plans and our goblin formation is made of orcs,
//    and our orcs formation is made out of goblins. We need to fix this mixup and also
//    make sure we send the goblins to battle first.
//    Tip: Try using y and p and see what happens

//   start here
//     /
//   /
// v  /orcs<ENTER>yiwkviwpjviwpnviwp => oh no! It's orcs, that's the problem I was trying to illustrate! :)
class Orc {}
class Goblin {}
const goblins = [new Orc(), new Orc(), new Orc()];
const orcs = [new Goblin(), new Goblin(), new Goblin()];
// We'd like to send the goblins first to battle, because they're cannon fodder
// that will tire the enemy before the real warriors arrive.
sendArmiesToBattle(orcs);
```

```typescript
// 10. There's been a mixup in the battle plans and our goblin formation is made of orcs,
//    and our orcs formation is made out of goblins. We need to fix this mixup and also
//    make sure we send the goblins to battle first.
//    Tip: Try using y and p and see what happens. Can you see any opportunity to make
//    your task easier with the yank register.

//   start here
//     /
//   /
// v  /goblins<ENTER>yiwjviwpkviwp/orcs<ENTER>viw"0p
class Orc {}
class Goblin {}
const goblins = [new Orc(), new Orc(), new Orc()];
const orcs = [new Goblin(), new Goblin(), new Goblin()];
// We'd like to send the goblins first to battle, because they're cannon fodder
// that will tire the enemy before the real warriors arrive.
sendArmiesToBattle(orcs);
```

```bash
# 11. Retreat! Our troops have been decimated by the evil humans!
#     Transport these troops across the river back to the safety of Wordor. You
#     must take all troops away at the same time before you start placing them
#     across the river. Otherwise, our enemies will see our retreat and attack
#     in force.
#     Tip: how can you use the **cut registers** to solve this exercise?

  start here
  /
 /
v    /ddj3dap/o<ENTER>"2p"1p
goblin

orc orc orc goblin orc
orc goblin orc orc orc orc

trolloc
  trolloc

       lich
ghoul skeleton

.     + `
     .          ~ .
============| |==========
            | |
============| |==========
     +
o .      .      x .   +



^^^^^^  ^^^ ^^ ^ ^ ^^^^^| |^^
^^^ ^^^^^^^^^^^^^^^^^ ^^| |^^
```

```bash
# 12. The human bligh keeps pushing us out of our ancestral lands. We must flee
#     into the unknown. Help our people board the vessels that will take us to
#     safety. We shall return.
#     Tip: Trouble pasting a line to the right of another word? Try pasting it
#     in Insert mode.
#     Bonus: To make it even more exciting and play with the different copying
#     and pasting alternatives, try creating a queue of monsters in order of size
#     <TROLL ogre orc orc orc goblin>
#     Monster connoisseurs may get into a debate about whether the natural Ogre
#     of the Krag mountains is equal or greater in size to a Troll but in this
#     case the Troll is way bigger because it is in capital letters TROLL as in
#     big ass TROLL.

  start here
  /
 /
v  /o<ENTER>dw/goA <ESC>p?or<ENTER>dd<C-O>A <C-R>"dd/trdw<C-O>A <ESC>p
   ~~~~~ . .. ~~~~~ . `~~~~~~ ~~~~~~                ~~~~
---------            ~~~~~~~ `~~~~~~ ~~~~ ~~~~~~ .           ~~
    ogre
          \_________ ~~~         `~~~~~~       ~~~ ~~~~~~ .        ~~
                    \______
                           \  ~~~~~ ~~~       `~~~~ .      ~~~
orc orc orc
                            | ~~~~ ~~~~~~~
                            |            ~~~~~~  ~~~~~ `~~~ ~ ~ ~~~~
                            |              _____~~~~~
                            |             /  o  \        ~~~~~~~~~
                            |  `~~~~~    |       | . ~~~~~~~~~
                            |            |   o   | ~~~~ .   ~~ ~ ~ ~ ~ ~~~~~
move your troops            |            |       | ~~~ .   ~ ~ ~ ~ ~ ~ .
to form a line              ==============       | . ~~~~~
here => goblin
                            ==============       |
                            |        ~~  |   o   | ~~~~ ~~~ ~~~~  ~~~
                            |   ~~~~     |       | ~~  ~~~~~       ~~~~
                            |            |   o   |
                           _|            |       | .  ~~~~ ~ ~ ~~~~~
                         _/  ~~~~~        \+++++/ .
                  TROLL /
            /\_        / . ~~~~~~~~~~
           /   \______/ ~~~~~ .    ~~~~~~~~~~~~ . ~ ~ ~~~~~~~ .       ~
          /
_________/ .  ~~~~~ ~~~~~ .       ~~~~~~ .     ~~~~~~ .     ~~~~~~ . ~~~~~
```
