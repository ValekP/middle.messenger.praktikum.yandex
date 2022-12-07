import Block from "./Block"
import {assert} from "chai"
import EventBus from "./EventBus"

describe("Block", () => {
    it("Создание блока (без аргументов)", () => {
        const block = new Block()
        // @ts-ignore
        assert.equal(block._meta.tag, "div", "Тег по молчанию: div")
        // @ts-ignore
        assert.equal(typeof block._meta.props, "object", "Свойства по умолчанию")
        // @ts-ignore
        assert.equal(block._eventBus instanceof EventBus, true, "Шина событий")
    })

    it("Создание блока (с аргументами)", () => {
        const block = new Block("section", {prop: "prop 1"})
        // @ts-ignore
        assert.equal(block._meta.tag, "section", "Инициализация тега")
        // @ts-ignore
        assert.equal(block._meta.props.prop, "prop 1", "Инициализация свойств")
        // @ts-ignore
        assert.equal(block._eventBus instanceof EventBus, true, "Шина событий")
    })

    it("Событие обновление свойств", () => {
        const block = new Block("section", {prop: "value"})
        const events: string[] = []
        // @ts-ignore
        block._eventBus.on(Block.EVENTS.FLOW_CDU, (() => events.push("CDU")).bind(this))
        block.setProps({prop: "newValue"})
        assert.equal(events[0], "CDU")
    })
})
