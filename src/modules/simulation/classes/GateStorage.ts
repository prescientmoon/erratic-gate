import { LruCacheNode } from '@eix-js/utils'
import { Gate } from './Gate'

export type GateNode = LruCacheNode<Gate>

export class GateStorage {
    private hashMap = new Map<number, GateNode>()
    private head = new LruCacheNode<Gate>(0, null)
    private tail = new LruCacheNode<Gate>(0, null)

    public constructor() {
        this.head.next = this.tail
        this.tail.previous = this.head
    }

    private delete(node: GateNode) {
        node.previous.next = node.next
        node.next.previous = node.previous

        return this
    }

    public set(key: number, node: GateNode) {
        this.hashMap.set(key, node)
        this.addToHead(node)
    }

    public addToHead(node: GateNode) {
        node.next = this.head.next
        node.next.previous = node
        node.previous = this.head
        this.head.next = node

        return this
    }

    public moveOnTop(node: GateNode) {
        this.delete(node).addToHead(node)

        return this
    }

    public get(key: number) {
        const node = this.hashMap.get(key)

        return node
    }

    public first() {
        const first = this.head.next

        return
    }

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
}
