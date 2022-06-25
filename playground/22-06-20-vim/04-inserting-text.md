# Inserting Text

So far we've been focusing a lot in _Normal mode_ and we haven't paid much attention to _Insert mode_. Let's remedy that because there's a lot more to _Insert mode_ in Vim that you can imagine.

The flexibility provided by the many ways you can jump into _Insert mode_ is legendary:

- `i` lets you *i*nsert text before the cursor
- `a` lets you *a*ppend text after the cursor
- `I` lets you *i*nsert text at the beginning of a line
- `A` lets you *a*ppend text at the end of a line

```javascript

           you are here
               /
              /
             v
       const status = "I'm in awe"
      ^     ^ ^                   ^
      |     | |                   |
      I     i a                   A

```

- `o` lets you *o*pen a new line below the current line
- `O` lets you *o*pen a new line above the current line

> These two commands are some of my very favorite ones. It's so common and handy to add a new line below or above the current code line!

```javascript

           you are here
               /
              /
   O ->      v
       const status = "I'm in awe"
   o ->

```

With all these commands you can pretty much jump into insert mode anywhere. Let's take them for a spin!

> You can find all solutions at the end of this file. Just search for /solutions. To come back here type <CTRL-O>.

```
  #1. This sentence is missing a lot of punctuation, could you use your newly acquired knowledge and add some punctuation? (see if you can use both a and A)
  /
 /
v
I like potatos onions bacon milk and chocolate
```

```javascript
// #2. Add at least four heroines more!
// Try using both o and O.

const heroines = [
  "Malin Gonzalez Lejon", // <-- My wife <3<3<3
  "Wonder woman",
  "Red Sonja",
  "Captain Marvel",
  "Tika Waylan", // <-- you are here
  "Cara Dune",
  "Laurana Kanan",
  "Nona Grey",
];
```

```javascript
// #3. Add an additional filter
// condition to verify that the potatos
// aren't green. Tasty potatos must be
// well mature.

  start here
  /
 /
v
const tastyPotatos = bagsOfPotatos
  .flatmap((bag) => bag.potatos)
  .filter((potato) => !potato.isRotten);
```

The next handy mapping to jump into _Insert mode_ is `gi`. `gi` let's you go back to the last place where you made a change.

> `gi` in VSCodeVim behaves differently than in Vim. Where in Vim you go back to the last place you left Insert mode, in VSCodeVim you get into insert mode where you did you last change.

```
// #4. Type your first name, then move you cursor until the landing location and go back to type your surname with gi

  start here
  /
 /
v
My name is


      =
      =
     ===
=====   =====
     ===
      =
      =
```

> Notice how often `g` is used as a modifier of other commands. When you see `g` before a common command you can expect that the command will do something similar to the original command: For example, `gi` lets you go to the last place you left Insert mode (`i`), `ge` does the reverse of `e`, etc...

# Removing stuff from Insert mode

By far the most common way of removing stuff when using Vim is using the `d` or `c` commands from _Normal mode_, however, sometimes it's useful to remove some text right from _Insert mode_ and continue typing. Most common example? When you make a typo! :D Whenever that happens any of these bindings may help:

- `CTRL-H` lets you remove the last character you typed (mnemonic _h_ which in _hjkl_ brings the cursor one space to the left)
- `CTRL-W` lets you remove the last word you typed (mnemonic *w*ord)
- `CTRL-U` lets you remove the last line you typed (mnemonic *u*ndo this line)

Let's take it for a ride:

```
// 5#. Try to repeat these following sentences and use CTRL-H, CTRL-W to recover
// from typos. When you get to the end type CTRL-U.

 start here!
  /
 /
v
supercalifragilisticusespialidosus
(good luck!)

tres tristres trapezistas con tres trapos troceados hacen trampas truculentas
(lots and lots of good luck)

Sju sjösjuka sjömän sköttes av sjuttiosju sköna sjuksköterskor på det sjunkande skeppet Shanghai.
(there's no way you can type this without making mistakes)
(Ok. Maybe if you're Swedish)
```

> In reality these commands all affect characters behind your cursor, but the "last word you typed", "last line you typed", etc is easier to understand. Or at least that's what I think :D

Great job! For the last act try to exit _Insert mode_ using these three commands and see which one feels best for you:

- `<ESC>`
- `CTRL-C`
- `CTRL-[`

```
***********
**** i ****
***********
```

> HOT TIP: There are some tools and mechanic keyboards that allow you to map CAPS LOCK to ESC and CTRL AT THE SAME TIME! The CAPS LOCK can behave as ESC when typed on its own, or CTRL when typed in combination with other keys. THIS IS THE BEST WAY TO USE IT WITH VIM :D. Having both ESC and CTRL in the home row is THE BEST experience a Vimmer can hope for. I know of two ways to achieve it:
>
> 1. In Mac you can use [karabiner-elements](https://karabiner-elements.pqrs.org/)
> 2. The [UHK](https://ultimatehackingkeyboard.com/) and other mechanic keyboards allow you to remap your complete keyboard and achieve the ESC/CTRL combo of doom
>
> If you find out more. Please let me know! https://www.twitter.com/Vintharas

## Solutions

```
  #1. This sentence is missing a lot of punctuation, could you use your newly acquired knowledge and add some punctuation?
  /
 /
v (fsa,e.e.A.)
I like potatos onions bacon milk and chocolate
```

```javascript
// #2. Add at least four heroines more!
// Try using both o and O.

// (o"Someone"<ESC>O"someone"<ESC>)
const heroines = [
  "Wonder woman",
  "Red Sonja",
  "Captain Marvel",
  "Tika Waylan", // <-- you are here
  "Cara Dune",
  "Laurana Kanan",
  "Nona Grey",
];
```

```javascript
// #3. Add an additional filter
// condition to verify that the potatos
// aren't green. Tasty potatos must be
// well mature.

  start here
  /
 /
v (2jo.filter((potato)=> !potato.isGreen))
const tastyPotatos = bagsOfPotatos
  .flatmap((bag) => bag.potatos)
  .filter((potato) => !potato.isRotten);
```

```
// #4. Type your first name, then move you cursor until the landing location and go back to type your surname with gi

  start here
  /
 /
v (AJaime<ESC>/x<ENTER>gi)
My name is


      =
      =
     ===
===== x =====
     ===
      =
      =
```
