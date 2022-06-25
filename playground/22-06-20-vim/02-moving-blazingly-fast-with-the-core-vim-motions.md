# Moving Blazingly Fast with Vim Motions

To do things in Vim you use **commands**. Commands are actions that have an effect in your editor. There's lots of different commands that do different things. **Motions** are commands that you use to move around in **Normal mode** (you'll soon learn that they are capable of a lot more).

It's time to practice some basic motions to move blazingly fast around your editor. Wiho!

> Remember that you can navigate this file using hjkl:
>
> ```
>            ↑
>      ← h j k l →
>          ↓
> ```

## Moving Horizontally Word By Word

Let's start with two great motions to move horizontally:

- `w` to move word by word
- `b` to move backwards word by word

Using `w` and `b` go to the end of the following sentence and back.

```
 start here
  /
 /
v
Hither came Conan, the Cimmerian, black-haired, sullen-eyed, sword in hand, a thief, a reaver, a slayer, with gigantic melancholies and gigantic mirth, to tread the jeweled thrones of the Earth under his sandaled feet.
```

Did you notice something interesting when moving word by word? What happened with `Conan,` and `Cimmerian,`? How did Vim treat those pesky `,`? Did you expect `,` to be part of a different word? No? Would you have enjoyed being able to jump through the whole length of `Cimmerian,` in one single jump?

You can do that! Vim distinguishes between **words** and **WORDS**. A **word** in Vim is either a sequence of letters, digits and numbers, OR a sequence of other non-blank characters.

These are all words. See how `w` and `b` behave when you navigate them:

```
these are 4 words
and these below too
,,, ..... ((((( ,.(
```

Vim also has the concept of special kinds of words (with letters, digits and numbers) that also include special characters like ., (, {, etc. They are called **WORDs** in Vim jargon. `Cimmerian,` and `Conan,` are two **words** and only one **WORD**. And just like you can move word by word using `w` and `b`, you can use the uppercase version to move **WORD** by **WORD**. Try it!

- `W` to move word by WORD
- `B` to move backwards WORD by WORD

```
 start here
  /
 /
v
Hither came Conan, the Cimmerian, black-haired, sullen-eyed, sword in hand...
```

_Did you notice the difference?_

WORDs are particularly helpful to us programmers because code often has a lot of them:

```
this is a WORD: Iam_A_WORD(WORD)
this function call sum(2,3) is also a WORD
this array [1,2,3,4,5] is a WORD as well
```

Now try combining `wW` and `bB` in the next example:

```typescript
 start here
  /
 /
v
function helloVimWorld() {
  console.log("Hello vim world");
}
// So original Jaime. Your Grandma would be proud.
```

**In general, word motions allow for more precise changes while WORD motions allow for faster movement**:

```
type wwww ==> v   v v   v   v
              word. are two words
              word. is one WORD
type WWW  ==> ^     ^  ^   ^
```

Now let's try something different:

- `e` to jump to the end of a word
- `ge` to jup to the end of the previous word

Try it!

```
 start here
  /
 /
v
Hither came Conan, the Cimmerian, black-haired, sullen-eyed, sword in hand, a thief, a reaver, a slayer, with gigantic melancholies and gigantic mirth, to tread the jeweled thrones of the Earth under his sandaled feet.
```

Just like `w` and `b`, `e` and `ge` have an equivalent for WORDs:

- `E` is like `e` but operates on WORDS
- `gE` is like `ge` but operates on WORDS

```
 start here
  /
 /
v
Hither came Conan, the Cimmerian, black-haired, sullen-eyed, sword in hand...
```

## Move to a Specific Character

Find character motions let you move horizontally quickly and with high precision:

- Use `f{character}` (find) to move to the next occurrence of a character in a line.
- Use `F{character}` to find the previous occurrence of a character

For instance, `f(` sends you to the next occurrence of `(`. Try it!

```typescript
 start here
  /
 /
v
function helloVimWorld() {
                      |
                      v now try going back with F(
  console.log("Hello vim world");
}
// So original Jaime. Your Grandma would be proud.
```

Jump around using `f{character}` and `F{character}` and collect all the letters in the circuit below:

```
-----------------f-------------------
------d------------------------------
--------------------------------X----
--o----------------------------------
------------------_------------------
----------------------------{--------
----)--------------------------------
```

You can clearly see how `f` is faster and more precise than using word motions by pitching one against the other in an example:

```
type f(   ==> v                        v
              const fireball = function(target){
type wwww ==> ^     ^        ^ ^       ^
```

In addition to `f` Vim also offers the `t` (until) command:

- Use `t{character}` to move the cursor just before the next occurrence of a character (think of `t{character}` of moving your cursor until that character).
- Again, you can use `T{character}` to do the same as `t{character}` but backwards

If the different between the f and t commands isn’t quite clear yet, here’s an example that compares both of them:

```
type t(   ==> v                       v
              const fireball = function(target){
type f(   ==> ^                        ^
```

Try to collect all the `$` in this other circuit. We shall be so rich!!!

```
----------------$f-------------------
-----d$------------------------------
-------------------------------$X----
--o$----------------------------------
------------------$_------------------
----------------------------${--------
----)$--------------------------------
```

After using `f{character}` you can type `;` to go to the next occurrence of the character or `,` to go to the previous one. You can see the `;` and `,` as commands for repeating the last character search.

This is nice because it saves you from typing the same search over and over again. Try it yourself:

```
type fdfdfd ==> v   v               v        v
                let damage = weapon.damage * d20();
                let damage = weapon.damage * d20();
type fd;;   ==> v   v               v        v
```

## Moving Horizontally Extremely

- `0`: Moves to the first character of a line
- `^`: Moves to the first non-blank character of a line
- `$`: Moves to the end of a line
- `g_`: Moves to the non-blank character at the end of a line

Experiment below. Try to get to all extremes in the piece of code below:

```typescript
 start here
  /
 /
v                // I've added some extra whitespace at the end
function helloVimWorld() {
  console.log("Hello vim world");
}
// So original Jaime. Your Grandma would be proud.
```

## Moving Vertically

Starting from `k` and `j`, we move on to a faster way of maneuvering vertically with:

- `}` jumps entire paragraphs downwards
- `{` similarly but upwards
- `CTRL-D` lets you move down half a page by scrolling the page
- `CTRL-U` lets you move up half a page also by scrolling

Go up and down this file using `{` and `}` first. Then compare it with using `CTRL-D` and `CTRL-U`. Use the `STOP` below as a bookmark :D.

```
----------------------------
-----------   --------------
---------  STOP  -----------
----------     -------------
----------------------------
             |
             |
             v continue here
```

## High Precision Vertical Motions With Search Pattern

To move anywhere within a file when you haver a target in mind, the best option is to search using:

- `/{pattern}` to search forward
- `?{pattern}` to search backwards

Let's take searching for a spin. I've taken to farming lately but I'm not very good at it. The field below has a bunch of weeds and one lonely cucumber. Try using search to get your cursor exactly on that cucumber. (And remember that in order to execute a search you need to press `ENTER` at the end of the command)

```
--------------------------
---v----------------v-----
-----------v---cucumber---
-----v-----------v--------
--------------------------
```

> In order to get search highlighted. You may need to update to vscode vim configuration. Open your user settings and make sure that the vim.hlsearch option is enabled. Now when you search the matching text is highlighted in the editor.

Awesome! `/cucumber` brought you exactly where you needed to go. You need not type the whole word though, you'll find that most often 2 or 3 characters are enough. Try `/cuc`:

```
--------------------------
---v----------------v-----
-----------v---cucumber---
-----v-----------v--------
--------------------------
```

Much faster right? If there's multiple matches of the same pattern you can quickly jump between them using:

- `n` to go to the next match
- `N` to go to the previous match

Type `n` and you jump to the next occurrence of `cuc` (Vim keeps your last search active)

```
--------------------------
---v--cucumber------v-----
-----------v---cucumber---
-----v-----------v--------
cucumber------------------
```

Now type `N` to go barwards to the top of the field, then `n` forwards until this shiny `cucumber`.

You can use `?{pattern}` to search upwards. Using `?` without a pattern changes the direction of the current search. When changing the direction `n` and `N` also change direction.

Try typing `?` and press `ENTER`. And then come back to this magic `cucumber`.

The `{pattern}` in `/{pattern}` doesn't have to be a string literal. It is a regular expression. Oh the mighty power of regular expressions!

Try using the following search command to find second level headings in this document. Notice how when you get to the end it will start back at the top. Go through the whole document until you find the next title.

- Type `/## .*`

## Moving Faster With Counts

Counts are numbers which let you multiply the effect of a command:

```
{count}{command}
```

Try them yourself! Type `2w` to move two words ahead:

```
type wwww ==> v   v v   v   v
              word. are two words
              word. are two words
type 3w2w ==>       ^       ^
```

Try `5j` to jump file lines below`:

-x
0| <-- landing site
-x

Try finding an array within an array:

```
type f[;;  ==> vv    v
               [[1], [1, 2], [3]]
               [[1], [1, 2], [3]]
type 3f[  ==>        ^
```

Try jumping to the second cucumber with `2/cuc`:

```
--------------------------
---v--cucumber------v-----
-----------v---cucumber---
-----v-----------v--------
cucumber------------------
```

Cool, right?

A faster way to move around up is to combine counts with `j` and `k`. You can enable relative line numbers to get an idea of how many lines you need to jump up, or down (You can find it in user settings under _line numbers_).

## Moving Semantically

In addition to the previous motions which don’t really take into account the meaning of your code, Vim offers additional bindings that take your code semantics into consideration:

- Use `gd` to **g**o to **d**efinition of whatever is under your cursor.
- Use `gf` to **g**o to a **f**ile in an import.

## And Some More Nifty Core Motions

These are yet more motions that can come in handy from time to time:

- Type `gg` to go to the top of the file.
- Use `{line}gg` to go to a specific line.
- Use `G` to go to the end of the file.
- Type `%` jump to matching `({[]})`.

Try going back to the top of this file with `gg`, then come back with `G`.

And now jump between these two matching brackets until you want to go to sleep:

```typescript
             start here f[%
                 \
                  \
                   v
const bagOfFoods = [["cucumber"], ["tomato", "potato"]];
```

And that's all! Pat yourself on the back. You just grokked Vim motions.
