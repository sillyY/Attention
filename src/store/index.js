import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware, { END } from 'redux-saga'

/**
 * store,这里直接导出configureStore, 可供其他地方直接调用
 */
import rootReducer from '../reducers'
import rootSaga from '../sagas'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose

const configureStore = preloadedState => {
    const sagaMiddleware = createSagaMiddleware()
    const store = createStore(
        rootReducer,
        preloadedState,
        composeEnhancers(applyMiddleware(sagaMiddleware))
    )

    //开发环境使用
    if (process.env.NODE_ENV !== 'production' && module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('../reducers', () => {
            store.replaceReducer(rootReducer.default)
        })
    }

    store.runSaga = sagaMiddleware.run
    store.close = () => store.dispatch(END)

    return store
}

const store = configureStore()
store.runSaga(rootSaga)

export default store
