import { VuexModule, Module, Mutation, Action } from 'vuex-class-modules'

import { store } from './index'

@Module
class Xx extends VuexModule {
  data: string = ''

  @Action
  async fetchData() {
    this.updateData('')
  }

  @Mutation
  updateData(data: string) {
    this.data = data
  }
}

export const xx = new Xx({ store, name: 'xx' })
