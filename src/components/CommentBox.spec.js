import {mount} from "@vue/test-utils";
import {describe, expect, it, vi} from "vitest";
import CommentBox from "@/components/CommentBox.vue";

// const mockCreateCommentFn = vi.fn(() => Promise.resolve())

const mock = vi.hoisted(() => {
    return {
        createComment: vi.fn()
    }
})
vi.mock('@/API/HttpService', () => {
    const actual = vi.importActual('@/API/HttpService')
    return {
        ...actual,
        createComment: mock.createComment,
    }
})
describe('Test Comment Box', () => {
    it('shows a comment box', async () => {
        const wrapper = mount(CommentBox)

        const inputField = wrapper.find('input')
        expect(inputField.attributes('placeholder')).toBe('Leave a comment')
    })

    it('adds a comment', async () => {
        const wrapper = mount(CommentBox)

        const inputField = wrapper.find('input')
        await inputField.setValue('Awesome')

        await wrapper.find('button').trigger('click')

        expect(mock.createComment).toHaveBeenCalledTimes(1)
        expect(mock.createComment).toHaveBeenCalledWith('Awesome')
    })
})