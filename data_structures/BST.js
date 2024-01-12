class Node {
    constructor(value) {
        this.value = value
        this.left = null
        this.right = null
    }
}


/**
 * A tree has a single root.
 * Every node points to children.
 * Applications: DOM, Network routing, AST, Decision trees (game engine or classification),
 * binary search tree, file system.
 *
 * A binary search tree
 * - is kept in an order, to allow fast search and insertion. --> It's O(log n)
 * --> we double the input (and thus -- add best ! -- only add 1 tree level) and only need 1 step more for traversal
 *  For any node on the tree, all items smaller than it are on its left. All items larger than it
 *  are on the right of it.
 * - has a single root (like all trees)
 * - has nodes with max. 2 children
 * https://visualgo.net/en/bst
 */
class BinarySearchTree {
    constructor() {
        this.root = null
    }

    insert(value) {
        const newNode = new Node(value);

        if (!this.root) {
            this.root = newNode
            return this.root
        }

        let currentNode = this.root

        while (true) {
            if (value === currentNode.value) {
                break
            }
            let path = value > currentNode.value ? "right" : "left"
                if (currentNode[path] !== null) {
                    currentNode = currentNode[path]
                } else {
                    currentNode[path] = newNode
                   break
                }

        }
        return this.root
    }

    insertRecursive(value) {
        // TODO
    }

    /**
     * @example
     * ```ts
     * const bst = new BinarySearchTree()
     * bst.insert("5")
     * bst.insert("2")
     * bst.insert("6")
     * bst.insert("1")
     * bst.insert("1")
     * bst.insert("3")
     * bst.insert("7")
     * bst.print()
     *
     * // logs

     * ```
     *               7
     *        6
     * 5
     *               3
     *        2
     *               1
     * ```
     */
    printBeautiful() {


        const walk = (node, level) => {
            if (!node) return
            if (node.right) walk(node.right, level+1)
            console.log("       ".repeat(level) + node.value)
            if (node.left) walk(node.left, level+1)

        }
        walk(this.root, 0)

    }

    find(value) {
        if (!this.root) return false
        let currentNode = this.root

        while (currentNode) {
            if (currentNode.value === value) return true

            if (value > currentNode.value) {
                currentNode = currentNode.right
            }  else {
                currentNode = currentNode.left
            }
        }
        return false
    }

    print() {
        console.log(JSON.stringify(this.root, null, 2))
    }

    /**
     * Breadth-first search -->
     * First visit every node in a level before going to the next one.
     * Trick is to traverse AND use a queue to remember what comes next, without the need to visit it right away.
     * @param callback
     */
    visitBF(callback) {
        if (!this.root) return false
        // use queue
        const queue = [this.root]
        const enqueue = (item) => queue.push(item)
        const dequeue = queue.shift.bind(queue)

        while (queue.length) {
            const currentNode = dequeue()
            if (currentNode.left) {
                enqueue(currentNode.left)
            }
            if (currentNode.right) {
                enqueue(currentNode.right)
            }
            callback(currentNode)
        }
    }

    /**
     * Depth-first order.
     * Visit node first, then traverse left side, then start looking at right side
     * --> Useful for cloaning a tree
     */
    visitDFPreOrder(callback) {
        if (!this.root) return false

        const walk = node => {
            if (!node) return
            callback(node)
            walk(node.left)
            walk(node.right)
        }
        walk(this.root)
    }

    /**
     * Depth-first order.
     * Explore left, explore right and then visit node
     * --> POST means visiting after traversal
     */
    visitDFPostOrder(callback) {
        if (!this.root) return false

        const walk = node => {
            if (!node) return
            walk(node.left)
            walk(node.right)
            callback(node)
        }
        walk(this.root)
    }

    /**
     * Depth-first order.
     * Explore left, visit, explore right, visit
     * Use-case: Printing a tre :)
     */
    visitDFPInOrder(callback) {
        if (!this.root) return false

        const walk = (node, level = 0) => {
            if (!node) return
            walk(node.left, level + 1)
            callback(node, level)
            walk(node.right, level + 1)
        }
        walk(this.root)
    }
}

const bst = new BinarySearchTree()
bst.insert("5")
bst.insert("2")
bst.insert("6")
bst.insert("1")
bst.insert("1")
bst.insert("3")
bst.insert("7")
bst.printBeautiful()
// console.log(bst.find("7"))
// console.log(bst.find("9"))
console.log("### visiting")
console.log("### BF")
bst.visitBF(node => console.log(node.value))
console.log("### DF PreOrder")
bst.visitDFPreOrder(node => console.log(node.value))
console.log("### DF PostOrder")
bst.visitDFPostOrder(node => console.log(node.value))
console.log("### DF InOrder")
bst.visitDFPInOrder((node, level) => console.log("      ".repeat(level), node.value))

// On breadth-first vs depth first.
// time complexity for traversal is the same
// but space complexity depends on the structure of the tree:
// A breadth first approach for a broad tree eats a lot of memory.