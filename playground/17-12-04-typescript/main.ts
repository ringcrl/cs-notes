/* eslint-disable @typescript-eslint/no-unused-vars */

interface ITodo {
  title: string
  description: string
  completed: boolean
}
type ITodoPick<T, K extends keyof T> = {
  [P in K]: T[P]
}
type TodoPreview = ITodoPick<ITodo, 'title' | 'completed'>
const todoPreview: TodoPreview = {
  title: 'Clean room',
  completed: false
}

// 类型拓展
interface IBase {
  a: string
}
interface IExtend extends IBase {
  b: string
}
const extend: IExtend = {
  a: 'a',
  b: 'b'
}

// 三目运算符
type Bar<T> = T extends string ? string : never
type C = Bar<'foo'>
type D = Bar<1>

// 类型约束
interface IHasA {
  a: string
}
function logProperty<T extends IHasA> (arg: T): void {
  console.log(arg.a)
}

interface Todo {
  title: string
  description: string
}

type MyReadonly<T> = {
  readonly [K in keyof T]: T[K]
}

const todo: MyReadonly<Todo> = {
  title: 'Hey',
  description: 'foobar'
}

// todo.title = 'Hello' // Error: cannot reassign a readonly property
// todo.description = 'barFoo' // Error: cannot reassign a readonly property

type tesla = ['tesla', 'model 3', 'model X', 'model Y']
type spaceX = ['FALCON 9', 'FALCON HEAVY', 'DRAGON', 'STARSHIP', 'HUMAN SPACEFLIGHT']
type LengthOfTuple<T extends readonly any[]> = T['length']
type teslaLength = LengthOfTuple<tesla> // expected 4
type spaceXLength = LengthOfTuple<spaceX> // expected 5
type MyExclude<T, U> = T extends U ? never : T
