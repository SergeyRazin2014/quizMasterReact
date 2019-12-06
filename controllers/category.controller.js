module.exports = {
    getRootCategory: async (req, res) => {

        const rootCategory = {
            "id": 1,
            "name": "root",
            "children": [
                {
                    "id": 3,
                    "name": "Ребенок",
                    "children": [
                        {
                            "id": 3,
                            "name": "Младенец до года",
                            "children": []
                        },
                        {
                            "id": 4,
                            "name": "Дети старше года",
                            "children": []
                        },
                        {
                            "id": 5,
                            "name": "Подросток",
                            "children": []
                        }
                    ]
                },
                {
                    "id": 2,
                    "name": "Взрослый",
                    "children": [
                        {
                            "id": 6,
                            "name": "Мужчина",
                            "children": [
                                {
                                    "id": 7,
                                    "name": "Проблемы общего характера",
                                    "children": [],
                                    "quizIds": [
                                        1,
                                        2,
                                        3
                                    ]
                                },
                                {
                                    "id": 8,
                                    "name": "Проблемы секса",
                                    "children": []
                                }
                            ]
                        },
                        {
                            "id": 9,
                            "name": "Женщина",
                            "children": []
                        }
                    ]
                }
            ]
        }

        res.json(rootCategory);
    }
}