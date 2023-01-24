export class Nod {
	constructor({ id, name, quizIds }) {
		this.id = id;
		this.name = name;
		this.quizIds = quizIds;
		this.children = [];

		// добавить узел
		this.add = (node) => {
			this.children.push(node);
		};

		// удалить у текущего узла дочерний узел по имени
		this._removeByNameCurrent = (name) => {
			this.children = this.children.filter((x) => x.name !== name);
		};

		// удалить у текущего узла и у всех дочерни узлов дочерний узел по имени
		this.removeByNameDeep = (name) => {
			for (let i = 0; i < this.children.length; i++) {
				const node = this.children[i];

				if (node.name === name) {
					this._removeByNameCurrent(name);
				} else {
					node.removeByNameDeep(name);
				}
			}
		};

		// найти узел по id в текущем узле
		this._findByIdCurrent = ({ id }) => {

			if (!id) {
				return [];
			}

			const result = [];
			if (this.id == id) {
				result.push(this);
			}

			return result;
		};

		this.findByIdDeep = ({ id }) => {
			// найти в себе
			const findSelf = this._findByIdCurrent({ id });

			// найти в дочерних
			const findChild = this._findByIdDeepChildren({ id });

			return [...findSelf, ...findChild];
		};

		// найти узел по id во всем дереве
		this._findByIdDeepChildren = ({ id }) => {

			if (!id) {
				return [];
			}

			let result = [];

			// ищем в каждом дитеныше
			for (let i = 0; i < this.children.length; i++) {
				const node = this.children[i];

				const findSelf = node._findByIdCurrent({ id });
				const findChild = node._findByIdDeepChildren({ id });

				if (findSelf.length || findChild.length) {
					result = [...findSelf, ...findChild];
				}
			}

			if (result.length) {
				return result;
			}

			return [];
		};
	}
}


export function buildNode(dataRoot) {

	if (!dataRoot) {
		return null;
	}

	// создал нод для корневого датаНода
	const rootNode = new Nod({ id: dataRoot.id, name: dataRoot.name, quizIds: dataRoot.quizIds });

	// создал ноды для дочерних датаНодов и добавил их корневому дата ноду
	for (let i = 0; i < dataRoot.children.length; i++) {
		const dataNod = dataRoot.children[i];
		const nod = new Nod({ id: dataNod.id, name: dataNod.name, quizIds: dataNod.quizIds });
		rootNode.children.push(nod);

		for (let j = 0; j < dataNod.children.length; j++) {
			const childDataNod = dataNod.children[j];
			nod.children.push(buildNode(childDataNod));
		}
	}

	return rootNode;
}



