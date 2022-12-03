import { createStore, applyMiddleware } from 'redux';
import { HYDRATE, createWrapper } from 'next-redux-wrapper'
import thunkMiddleware from 'redux-thunk'
import reducers from './reducers/redcuers'

const bindMiddlware = (middlware: any) => {
    if (process.env.NODE_ENV !== 'production') {
        const { composeWithDevTools } = require('redux-devtools-extension')
        return composeWithDevTools(applyMiddleware(...middlware))
    }

    return applyMiddleware(...middlware)
}

const reducer = (state: any, action: any) => {
    if (action.type === HYDRATE) {
        const nextState = {
            ...state,
            ...action.payload
        }
        return nextState
    } else {
        return reducers(state, action)
    }
}

const initStore = () => {
    return createStore(reducer, bindMiddlware([thunkMiddleware]))
}

export const wrapper = createWrapper(initStore, {
    debug: true,
    serializeState: (state) => JSON.stringify(state),
    deserializeState: (state) => JSON.parse(state),
})