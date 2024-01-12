class Node {
    constructor(val) {
        this.val = val
        this.next = null
    }
}


/**
 * FIFO.
 * Implementation choice taken here: add to end and remove from beginning (which is O(1), whereas removing from the end would be O(n).
 */
class Queue {
    constructor() {
        this.head = null
        this.tail = null
        this.size = null
    }

    /**
     * Add to end
     */
    enqueue(val) {
        this.size++
        const newNode = new Node(val);
        if (!this.tail) {
            this.tail = newNode
            this.head = newNode
        } else {
            this.tail.next = newNode
            this.tail = newNode
        }
        return this.size
    }

    /**
     * Remove from beginning
     */
    dequeue() {
        if (!this.head) return false

        const oldHead = this.head
        this.head = oldHead.next
        oldHead.next = null
        this.size--
        if (!this.size) {
            this.head = null
            this.tail = null
            return null
        }
        return oldHead
    }
}

const q = new Queue()
console.log(q.enqueue(1))
console.log(q.enqueue(2))
console.log(q.enqueue(3))
console.log(q.dequeue())
console.log(q.dequeue())
console.log(q.dequeue())
console.log(q)
