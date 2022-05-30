class Deveoper{
    name;
    language;
    constructor(name, language) {
        this.name = name;
        this.language = language;
    }
    getName = () => this.name 
    setName = (name) => this.name = name  
    getLanguage = () => this.language
    setLanguage = (language) => this.language = language
    code = () => {
        return new Promise((resolve, reject) => {
            if(this.getName() == 'Nicole' && this.getLanguage() == 'nodejs') { resolve("Hello, Nicole!") }
            else if(this.getName() == 'John'&& this.getLanguage() == 'java') { resolve("Hello, John!")  }
            else { reject('unsupported') };
        })   
    }
}