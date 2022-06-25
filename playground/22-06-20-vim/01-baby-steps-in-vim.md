# Baby Steps in Vim

Oh no!? If you try to type stuff with the curious looking rectangle shaped cursor nothing happens!? Or strange things happen ?!!?

щ（ﾟ Д ﾟ щ）

Ok. Take a deep breath. I haven't broken your editor. Yet.

Vim is quite a strange editor. It has modes. A mode for navigating/editing, a mode for inserting text, a mode for selecting text. This is good. It gives Vim the ability to really take advantage of that keyboard of yours because it can concentrate in just one single task at a time.

The mode that is active right now (with the rectangular shaped cursor) is **normal mode**. In that mode, Vim focus solely on navigating super fast around the code and editing, two of the most common things you do when you code.

Let's start practicing the basics of movement in normal mode: `hjkl`. `hjkl` allow you to move the cursor one space in every direction.

```
           ↑
     ← h j k l →
         ↓
```

If it sounds weird, think that you're in a game. Descending The Dungeons of Infinity in search for treasure...

````
  ________________________________________
/ Practice the mysterious arts of vimness  \
\ and collect the treasure.                /
  ----------------------------------------
         \   ^__^
          \  (oo)   For bigger challenge,
             *()*   don't look at the keyboard.
            (____)```

 start here
  /
 /
@  practice using hjkl.
   Ah! And you can't move through walls.
   ======================================|
|  |#|               |##|          |   |#|
|  |#| ------------- |##|  |-----  |     |
|  |#|      |######| |##|  |####|      |-|
|  |#------ |######| ----  |####|----- |#|
|  |######| |######|       |########## ##|
|  |------| |-----#| ----  |---------- --|
|                |#| |##|            # ##|
|##################################### ##|
|#                                       |
|---| |----------------------============|
|~~~| |~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~|
|---| |----------------------------------|
|                                        |
|=|===/?================================ |
|                                        |
|   o   o   o  o    o     o     o  o     |
|                                        |
|-=======================--$---==========#
                        |$$$$$|
                       treasure
````

Yeah! Congrats! You're now rich and can settle in a beautiful ascii palace!

```
                                   |>>>
                                   |
                               _  _|_  _
                              |;|_|;|_|;|
                              \\.    .  /
                               \\:  .  /
                                ||:   |
                                ||:.  |
                                ||:  .|
                                ||:   |       \,/
                                ||: , |            /`\
                                ||:   |
                                ||: . |
 __                            _||_   |
    '--~~__            __ ----~    ~`---,
           ~---__ ,--~'                  ~~----_____-~'
```

Now that we've learned the most basic of movements let's take a look at how you can make your editor behave like you are used to: **Insert mode**. **Insert mode** is where Vim focuses in inserting bits of text and code, just like a normal editor.

- Type `i` to get into **Insert mode**.
- Type `<ESC>`, `<CTRL-[>` or `<CTRL-C>` to get back to **Normal mode**.

Complete these sentences. Practice using `i` to get into **Insert mode** and `<ESC>` (or any of the others) to get into **Normal mode**.

```
I want to learn Vim because...
My favorite food is...
I'd die for a...
If I went to a desserted island I'd bring a...
```

Awesome! Great job!

> A great tip to improve your keyboard and Vim skills is to map your CAPSLOCK to both ESC and CTRL. ESC when pressed on its own, and CTRL when pressed in combination with any other key. This is super nice because the caps lock key is in your home row, very near the natural resting position of your hands. In Mac you can achieve that using Karabiner and there's many mechanicals keyboard that let you configure it as well like the Ultimate Hacking Keyboard.
