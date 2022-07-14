class MemoryContainer{

    constructor(){
        this.list = [];
    }

    //get all products
    getAll() {
        return this.list;
    }

    //add
    add(product) {
        product.id = this.getId();
        this.list.push(product);
    }

    //get id to product
    getId() {
        return this.list.length > 0 ? this.list[this.list.length - 1].id + 1 : 1;
    }

    //find an array product with an index
    getById(id) {
        const product = this.list.find(list => list.id === id);
        if (!product) {
            throw new Error('list no found');
        }
        return product;
    }

    //update product by id
    updateById(id, product) {
        const index = this.list.findIndex(list => list.id === id);

        if (!index) {
            throw new Error('list no found');
        }

        this.list[index] = product;
        this.list[index].id = id;
    }

    //delete product by id
    deleteById(id) {
        if(!this.getById(id)){
            throw new Error('list no found');
        }
        this.list = this.list.splice(this.list.findIndex(list => list.id === id), 1);
    }

}

export { MemoryContainer };