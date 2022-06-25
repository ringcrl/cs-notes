# Editing Like Magic With Vim Operators

To do things in Vim you use **commands**. Commands are actions that have an effect in your editor. There's lots of different commands that do different things. Earlier we saw how **motions** let you move around in **Normal mode**.

**Operators** are commands that let you perform actions to change the content of your editor.

> Remember that you can navigate this file using hjkl:
>
> ```
>            ↑
>      ← h j k l →
>          ↓
> ```
>
> or {} or CTRL-U, CTRL-D

You use **operators** in combination with **counts** and **motions** to define the range of text to which an action applies:

```
   what to do (delete, change...)
      /
     /      how many times
    /         /
   v         v
{operator}{count}{motion}
                    ^
                   /
                  /
           where to perform
             the action
```

For example, take `d2w`. It tells Vim to **d**elete **2** **w**ords. Try it!

```
  start here
  /
 /
v
DO NOT ENTER!
```

And now try removing `not` from the text below:

> Remember that you can jump directly to the not word using the search motion /not (try it, and use any opportunity you find to practice motions)

```
           remove this
             /
            /
           v
You shall not pass!!
```

Yep. You could achieve that using `dw`. Interesting... So all the motions you learned earlier, which were super useful on their own terms to move fast within a file, can also be used to edit text equally fast.

Wow! Awesome right?

# Before we start: Undoing and redoing

We're going to be doing a lot of editing in this chapter so this is the perfect place to learn how to undo and redo things in Vim in case you make a mistake (Don't think too much of it, I still make mistakes after 8 years using Vim). So if you try some command and it doesn't work out as you expect. **DON'T PANIC!**. Press `u` to undo and you last change will be reverted. You can continue pressing `u` if several things went sideways. If you want to redo, type `<CTRL-R>`.

```

       |￣￣￣￣￣￣￣￣￣|
       |  DON'T PANIC! |
       |   u TO UNDO   |
       |  C-R TO REDO  |
       |＿＿＿＿＿＿＿＿＿|

```

## Practice Delete: Obliterate The Florkins!!

The following scenarios are filled with florkins. A highly invasive and very dangerous alien species that resemble earth kittens but are nothing like kittens. Well... They're cute, and fluffy, and cuddly, but behind that facade there's a deadly and bloodthirsty hunter who can devour a full-sized blurkin in under 3 seconds (and if you're wondering... florkins are nothing like flerkens).

```
     |￣￣￣￣￣￣￣￣￣|
     | I WILL DEVOUR |
     |  YOUR SOUL!!  |
     |＿＿＿＿＿＿＿＿＿|
     (\__/)  ||
     (•ㅅ•)  ||
     / 　 づ
|￣￣￣￣￣￣￣￣￣|
|＿＿＿＿＿＿＿＿＿|
```

> Try to combine the d operator with motions to obliterate these florkins. Test different motions and see which one works best. (if you struggle, take a look at the solutions at the bottom - search for /solutions, to come back here type <CTRL-O>)

```
  #1. start here florkin avenger!
  Can you obliterate these florkins with just one command?
  /
 /
v
florkin
florkin
florkin
florkin
florkin
```

> Disclaimer: no florkins, blurkins nor flerkens were harmed in the making of these practice exercises. The `d` command only sends this exotic fauna to their natural habitat in the netherworld.

```
  #2. start here!
  /
 /
v
-----=t--=v----'florkin'--------=
```

```
  #3. start here!
  /
 /
v
-------'florkin'------------
----v--------v--------------
---v------v----vflorkin-----
------v-v-------------------
-----------{florkin}--------
---v--------v---------------
```

```
  #4. start here!
  /
 /
v
florkin
florkin
florkin
cucumber
```

Now type `ggdG` to delete the whole document. **No! Don't do it!** I haven't taught you to undo yet (shhhh it's `u`)

So we've been playing a long with florkins, flerkens and blurkins but what about trying `d` with **some actual code**?!? Let's do that next.

The following extract of a semi non-sensical article about Vim has a typo with a repeated `like` inside the button. Go ahead and remove it using a combination of motions and the `d` operator.

```
<article>
    <h1>This is a super great article about Vim</h1>
    <p>
        Vim is the shait. It's really good. Mastery. Excellence. Vim. Vim.
        Good. Wow. Can't exit Vim.
    </p>
    <p>
        Really good. Much wow. Excellent. Productivity. Wow. Craftsmanship.
    </p>
    <button>
    I like like Vim
    </button>
</article>
```

Excellent! One of the simplest way to remove the typo above is `/li<ENTER>dw`. Is that what you did? Regardless, **take a moment to reflect** about how you would have achieved this without Vim. Would you have used the mouse, slowly selected the text and deleted it? Would you have navigated with the arrows? How does it feel to only need to type a few keystrokes to obliterate that typo into oblivion? Awesome right? When you become competent using Vim you'll feel like that, **all. the. time**

> Do you have a problem remembering all the motions? A great way to remember the different commands is to take advantage of mnemonics, as oftentimes the commands will be the first letter of a word which describes what they do:
>
> - d for delete
> - f for find
> - c for change
> - t for unTil
>
> and so on. If you still feel like you need a refresher, then take a look at the Cheatsheet in the Learn Vim side panel.

## Practice dd and D (Operator shorthand syntax)

When you double an operator like this `dd` you make it operate on a complete line. So `dd` lets you delete a complete line of text.

Nifty, right? Now deleting these lines of florkins becomes trivial. Just type `dd` and they're gone. Try it:

```
  #5. start here!
  /
 /
v
florkin florkin florkin florkin
kitten
florkin florkin
kitten
florkin
```

`D` is also really useful, it removes everything from the cursor until the end of the line (it is equivalent to `d$` but easier to type). Try combining `dd` and `D` to send more florkins home:

```
  #6. start here!
  /
 /
v
florkin florkin florkin florkin
kitten florkin florkin
florkin florkin
kitten kitten florkin
kitten puppy florkin
```

And now let's have a real world programming example. What is more common that code duplication? Our codebase has become bloated over the years and someone created a `sayHello` function that is exactly the same function than the existing `salute`. Remove one of them, for the glory of DRY!!

```javascript
  start here!
  /
 /
v
const salute = (person) => console.log(`Hello ${person}!`);
const sayHello = (person) => console.log(`Hello ${person}!`);
```

Now remove the verbose message in the call to action button below so it only reads _Subscribe now_:

```html
<button>
  Subscribe now to this amazing newsletter and get more awesome content!
</button>
```

Again! Marvel at how fast you can remove text using Vim operators and motions! ＼O／

> Mini-refresher: The d command
>
> - d{motion} - delete text covered by motion
>
>   - d2w => deletes two words
>   - dt; => delete until ;
>   - d/hello => delete until hello
>
> - dd - delete line
> - D - delete from cursor until the end of the line

## Practice Change: Growing as a Person in the Age of Vim

The `c` **change command** deletes a piece of text and then sends you into **Insert mode** so that you can continue typing, changing the original text into something else. The change operator is like the `d` and `i` commands combined into one. **This duality makes it the most useful operator**.

Let's illustrate the power of the `c` command with an example. We have the following variable that represent a corteous salute but we are out of courtesy and we just want to make it a polite salute instead (in essense, change any reference from `courteous` to `polite`).

Try to achieve that with the `d` and `i` commands:

```typescript
  start here and use d + i
  /
 /
v
const courteousSalute = "I courteously salute you good person.";
```

And now try to achieve the same by just using the `c` command. Don't worry if you fail, I'll show you how to do it in the next paragraph:

```typescript
  start here and use the c command
  /
 /
v
const courteousSalute = "I courteously salute you good person.";
```

Great job regardless of the results! Getting good at Vim, like with anything is all about practice. So keep at it! :) This below is one way to solve our problem using both `d` and `i`, or `c`:

```typescript
// d + i=> wdtSipolite<ESC>fcdwipolitely<ESPACE><ESC>
// c => wctSpolite<ESC>fccwpolitely<ESPACE><ESC>
const courteousSalute = "I courteously salute you good person.";
```

As you've been able to experience, using `c` saves you one keystroke which is great in itself but there's an even more compelling reason for using `c` over `d` when you want to change stuff...

## The Dot Operator

One of the most amazing operators in Vim is the dot operator or `.`. The dot operator allows you to **repeat your last change**. With one single keystroke `.` you can repeat a complete change that can be composed of as many keystrokes as you can imagine.

But **what is exactly a change?** Anything that changes the contents of your editor:

- using `d{motion}` constitutes a change,
- using `i{typeSomething}<ESC>` is another change,
- using `c{typeSomething}<ESC>` is yet another change

So by the very nature of `d` and `c`, the `c` command is more repeatable. Let's illustrate this with the same example:

```typescript
  start here
  /
 /
v
const courteousSalute = "I courteously salute you good person.";
```

In essence, we want to change `courteous` for `polite` which feels like a completely self-contained and repeatable change. In theory, we should be able to make one single change (`courteous` for `polite`) and then repeat it with the `.` operator at the right place.

Try and see whether you can achieve it with both `d` and `i`, and `c`:

```typescript
  start here
  /
 /
v
const courteousSalute = "I courteously salute you good person.";
```

Excellent work! You may have noticed that using `d` and `i` the change is **not repeatable** because the last change is either delete or insert and never the one you need. This illustrates how `c` is more repeatable than `d`.

Now see how the different approaches compare to the previous versions without the `.` operator:

```typescript
// d + i   => wdtSipolite<ESC>fcdwipolitely<ESPACE><ESC>
// c       => wctSpolite<ESC>fccwpolitely<ESPACE><ESC>
// c and . => wcfspolite<ESC>fc.
const courteousSalute = "I courteously salute you good person.";
```

**A secret to becoming more effective at text editing with Vim is learning how to make your changes more repeatable.** A skill that you'll develop as you practice more and more at using Vim.

An even more effective way to solve the problem we've been tackling is to combine two repeaters: search motions, change and the dot operator.

```typescript
// Building the command step by step:
// /co<ENTER>
// /co<ENTER>cfspolite<ESC>
// /co<ENTER>cfspolite<ESC>n.
const courteousSalute = "I courteously salute you good person.";
```

So:

1. first we search `/co<ENTER>`
2. then we describe the change `cfspolite<ESC>`
3. then we repeat the motion `n` and the change `.`

This is about the same number of keystrokes than the previous solution but far more repeatable as you could travel the entire breath of a file with `n` and `N`.

Now try to do the same and make this an `angry` salute:

```typescript
   start here
  /
 /
v
const politeSalute = "I polite salute you good person.";
```

> Amazing right? Hopefully you've started to awaken to one of the most amazing things about Vim which is its capability for composing different commands together and the infinite possibilities this unlocks.
>
> I completely understand if you feel overwhelmed by all the different motions and operators combinations available, but believe me, over time and with practice it will fade into the background and become second nature as you code.

## You're Already a Change Master

One great thing about Vim is that whenever you learn a new command, like `c` you pretty much already grok it. Why? Because you can combine it with all the motions that you already know. Prove me right and see if you can solve these exercises where we shall continue on our quest to rid our dimension of the florkin menace:

```
     |￣￣￣￣￣￣￣￣￣|
     |  YOU CANNOT   |
     |  BEAT ME!!    |
     | I'M 2 STRONG  |
     |＿＿＿＿＿＿＿＿＿|
     (\__/)  ||
     (•ㅅ•)  ||
     / 　 づ
|￣￣￣￣￣￣￣￣￣|
|＿＿＿＿＿＿＿＿＿|
```

Use what you've learned to switch evil `florkin` for cute `kitten`. Good Luck!

> Remember that if you're curious you can jump to the end to find some solutions. Just search for /solutions change. You can come back here by typing <CTRL-O>.

```
  #7. start here florkin avenger!
  Change these florkin into kittens!
  /
 /
v
florkin
florkin
florkin
florkin
florkin
```

> There's a much faster way to solve this with the :s command. But that's stuff that we'll save for later. Let's keep practicing the c command.

```
  #8. start here!
  /
 /
v
-----=t--=v----'florkin'--------=
```

```
  #9. start here!
  /
 /
v
-------'florkin'------------
----v--------v--------------
---v------v----vflorkin-----
------v-v-------------------
-----------{florkin}--------
---v--------v---------------
```

```
  #10. start here!
  /
 /
v
florkin
florkin
florkin
cucumber
```

Excellent! Great job! I hope that you recalled that shorthand syntax commands like `dd` and `D` also apply for the `c` command. If you didn't, let this be a refresher:

- `cc` changes a complete line
- `C` changes from the cursor until the end on the line

If you didn't use them in the exercises above, go back and see if any of them simplify some of the exercises.

**Now let's move onto yet another super powerful feature in Vim: Text objects.**

## Text Objects

Text objects are structured pieces of text that describe the parts in a document: words, sentences, quoted text, paragraphs, blocks, (HTML) tags, etc. You can use them in combination with operators to change a word, sentence, paragraph, etc.

You build a text object by using these particles:

```
            |- `a` means around
            |- `i` means inner
           /
          /
         /
        {a|i}{text-object}
                  /
                 /
                | w - word
                | s - sentence
                | p - paragraph
                | " - quotes
```

And then you combine them with an operator like so:

```
{operator}{a|i}{text-object}
```

Let's give it a ride. Imagine that you want to change the content (or **i**nner part) of this string. How would you go about it?

```typescript
   you are here!
  /
 /
v
const poem = "Roses are red";
```

I imagine you may have done the following:

1. Jumped to the `R` in roses with `fR`
2. Changed the contents of the string using `ci`. For example `ci"The sky is blue<ESC>`

And that'd be an excellent way to solve this in Vim. But there's a couple of ways to improve it.

Firstly, operators with text objects apply to the whole text object regardless of where your cursor is located:

```typescript
      Try ci" anywhere here and see that it works
                     /
                    /
             ---------------
const poem = "Roses are red";
```

So anywhere including the quotes themselves is game for applying an operator with the text object. This is really wonderful because it means that commands with text-objects are more repeatable than commands with regular motions. Here goes an example:

```
We are going to chance florkin for kitten once more
Try using:
  1. cw and .
  1. ciw and .

  you are here
  /
 /
v
florkin
florkin
```

Did you notice any difference? With `ciw` you can do the following `ciwkitten<ESC>j.` whereas with `cw` you need to course correct and move the cursor to the beginning of the next line `ciwkitten<ESC>0j.`. Why is this necessary? Because `cw` works from the cursor to the beginning of the next word, whereas `ciw` works on the inner word under the cursor. That's why operators with text objects are more repeatable than regular motions, because it they are more resilient to where the cursor is placed as long as it is anywhere on a text object.

Secondly, text objects with quotes `"`, `'` and backtick are special. They have a forward seeking behavior so that **you don't even need to be on top of the text object itself**. Try `ci"` from the beginning of the line below:

```typescript
   Type ci" directly from the beginning
  /
 /
v
const poem = "Roses are red";
```

**Isn't that awesome? Just for that Vim deserves a place in VSCode.**

> This forward seeking behavior only applies to quotes. For the rest of the text objects you need to have the cursor on top of the text object itself in order to apply a change. There's a plugin in vanilla Vim that extends this behavior to the rest of the text objects which is preeeetty awesome, but it hasn't been yet ported to VSCodeVim.

### a vs i

Let's focus now on understanding the difference between `a` (around) and `i` (inner). Try to **d**elete these florkins using text objects built with both `a` and `i` and see what happens:

> Remember that you can undo by simply typing `u`. So try ci(, the type u, then ca(, and so on.

```

parens:       ------------(florkin)------
brackets:     ---[florkin]---------------
curly braces: {florkin}......{florkin}...
quotes:       A "florkin" is not a cat.
A word:       A florkin is not a cat.
A sentence:   florkin florkin florkin florkin

```

So *i*nner means that it applies to the inner part of a text object, whereas *a*round means that it applies to the complete text object including delimiters (in case of `(`, `{`, `"`, etc) or whitespace in case of words, sentences and paragraphs.

### Playing With Text Objects

Ok, now that you understand the fundamentals of text objects let's just practice using operators with text objects with some code and text examples. Let's go!

```javascript
// #11. Someone changed this code but forgot to update
// the logger when an error occurs. Can you update the
// logged message to reflect what the code is doing and
// be "updating" instead of "retrieving"?

  start here
  /
 /
v
try {
  await this.server.update(eatenMuffins);
} catch (e) {
  this.logger.error("error retrieving muffins: ", e);
  throw e;
}
```

```javascript
// #12. For some reason this saluting function only works
// with florkins, update it so that works with persons
// instead.

  start here
  /
 /
v
const hi = (florkin) => console.log(`hi ${florkin}!`);
```

```javascript
// #13. This method creates characters in a roguelike game.
// The initial inventory is way to buffed and is unbalancing
// the game. Make the initial inventory a simple, yet trusty towel.
// And don't panic.

  start here
  /
 /
v
function createCharacter(name) {
  const initialInventory = ["sword +2", "shield", "cloak of invisibility"];
  return {
    name,
    inventory: initialInventory,
    stats: generateRandomStats(),
  };
}
```

```javascript
// #14. The strength stat of Conan can't be anything lower
// than Infinity. Update the method below to always return
// Infinity.

  start here
  /
 /
v
class Conan extends Barbarian {
  // code, code, code...
  get strength() {
    return this.stats.strength + this.inventory.getStrengthMods();
  }
}
```

```
// #15. This is the documentation of FizzBuzzJS a completely
// ficticious JavaScript framework that lets you build fast
// and ultra performant modern web applications, also known
// as PUMAW. Since it doesn't exist, please delete it.

  start here
  /
 /
v
A FizzBuzzJS model:
- Manages the state of a portion of your application
- Notifies when the state changes through events so that consumers of the
  model can update themselves
- It's very handsome

```

> if you have some trouble getting to the right sentence below try using `gj` instead of `j`, when you prepend `g` before `j` and `k` you can navigate wrapped lines (and not just lines).

```
// #16. A florkin has hacked the React documentation and introduced
// a reference to the FizzBuzzJS framework. Find it and delete it
// before anyone notices. The future of humankind is in your hands.

  start here
  /
 /
v
React makes it painless to create interactive UIs. Design simple views for each state in your application, and React will efficiently update and render just the right components when your data changes. But never as fast as FizzBuzzJS the florkin JS framework. Submit puny humans. Declarative views make your code more predictable and easier to debug.

```

```html
<!-- 
  #17. Update all the dangerous species below for kittens

  start here
  /
 /
v  -->
<ul>
  <li>florkin</li>
  <li>florkin</li>
  <li>blurkin</li>
  <li>florkin</li>
  <li>flerken</li>
</ul>
```

```html
<!-- 
  #18. Correct all classes below so that they accurately
       represent the level of danger of the listed species.
       
  start here
  /
 /
v  -->
<ul>
  <li class="deadly">kitten</li>
  <li class="unthreatening">florkin</li>
  <li class="unthreatening">blurkin</li>
  <li class="unthreatening">florkin</li>
  <li class="unthreatening">human</li>
</ul>
```

Great job! Feel the Vim mastery coursing through your veeeeins!!!

```
       ____________________
      | UNLIMITED POWER!!! |
       --------------------
            /
            \
            ↖(^▽^)↗
```

## Other Operators

In addition to `d` and `c` these are other useful operators:

- `y` (yank): Copy in Vim jargon
- `p` (put): Paste in Vim jargon
- `g~` (switch case): Changes letters from lowercase to uppercase and back. Alternatively, use `gu` to make something lowercase and `gU` to make something uppercase
- `>` (shift right): Adds indentation
- `<` (shift left): Removes indentation
- `=` (format code): Formats code

`y` and `p` is how you copy and paste things in Vim. Like `d` and `c`, `y` can be combined with motions and text objects to copy any text that you desire:

```html
<!--
  #19. Clone the florkin in the list item below and
  create a malevolent army of florkins! Moahahaha.
  Hint: (It is a line... with what you've learned thus far...
  how would you copy a line?)

  start here!
   /
 /
v      -->
<ul>
  <li class="dangerous">florkin</li>
</ul>
```

There is a complete chapter where we'll dive deeper into copying and pasting, so let's move on to the last operators `g~`, `>`, `<` and `=`. The text below is wronly indented and it has some issues with letter casing. Can you fix it?

> Formatting is less of an issue if you're using a formatter like prettier. But it can come in handy in situations where no formatter is available.

```
<ul>
  <LI>wot</LI>
    <li>wot</li>
        <li>wot</li>
    <li>wot</li>
  <lI>wot</lI>
</ul>
```

## More Short-hand Operators

- `x` is equivalent to `dl` and deletes the character under the cursor
- `X` is equivalent to `dh` and deletes the character before the cursor
- `s` is equivalent to `ch`, deletes the character under the cursor and puts you into Insert mode
- `r` allows you to replace one single character for another. Very handy to fix typos.
- `~` to switch case for a single character

A nice way use case for `x` is to swap a couple of characters when you make a typo. You remove (and cut) a character with `x` and immediately paste it after the cursor with `p`. Try it!

```
  #20. Can you fix this typos?

  Start here!
  /
 /
v
I am realyl hapyp!
```

> Oh... Did I forget to tell you? `d`, `c`, `x` and `s` in addition to removing and changing also cut (so whatever you remove or change is available in your clipboard). We'll dive deeper into this in the upcoming chapter on copying and pasting.

## Celebrate!

This was a reaaally long chapter full of exercises. **Congratulations on reaching the end! Great job!** Now you have a much better grasp of Vim's motions and operators. Just a little more practice and you'll be kicking ass in no time.

```
|￣￣￣￣￣￣￣￣￣￣￣|
|  AWESOME JOB!    |
|  CELEBRATEEE !   |
|＿＿＿＿＿＿＿＿＿＿＿|

      ヽ(^o^)ノ
```

# Solutions to some of the exercises

## Solutions Delete

```
  #1. start here florkin avenger!
  Can you obliterate these florkins with just one command?
  /
 /
v (d4j obliterates all the florkins at once)(5dd)
florkin
florkin
florkin
florkin
florkin
```

```
  #2. start here!
  /
 /
v (ffdt')
-----=t--=v----'florkin'--------=
```

```
  #3. start here!
  /
 /
v (/fldt'ndt-ndt})
-------'florkin'------------
----v--------v--------------
---v------v----vflorkin-----
------v-v-------------------
-----------{florkin}--------
---v--------v---------------
```

```
  #4. start here
  /
 /
v (d/cu<ENTER>)
florkin
florkin
florkin
cucumber
```

```
  #5. start here!
  /
 /
v (ddjddjdd) (ddj.j.)
florkin florkin florkin florkin
kitten
florkin florkin
kitten
florkin
```

```
  #6. start here!
  /
 /
v (ddjwDjdd2wDjhD)
kitten florkin florkin
florkin florkin
kitten kitten florkin
kitten puppy florkin
```

## Solutions Change

```
  #7. start here florkin avenger!
  Change these florkin into kittens!
  /
 /
v (cwkitten<ESC>jb.jb.jb.jb.)(cckitten<ESC>j.j.j.j.)
florkin
florkin
florkin
florkin
florkin
```

```
  #8. start here!
  /
 /
v (ffct'kitten<ESC>)
-----=t--=v----'florkin'--------=
```

```
  #9. start here!
  /
 /
v (/fl<ENTER>cfnkitten<ESC>n.n.)
-------'florkin'------------
----v--------v--------------
---v------v----vflorkin-----
------v-v-------------------
-----------{florkin}--------
---v--------v---------------
```

```
  #10. start here!
  /
 /
v (cckitten<ESC>j.j.)
florkin
florkin
florkin
cucumber
```

```javascript
// #11. Someone changed this code but forgot to update
// the logger when an error occurs. Can you update the
// logged message to reflect what the code is doing and
// be "updating" instead of "retrieving"?

  start here
  /
 /
v (/re<ENTER>ciwupdating<ESC>)
try {
  await this.server.update(eatenMuffins);
} catch (e) {
  this.logger.error("error retrieving muffins:", e);
  throw e;
}
```

```javascript
// #12. For some reason this saluting function only works
// with florkins, update it so that works with persons
// instead.

  start here
  /
 /
v (ffciwperson<ESC>;.)
const hi = (florkin) => console.log(`hi ${florkin}!`);
// you may be tempted to use ci( but in this case ciw is more repeteable
```

```javascript
// #13. This method creates characters in a roguelike game.
// The initial inventory is way to buffed and is unbalancing
// the game. Make the initial inventory a simple, yet trusty towel.
// And don't panic.

  start here
  /
 /
v (/[<ENTER>ci["towel"<ESC>)
function createCharacter(name) {
  const initialInventory = ["sword +2", "shield", "cloak of invisibility"];
  return {
    name,
    inventory: initialInventory,
    stats: generateRandomStats(),
  };
}
```

```javascript
// #14. The strength stat of Conan can't be anything lower
// than Infinity. Update the method below to always return
// Infinity.

  start here
  /
 /
v // (3jci{return Infinity;<ESC>)
  // (/ret<ENTER>wCInfinity;<ESC>)
  // (/ret<ENTER>wct;Infinity<ESC>)
class Conan extends Barbarian {
  // code, code, code...
  get strength() {
    return this.stats.strength + this.inventory.getStrengthMods();
  }
}
```

```
// #15. This is the documentation of FizzBuzzJS a completely
// ficticious JavaScript framework that lets you build fast
// and ultra performant modern web applications, also known
// as PUMAW. Since it doesn't exist, please delete it.

  start here
  /
 /
v (dap)
A FizzBuzzJS model:
- Manages the state of a portion of your application
- Notifies when the state changes through events so that consumers of the
  model can update themselves
- It's very handsome

```

> if you have some trouble getting to the right sentence below try using `gj` instead of `j`, when you prepend `g` before `j` and `k` you can navigate wrapped lines (and not just lines).

```
// #16. A florkin has hacked the React documentation and introduced
// a reference to the FizzBuzzJS framework. Find it and delete it
// before anyone notices. The future of humankind is in your hands.

  start here
  /
 /
v (/Bu<ENTER>2das)
React makes it painless to create interactive UIs. Design simple views for each state in your application, and React will efficiently update and render just the right components when your data changes. But never as fast as FizzBuzzJS the florkin JS framework. Submit puny humans. Declarative views make your code more predictable and easier to debug.

```

```html
<!-- 
  #17. Update all the dangerous species below for kittens

  start here
  /
 /
v (jcitkitten<ESC>j.jj.) -->
<ul>
  <li>florkin</li>
  <li>florkin</li>
  <li>blurkin</li>
  <li>florkin</li>
  <li>flerken</li>
</ul>
```

```html
<!-- 
  #18. Correct all classes below so that they accurately
       represent the level of danger of the listed species.

  start here
  /
 /
v (jjci"deadly<ESC>jj.) -->
<ul>
  <li class="deadly">kitten</li>
  <li class="unthreatening">florkin</li>
  <li class="unthreatening">blurkin</li>
  <li class="unthreatening">florkin</li>
  <li class="unthreatening">human</li>
</ul>
```

```html
<!--
  #19. Clone the florkin in the list item below and
  create a malevolent army of florkins! Moahahaha.

  start here!
   /
 /
v (jyy5p)     -->
<ul>
  <li class="dangerous">florkin</li>
</ul>
```

```
  #20. Can you fix this typos?

  Start here!
  /
 /
v (fyxp;xp)
I am realyl hapyp!
```
