import {describe, expect, it, vi} from "vitest";
import {mount} from '@vue/test-utils'
import LanguageCheckboxes from "@/components/LanguageCheckboxes.vue";


const mocks = vi.hoisted(() => {
    return {
        replace: vi.fn(),
        routeName: '',
        query: {},
        useAnalytics: vi.fn()
    }
})

vi.mock('vue-router', () => ({
    createRouter: () => {
    },
    useRoute() {
        return {
            name: mocks.routeName,
            query: mocks.query
        }
    },
    useRouter() {
        return {
            replace: mocks.replace
        }
    }
}))
const mountComponent = () => mount(LanguageCheckboxes, {
    props: {
        languages: [
            {
                id: 0,
                name: 'English'
            },
            {
                id: 1,
                name: 'French'
            }
        ]
    }
})
describe('LanguageCheckboxes', () => {
    it('has languages multiple select field', () => {
        const wrapper = mountComponent()
        const checkboxes = wrapper.findAll('input[type="checkbox"]')
        expect(checkboxes).toHaveLength(2)
    });

    it('update query string when user check/uncheck a language', async () => {
        const wrapper = mountComponent()
        const englishCheckbox = wrapper.findAll('input[type="checkbox"]')[0]
        const frenchCheckbox = wrapper.findAll('input[type="checkbox"]')[1]

        await englishCheckbox.setChecked()
        expect(englishCheckbox.element.checked).toBeTruthy()
        expect(mocks.replace).toHaveBeenCalledWith({query: {languages: ['0']}})

        await frenchCheckbox.setChecked()
        expect(frenchCheckbox.element.checked).toBeTruthy()

        expect(mocks.replace).toHaveBeenCalledWith({query: {languages: ['0', '1']}})
    });
})