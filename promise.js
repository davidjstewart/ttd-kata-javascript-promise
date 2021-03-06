'use strict'

module.exports = class SuperDevilPromise {

    constructor(executor) {

        this.state = 'pending'

        const resolve = (value) => {
            this.state = 'fulfilled'
            this.value = value
            this.reason = undefined
        }
        const reject = (reason) => {
            this.state = 'rejected'
            this.reason = reason
            this.value = undefined
        }

        executor(resolve, reject)
    }

    then(onFulfilled, onRejected) {
        return new SuperDevilPromise((resolve, reject) => {
            setTimeout(() => {
                try {
                    let newValue = this.value ? onFulfilled(this.value) : onRejected(this.reason)
                    resolve(newValue)
                } catch (settleError) {
                    reject(String(settleError))
                }
            })
        })
    }

}