import { LruCacheNode } from '@eix-js/utils'
import { Gate } from './Gate'

/**
 * The nodes used inside the gat storage
 */
export type GateNode = LruCacheNode<Gate>

/**
 * dequeue implementation with iteration support.
 * Used to store the logic gates
 */
export class GateStorage {
    /**
     * The map containing all the hash - node pairs
     */
    private hashMap = new Map<number, GateNode>()

    /**
     * The head of the dequeue
     */
    private head = new LruCacheNode<Gate>(0, null)

    /**
     * The tail of the dequue
     */
    private tail = new LruCacheNode<Gate>(0, null)

    public constructor() {
        this.init()
    }

    /**
     * Links the head to the tail
     */
    private init() {
        this.head.next = this.tail
        this.tail.previous = this.head
    }

    /**
     * Deletes a gate
     *
     * @param node The node to delete
     */
    public delete(node: GateNode) {
        node.previous.next = node.next
        node.next.previous = node.previous

        return this
    }

    /**
     * Adds a new hash - gate pair to the dequeue
     *
     * @param key The ket of the gate
     * @param node The gate itself
     */
    public set(key: number, node: GateNode) {
        this.hashMap.set(key, node)
        this.addToHead(node)
    }

    /**
     * Adds a node directly after head
     *
     * @param node The node to add
     */
    public addToHead(node: GateNode) {
        node.next = this.head.next
        node.next.previous = node
        node.previous = this.head
        this.head.next = node

        return this
    }

    /**
     * Moves a node directly after the head
     *
     * @param node The node to move
     */
    public moveOnTop(node: GateNode) {
        this.delete(node).addToHead(node)

        return this
    }

    /**
     * Gets a gate by its key
     *
     * @param key  The key of the gate
     */
    public get(key: number) {
        const node = this.hashMap.get(key)

        return node
    }

    /**
     * Gets the first gate in the dequeue
     */
    public first() {
        const first = this.head.next

        return first
    }

    /**
     * Used for iterating over the dequeue
     */
    public *[Symbol.iterator](): Iterator<Gate> {
        let last = this.tail

        while (true) {
            if (last.previous === this.head) {
                break
            } else {
                if (last.previous.data) {
                    yield last.previous.data
                }

                last = last.previous
            }
        }
    }

    /**
     * Deletes every gate in the dequeue
     */
    public clear() {
        this.hashMap = new Map()

        this.init()
    }
}
