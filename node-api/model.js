module.exports = {
    companyTOBS: ()=>{
        return 0;
    },
    companySymbol: (description, symbol)=>{
        return new CompanySymbol(description, symbol);
    }
}



// class CompanySymbol {
//     Description;
//     Symbol;
//     constructor(description, symbol) {
//         this.Description = description;
//         this.Symbol = symbol;
//     }
// }