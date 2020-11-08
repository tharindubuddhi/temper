import { PostState } from '@/models/postState.model'
import Vuex from 'vuex'
import storeconfig from  './storeconfig'

export default new Vuex.Store<PostState>(storeconfig)