export class Nod {
	constructor(name) {
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
		this.findByName = (name) => {
			const result = this.children.filter((x) => x.name === name);
			return result;
		};

		// найти узлы по имени во всем дереве
		this.findByNameDeep = (name) => {
			let result = this.children.filter((x) => x.name === name);

			for (let i = 0; i < this.children.length; i++) {
				const node = this.children[i];

				const findBynameChild = node.findByNameDeep(name);

				if (findBynameChild) {
					result = [...result, ...node.findByNameDeep(name)];
					return result;
				}
				return result;
			}

			if (result.length) {
				return result;
			}

			return null;
		};
	}
}

const main = new Nod('main');
const node1 = new Nod('node1');
const node11 = new Nod('node11');
const node2 = new Nod('node2');
const node22 = new Nod('node11');

node1.add(node2);
node1.add(node22);
main.add(node1);
main.add(node11);

const findResult = main.findByNameDeep('node11');

const josn = JSON.stringify(main);

console.log(main);
