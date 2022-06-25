import { OnChange } from './watcher'

class MyComponent {
  @OnChange('visibleChangeHandler')
  visible = false

  visibleChangeHandler (value: boolean) {
    console.log(`visible is changed to ${value}`)
  }
}

const myComponent = new MyComponent()
myComponent.visible = true
