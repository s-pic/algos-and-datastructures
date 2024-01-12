class Node {
    constructor(val) {
        this.val = val
        this.next = null
        this.prev = null
    }
}

/**
 * Allows traversing the list backwards and forwards.
 * Thus, compared to the SinglyLinkedList,
 * it excels in things like pop().
 * It gives more flexibility but also more memory.
 */
class DoublyLinkedList {
    constructor() {
        this._init()
    }


    _init() {
        this.head = null
        this.tail = null
        this.length = 0
    }

    print() {
        const arr = []
        let current = this.head
        while (current) {
            arr.push(current.val)
            current = current.next
        }
        console.log(arr)
    }

    push(val) {
        const newNode = new Node(val)
        if (!this.head) {
            this.head = newNode
            this.tail = this.head
        } else {
            this.tail.next = newNode
            newNode.prev = this.tail
            this.tail = newNode
        }
        this.length++
        return this
    }

    /**
     * Way more performant than SinglyLinkedList
     */
    pop() {
        if (!this.tail) return undefined
        if (this.length === 1) {
            const oldHead = this.head;
            this._init()
            return oldHead
        }
        const poppedNode = this.tail;
        const nodeBeforeTail = poppedNode.prev
        nodeBeforeTail.next = null
        poppedNode.prev = null // remove connection to list
        this.tail = nodeBeforeTail
        this.length--
        return poppedNode
    }

    shift() {
        if (!this.length) {
            return undefined
        }
        if (this.length === 1) {
            this._init();
            return;
        }
        const oldHead = this.head
        const newHead = oldHead.next;
        newHead.prev = null
        this.head = newHead
        oldHead.next = null
        this.length--
        return oldHead
    }

    unshift(val) {
        const newNode = new Node(val)
        if (!this.length) {
            this.head = newNode
            this.tail = newNode
        }
        const oldHead = this.head
        this.head = newNode
        this.head.next = oldHead
        oldHead.prev = this.head
        this.length++
        return this
    }

    /**
     * Slightly more performant than LinkedList.
     */
    get(idx) {
        const lastIndex = this.length - 1;
        if (idx < 0 || idx > lastIndex) {
            return false
        }
        const startFromBeginning = idx <= this.length / 2
        let currentIdx = startFromBeginning ? 0 : lastIndex
        const iterateIdx = () => startFromBeginning ? currentIdx++ : currentIdx--
        let currentNode = startFromBeginning ? this.head : this.tail
        let getNodeForNextLoop = (node) => startFromBeginning ? node.next : node.prev
        while (startFromBeginning ? Boolean(currentNode.next) : Boolean(currentNode.prev)) {
            if (currentIdx === idx) return currentNode
            currentNode = getNodeForNextLoop(currentNode)
            iterateIdx()
        }
        return false
    }

    set(idx, val) {
        const node = this.get(idx)
        if (!node) return false
        node.val = val
        return node
    }

    insert(idx, val) {
        if (idx === 0) {
            this.unshift(val)
        }
        if (idx === this.length) {
            this.push(val)
        }
        const node = this.get(idx)
        if (!node) return false
        const newNode = new Node(val);
        node.prev.next = newNode
        newNode.prev = node.prev
        newNode.next = node
        node.prev = newNode
        this.length++
        return newNode
    }

    remove(idx) {
        if (idx === 0) { return this.shift()}
        if (idx === this.length - 1) { return this.pop()}
        const nodeToBeRemoved = this.get(idx)
        if (!nodeToBeRemoved) return false
        const prev = nodeToBeRemoved.prev
        const next = nodeToBeRemoved.next
        prev.next = next
        next.prev = prev
        nodeToBeRemoved.prev = null
        nodeToBeRemoved.next = null
        this.length--
        return nodeToBeRemoved
    }
}

const list = new DoublyLinkedList();
list.push("foo")
list.print()
list.push("bar")
list.print()
list.push("baz")
list.print()
console.log("pop", list.pop())
list.push("baz")
list.push("bazzzz")
list.push("bazzzzddddd")
list.print()

console.log("shift", list.shift())
list.print()
list.unshift("foo")
list.print()
console.log(list.get("bazzzz"))
console.log(list.get("bazzzzesdfrrefgdfgd"))
list.set(1, "barrr")
list.print()
list.insert(1, "bumms")
list.insert(6, "bummsi")
list.print()
console.log(list.remove(5))
list.print()
