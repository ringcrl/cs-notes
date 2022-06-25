# Swiftly Operating on Search Matches

Let's get on with the example in this chapter and become a rugged cucumber head hunter. Cucumbers see you and they tremble in fear!

For the first exercise we'll use a combination of:

- `n` to go to the next item matching a search (sort of repeating a search)
- `.` to repeat the last change

```
#1. Destroy all cucumbers!! Use the `d` command in combination with `/`, `n` and `.`

  start here
  /
 /
v
cucumber carrot lettuce
cabbage carrot lettuce cucumber
cucumber cucumber carrot
kale cucumber kale
```

> Remember you can find the solutions by searching for /Solutions. To come back use <CTRL-O>.

Now let's try the same example with the `gn` operator:

```
#2. Now use `gn`. I won't tell you how. You have to strain to remember from reading the chapter or just try things like a crazy maniac cucumber annihilator

  start here
  /
 /
v
cucumber carrot lettuce
cabbage carrot lettuce cucumber
cucumber cucumber carrot
kale cucumber kale
```

Cool right?

## Solutions

```
#1. Destroy all cucumbers!! Use the `d` command in combination with `/`, `n` and `.`

  start here
  /
 /
v (/cu<ENTER>dawn.n..n.)
cucumber carrot lettuce
cabbage carrot lettuce cucumber
cucumber cucumber carrot
kale cucumber kale
```

```
#2. Now use `gn`. I won't tell you how. You have to strain to remember from reading the chapter or just try things like a crazy maniac cucumber annihilator

  start here
  /
 /
v /cucumber<ENTER>dgn4.              => this doesn't quite achieve the same result
v /(cucumber | cucumber)<ENTER>dgn4. => this achieves the same result using regexp
cucumber carrot lettuce
cabbage carrot lettuce cucumber
cucumber cucumber carrot
kale cucumber kale
```
