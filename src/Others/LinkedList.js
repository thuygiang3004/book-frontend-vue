class LinkedList {
    constructor(head) {
        this.head = head
    }

}

class ListNode {
    constructor(data) {
        this.value = data
        this.next = null
    }
}

const node1 = new ListNode(2)
const node2 = new ListNode(5)
node1.next = node2

const linkList = new LinkedList(node1)

console.log(linkList.head.value)