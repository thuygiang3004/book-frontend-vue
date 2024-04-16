import {describe, expect, it} from "vitest";
import {mount} from "@vue/test-utils";
import BookList from "@/components/BookList.vue";

describe('BookList', () => {
    it('shows a book list', () => {
        const books = [
            {
                id: 1,
                title: "beatae hic quisquam",
                author: "Quinn Gorczany",
                publisher: "Stehr PLC",
                created_at: "2024-04-15T13:06:22.000000Z",
                updated_at: "2024-04-15T13:06:22.000000Z"
            },
            {
                id: 2,
                title: "beatae vitae quasi",
                author: "Mrs. Sharon Swift V",
                publisher: "Friesen LLC",
                created_at: "2024-04-15T13:06:23.000000Z",
                updated_at: "2024-04-15T13:06:23.000000Z"
            },
        ]
        const wrapper = mount(BookList, {props: {books: books}})

        expect(wrapper.text()).toContain('Book:')
        expect(wrapper.text()).toContain('beatae hic quisquam')
        expect(wrapper.text()).toContain('beatae vitae quasi')
        expect(wrapper.findAll('li')).toHaveLength(2)
    })
})