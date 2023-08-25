export class LocalStorageInterface {

    add(key, value) {
            
        const json_value = JSON.stringify(value);
        localStorage.setItem(key, json_value);
    
    }

    set = this.add;

    get(key) {

        const json_value = localStorage.getItem(key);
        return JSON.parse(json_value);

    }

    remove(key) {

        localStorage.removeItem(key);

    }

}
