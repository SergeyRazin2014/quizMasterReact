module.exports = {
    getRootCategory: async (req, res) => {

        const rootCategory = {
            "id": 1,
            "name": "root",
            "children": [
                {
                    "id": 2,
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
                    "id": 6,
                    "name": "Взрослый",
                    "children": [
                        {
                            "id": 7,
                            "name": "Мужчина",
                            "children": [
                                {
                                    "id": 8,
                                    "name": "Проблемы общего характера",
                                    "children": [],
                                    "quizIds": [
                                        '5dac97174a99190be07e3837',
                                        '5deba3af0e2f882cd8a8fba0',
                                        '5df62a22c74c5d1014aa1561'
                                    ]
                                },
                                {
                                    "id": 9,
                                    "name": "Проблемы секса",
                                    "children": []
                                }
                            ]
                        },
                        {
                            "id": 10,
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