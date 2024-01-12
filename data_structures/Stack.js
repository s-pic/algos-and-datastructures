class Node {
    constructor(val) {
        this.val = val
        this.next = null
    }
}

class SinglyLinkedList {
    constructor() {
        this.init()
    }

    init() {
        this.tail = null
        this.head = null
        this.length = 0
    }

    push(value) {
        const newNode = new Node(value)
        if (!this.tail) {
            this.tail = newNode
            this.head = newNode
        } else {
            this.tail.next = newNode
            this.tail = newNode
        }
        this.length++
        return this
    }

    /**
     * Promote the node before the tail (the node without .next) to be the new tail
     */
    pop() {
        if (!this.tail) return this
        // current node is node before tail
        if (this.length === 1) {
            this.init()
            return this
        }

        let currentNode = this.head
        let newTail
        while (currentNode.next) {
            newTail = currentNode
            currentNode = currentNode.next
        }
        newTail.next = null
        this.tail = newTail
        this.length--
        return this
    }

    shift() {
        if (!this.head) return undefined
        if (this.length === 1) {
            this.init()
            return this
        }

        const oldHead = this.head
        this.head = oldHead.next
        this.length--
        return oldHead

    }

    unshift(value) {
        if (!this.length) return this.push(value)

        const oldHead = this.head
        this.head = new Node(value)
        this.head.next = oldHead
        this.length++
        return this
    }

    get(position) {
        if (position < 0 || position >= this.length) return undefined
        let result = this.head
        for (let idx = 0;idx < position;idx++) {
            result = result.next
        }
        return result
    }

    /**
     * Set node at given position to have given value
     * @param position
     * @param value
     * @return {undefined}
     */
    set(position, value) {
        const nodeAtPosition = this.get(position)
        if (!nodeAtPosition) return false
        nodeAtPosition.val = value
        return this
    }

    insert(position, value) {
        if (position < 0 || position > this.length) return undefined
        if (position === 0) return this.unshift(value)
        if (position === this.length ) return this.push(value)

        let nodeBeforeReferencedPosition = this.get(position - 1)
        if (!nodeBeforeReferencedPosition) return false

        const oldNext = nodeBeforeReferencedPosition.next
        const newNode = new Node(value);
        newNode.next = oldNext
        nodeBeforeReferencedPosition.next = newNode
        this.length++
        return this
    }

    remove(position) {
        if (position < 0 || position > this.length - 1) return undefined
        if (position === 0) return this.shift()
        if (position === this.length - 1) return this.pop()

        const prev = this.get(position - 1)
        const removed = prev.next
        prev.next = removed.next
        this.length--
        return this
    }

    print() {
        const arr = []
        let current = this.head
        while (current) {
            arr.push(current.val)
            current = current.next
        }
        return arr
    }

    // H1 ->3 -->  5 ->  6T
    // T1 -->3 --> 5 -->6H
    // node prev
    reverseInPlace() {
        if (this.length < 2) return

        let node = this.head
        this.head = this.tail
        this.tail = node

        let prev = null
        let next
        for (let idx = 0; idx < this.length;idx++) {
            next = node.next
            node.next = prev

            prev = node
            node = next
        }
        return this
    }


    //    H->N->N->T->null
    //   1T  3  5  7H
    //    P  N  next
    reverseInPlace2() {
        if (this.length < 2) return

        let node = this.head
        this.head = this.tail
        this.tail = node

        let prev = null
        let next
        for (let idx = 0; idx < this.length;idx++) {
            next = node.next
            node.next = prev

            prev = node
            node = next
        }
        return this
    }
}



/**
 * Abstract datastructure obeying LIFO principle.
 * A series of node, with last and first. Nodes point to each other.
 * Usages: Call stack, Undo / Redo, Routing History, Algorithms for trees or graphs
 * Can be implemented using an array, using push and pop (shift and unshift is expensive).
 * Can also be implemented using a Linked list.
 * Insertion and removal is O(1). Searching and is O(n)
 */
class Stack {
    constructor() {
        this.list = new SinglyLinkedList()
    }

    getFirst() {
        return this.list.head
    }

    getLast() {
        return this.list.tail
    }

    push(val) {
        return this.list.unshift(val)
    }

    pop() {
        return this.list.shift()
    }

    getLength() {
        return this.list.length
    }

    print() {
        return this.list.print()
    }
}

const s = new Stack()
s.push("foo")
s.push("bar")
s.push("bumms")
console.log("1", s.print())

console.log(s.pop())
console.log(s.pop())
console.log(s.pop())
console.log(s.pop())



