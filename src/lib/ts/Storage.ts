 export default class Storage {

    static get(name: string) {
        try {

            let data = localStorage.getItem(name);
            if (!data || data == undefined) {
                console.log("return data", data);
                return data;
            }
            return JSON.parse(data);
        } catch (e) {
            console.log("get localstorage error", name, e)
            return undefined;
        }
    }

    static set(name: string, val: any) {
        return localStorage.setItem(name, JSON.stringify(val));
    }

    static add (name: string, addVal: any) {
        let oVal = Storage.get(name);
        let nVal = oVal.concat(addVal);
        Storage.set(name, nVal);
    }

}
