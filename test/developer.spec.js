
import Developer_alias from '../lib/developer.js';
import chai from 'chai';
var should = chai.should();
import chaiAsPromised from 'chai-as-promised'; 
chai.use(chaiAsPromised);
chai.should();


// class Developer{
//     name;
//     language;
//     constructor(name, language) {
//         this.name = name;
//         this.language = language;
//     }
//     getName = () => this.name 
//     setName = (name) => this.name = name  
//     getLanguage = () => this.language
//     setLanguage = (language) => this.language = language
//     code = () => {
//         return new Promise((resolve, reject) => {
//             if(this.getName() == 'Nicole' && this.getLanguage() == 'nodejs') { resolve("Hello, Nicole!") }
//             else if(this.getName() == 'John'&& this.getLanguage() == 'java') { resolve("Hello, John!")  }
//             else { reject('unsupported') };
//         })   
//     }
// }

describe('test developer', function () {
    it('should return hello Nicole', function () {
        var nicole = new Developer_alias('Nicole', 'nodejs');
        return nicole.code().should.eventually.equal('Hello, Nicole!');
    })
})

