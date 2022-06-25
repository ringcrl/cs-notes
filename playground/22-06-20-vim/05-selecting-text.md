# Selecting Text

_Visual mode_ is the Vim equivalent of dragging your mouse and selecting arbitrary bits of text. Let's try out the three different ways you can select text in Visual mode:

- `v` for character-wise visual mode
- `V` for line-wise visual mode
- `C-V` for block-wise visual mode

Now use all of the above in the following exercise:

```
// #1. Try selecting some text using v, V and C-V in the
// following text. Combine these with `hjkl` and other
// motions to perform your selection once you've entered
// Visual mode.
// Example: (vll2lwbww)

"It is better to go forward without a goal,
than to have a goal and stay in one place,
and it is certainly better than to stay in one
place without a goal.”
    - The Tower of the Swallow (The Witcher #4)
```

Cool right? **The best part is that you can combine Visual mode with all the motions you've learned in previous chapters to select text to your heart's content**. The next step is to do something with that selection. And you guessed right. That's where operators come in.

Where with _Normal mode_ we apply an operator by using:

```
 action to perform
  /
 /
{operator}{count}{motion}
          ---------------
             /
            /
        bit of text over which
        to apply that action
```

In _Visual mode_ we apply an operator in the opposite way. First we select some text visually, then we apply the operator:

```
get into Visual Mode
    /
   /                  action to apply
  /                         /
---------                  /
{v|V|C-V}{count}{motion}{operator}
         ---------------
           /
          /
   bit of text over which
   to apply an action
```

Now that we have some foundation of how _Visual mode_ works let's try it out and retouch parts of the previous example. Try to perform this changes both from _Normal mode_ and _Visual mode_ so you can appreciate the difference.

> Remember you can find the solutions by searching for /Solutions. To come back use <CTRL-O>.

```
// #2. Complete these transformations using both
// *Normal mode* and *Visual mode*.
//
// 1. Remove "It is"
// 2. better => Better
// 3. in one place, => in one place.
// 4. delete everything after that

 start here
  /
 /
v
"It is better to go forward without a goal,
than to have a goal and stay in one place,
and it is certainly better than to stay in one
place without a goal.”
    - The Tower of the Swallow (The Witcher #4)
```

Now let's focus on **Block-wise Visual mode** also known as **Visual Block** which is quite special. Visual block is useful when you want to things with a block of text and come particularly handy when you want to pre-pend or append something to a block of text. Select a block of text with visual block and:

- Type `I` to jump into _Insert mode_ and _prepend_ something to all lines in the beginning of the block.
- Type `A` to do the same but this time _append_ something to all lines at the end of the block.

Try it!

```
#3. Transform the following list in a HTML ordered list using C-V in combination with I and A

  start here
  /
 /
v
- buy flour, salt and eggs
- mix two cups flour and some salt
- put a handful on flour on a flat surface
- Make sort of a volcano with the flour
- Break 3 eggs.
- The eggs are the lava in the volcano
- Slowly combine flour and eggs into a dough
- Knead the dough
- Let it rest
```

Cool right? Visual-block is the multi-cursor of Vim (more or less). Don't hesitate to check the solution below and compare with whatever you did.

> In VSCodeVim (unlike within Vim) you can also take advantage of using I and A to prepend and append to a Visual selection when you use line-wise Visual mode. So the above also applies when using V. Try it!

# Solutions

```
// #2. Complete these transformations using both
// *Normal mode* and *Visual mode*.
//
// 1. Remove "It is"
// Normal mode: ldtb
// Visual mode: lvtbd
// 2. better => Better
// Normal mode: ~
// Visual mode: v~
// 3. in one place, => in one place.
// Normal mode: /,<ENTER>ncl.<ESC>
// Visual mode: /,<ENTER>vc.<ESC>
// 4. delete everything after that
// Normal mode: jdd..
// Visual mode: jVjjd

 start here
  /
 /
v
"It is better to go forward without a goal,
than to have a goal and stay in one place,
and it is certainly better than to stay in one
place without a goal.”
    - The Tower of the Swallow (The Witcher #4)
```

```
#3. Transform the following list in a HTML ordered list using C-V in combination with I and A

  start here
  /
 /
v C-V8jc<li><ESC>C-V8j$A</li><ESC>O<ol>o</ol>
- buy flour, salt and eggs
- mix two cups flour and some salt
- put a handful on flour on a flat surface
- Make sort of a volcano with the flour
- Break 3 eggs.
- The eggs are the lava in the volcano
- Slowly combine flour and eggs into a dough
- Knead the dough
- Let it rest
```
