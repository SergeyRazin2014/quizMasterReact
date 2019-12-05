export class Nod {
	constructor({ id, name }) {
		this.id = id;
		this.name = name;
		this.children = [];

		// добавить узел
		this.add = (node) => {
			this.children.push(node);
		};

		// удалить у текущего узла дочерний узел по имени
		this.removeByName = (name) => {
			this.children = this.children.filter((x) => x.name !== name);
		};

		// удалить у текущего узла и у всех дочерни узлов дочерний узел по имени
		this.removeByNameDeep = (name) => {
			for (let i = 0; i < this.children.length; i++) {
				const node = this.children[i];

				if (node.name === name) {
					this.removeByName(name);
				} else {
					node.removeByNameDeep(name);
				}
			}
		};

		// найти узел в текущем узле по имени
		this.findByName = ({ name }) => {
			const result = this.children.filter((x) => x.name === name);
			return result;
		};

		// найти узлы по имени во всем дереве
		this.findByNameDeep = ({ name }) => {
			let result = this.findByName({ name });

			for (let i = 0; i < this.children.length; i++) {
				const node = this.children[i];

				const finded = node.findByNameDeep({ name });

				if (finded && finded.length) {
					result = [...result, ...finded];
				}
			}

			if (result.length) {
				return result;
			}

			return null;
		};

		// найти узел по id в текущем узле
		this.findById = ({ id }) => {
			const result = [];
			if (this.id == id) {
				result.push(this);
			}
			const findChildren = this.children.filter((x) => x.id == id);

			return [...result, ...findChildren];
		};

		// найти узел по id во всем дереве
		this.findByIdDeep = ({ id }) => {

			if (!id) {
				return [];
			}

			// ищем в себе
			let result = this.findById({ id });

			// ищем в каждом дитеныше
			for (let i = 0; i < this.children.length; i++) {
				const node = this.children[i];

				const finded = node.findByIdDeep({ id });

				if (finded && finded.length) {
					result = [...result, ...finded];
				}
			}

			if (result.length) {
				return result;
			}

			return null;
		};
	}
}
